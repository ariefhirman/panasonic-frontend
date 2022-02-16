import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { DroneInformation } from '../components/dashboard/drone-information';
import { DashboardLayout } from '../components/dashboard-layout';
import { ItemMatrixProgress } from 'src/components/item/item-matrix-progress';
import mqttClientContext from 'src/context/mqttContext';
import topicMqttContext from 'src/context/topicContext';
import progressInfoContext from 'src/context/check-progress/progressInfoContext';
import AuthService from 'src/service/auth.service';

const initialState =  {
  success: [],
  audited: []
}

const resMessage = 'Mission Stopped';

const CheckProgress = () => {
  const router = useRouter();
  const [progress, SetProgress] = React.useState(initialState);
  const [stopMission, setStopMission] = React.useState(false);
  const [pauseMission, setPauseMission] = React.useState('false');
  const [droneName, setDroneName] = React.useState('Drone 1');
  const [connectionStatus, setConnectionStatus] = React.useState('Disconnected');
  const [batteryLevel, setBatteryLevel] = React.useState('0%');
  const [altitude, setAltitude] = React.useState('0');
  const [verticalSpeed, setVerticalSpeed] = React.useState('0');
  const [horizontalSpeed, setHorizontalSpeed] = React.useState('0');
  const [changedState, setChangedState] = React.useState(false);
  const client = React.useContext(mqttClientContext);
  const mqttTopic = React.useContext(topicMqttContext)

  // subscibe
  client.subscribe(mqttTopic.topicConfig.drone_name);
  client.subscribe(mqttTopic.topicConfig.drone_connection);
  client.subscribe(mqttTopic.topicConfig.drone_battery);
  client.subscribe(mqttTopic.topicConfig.drone_altitude);
  client.subscribe(mqttTopic.topicConfig.drone_vertical_speed);
  client.subscribe(mqttTopic.topicConfig.drone_horizontal_speed);

  const droneInformation = {
    drone_name: droneName,
    connection_status: connectionStatus,
    battery_level: batteryLevel,
    altitude: altitude,
    vertical_speed: verticalSpeed,
    horizontal_speed: horizontalSpeed 
  };

  const handleCallbackStatus = (data) => {
    setStopMission(data);
  }

  const handlePauseStatus = (data) => {
    setPauseMission(data);
    setChangedState(true);
  }

  const publishMessage = (topic, message, resMessage) => {
    client.publish(topic, message, { qos: 1, retain: false }, function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('Message Published: ' + resMessage)
      }
    })
  }

  let note;
  React.useEffect(() => {
    client.on('message', function (topic, message) {
      if (topic == mqttTopic.topicConfig.drone_name) {
        note = message.toString();
        setDroneName(note);
      } else if (topic == mqttTopic.topicConfig.drone_connection) {
        note = message.toString();
        setConnectionStatus(note);
      } else if (topic == mqttTopic.topicConfig.drone_battery) {
        note = message.toString();
        setBatteryLevel(note);
      } else if (topic == mqttTopic.topicConfig.drone_altitude) {
        note = message.toString();
        setAltitude(note);
      } else if (topic == mqttTopic.topicConfig.drone_vertical_speed) {
        note = message.toString();
        setVerticalSpeed(note);
      } else if (topic == mqttTopic.topicConfig.drone_horizontal_speed) {
        note = message.toString();
        setHorizontalSpeed(note);
      } 
      // console.log(note);
      // client.end();
    });
  });

  React.useEffect(() => {
    if (stopMission) {
      publishMessage(mqttTopic.topicStopMission, 'true', resMessage);
    } 

    if (changedState) {
      publishMessage(mqttTopic.topicPauseMission, pauseMission, resMessage);
      setChangedState(false);
    }
  })

  // checking login
  // React.useEffect(() => {
  //   let isUser = AuthService.getCurrentUser();
  //   if(!isUser) {
  //     router.push('/');
  //     // navigate('/app/data');
  //     // pindah kalo udh login
  //   }}
  // );
  
  return (
    <>
      <Head>
        <title>
          Check Progress
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: 'neutral.900',
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <ItemMatrixProgress data={progress} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <progressInfoContext.Provider value={droneInformation}>
                <DroneInformation 
                  parentcallback={handleCallbackStatus}
                  callbackpause={handlePauseStatus} 
                  data={progress} 
                  sx={{ height: '100%' }} 
                />
              </progressInfoContext.Provider>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CheckProgress.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CheckProgress;
