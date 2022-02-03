import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DroneArrangement } from 'src/components/dashboard/drone-arrangement';
import { ItemMatrixConfig } from 'src/components/item/item-matrix-config';
import mqttClientContext from 'src/context/mqttContext';
import droneArrangementContext from 'src/context/mission-config/droneArrangementContext';
import AuthService from 'src/service/auth.service';

// topic for mission config
const topicConfig = {
  drone_name: 'dji/model/name',
  drone_connection: 'dji/status/connection',
  drone_battery: 'dji/status/battery',
  drone_altitude: 'dji/status/altitude',
  drone_vertical_speed: 'dji/status/vertical-speed',
  drone_horizontal_speed: 'dji/status/horizontal-speed'
};

// topic for starting mission
const topicStartMission = 'mission-planner/start';

// variables for POST config
const widthType15 = 2.7;
const level_height_type15 = [
  1.225, 1.05, 1.06
];

const MissionConfig = () => {
  const router = useRouter();
  // const [mesg, setMesg] = React.useState('Test');
  const [droneName, setDroneName] = React.useState('Drone 1');
  const [connectionStatus, setConnectionStatus] = React.useState('Disconnected');
  const [batteryLevel, setBatteryLevel] = React.useState('0%');
  const [startMission, setStartMission] = React.useState(false);
  const [sweepConfig, setSweepConfig] = React.useState();
  const [rackSize, setRackSize] = React.useState();
  const client = React.useContext(mqttClientContext);
  // let note;
  console.log(client);

  // subscibe
  client.subscribe(topicConfig.drone_name);
  client.subscribe(topicConfig.drone_connection);
  client.subscribe(topicConfig.drone_battery);

  const arrangementContext = {
    drone_name: droneName,
    connection_status: connectionStatus,
    battery_level: batteryLevel
  };

  const fillRackSizeArray = (sweepConfig) => {
    let arrRackSize = [];
    console.log(sweepConfig);
    for(let i=0; i < sweepConfig[sweepConfig.length-1]; i++) {
      let configRackSize = {};
      configRackSize["width"] = widthType15;
      console.log(sweepConfig.includes(i+1));
      if (sweepConfig.includes(i+1)) {
        configRackSize["level_height"] = level_height_type15;
      } else {
        configRackSize["level_height"] = [];
      }
      arrRackSize.push(configRackSize)
      console.log(configRackSize);
    };
    console.log(arrRackSize);
    return arrRackSize;
  }

  if (startMission) {
    let arrRackSize = fillRackSizeArray(sweepConfig);
    client.publish(topicStartMission, 'True', { qos: 1, retain: false }, function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('Published')
      }
    })
    setStartMission(false)
  }

  const publishMessage = (topic) => {
    if (startMission) {
      client.publish(topic, 'True', { qos: 1, retain: false }, function (error) {
        if (error) {
          console.log(error)
        } else {
          console.log('Published')
        }
      })
    }
    setStartMission(false)
  }

  const handleCallbackStatus = (data) => {
    setStartMission(data);
  }

  const handleCallbackSweepConfig = (data) => {
    // if (listBox.includes(data)) {
    //   return;
    // }
    // // listBox.push(boxSelected);
    // listBox.push(data);
    setSweepConfig(data);
    // props.parentcallback(listBox);
    console.log(data);
  };

  let note;
  React.useEffect(() => {
    client.on('message', function (topic, message) {
      if (topic == topicConfig.drone_name) {
        note = message.toString();
        setDroneName(note);
      } else if (topic == topicConfig.drone_connection) {
        note = message.toString();
        setConnectionStatus(note);
      } else if (topic == topicConfig.drone_battery) {
        note = message.toString();
        setBatteryLevel(note);
      }
      console.log(note);
      // client.end();
    });
  });

  React.useEffect(() => {
    let isUser = AuthService.getCurrentUser();
    if(!isUser) {
      router.push('/');
      // navigate('/app/data');
      // pindah kalo udh login
    }}
  );

  return (
    <>
    <Head>
      <title>
        Mission Configuration
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
            <ItemMatrixConfig parentcallback={handleCallbackSweepConfig}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <droneArrangementContext.Provider value={arrangementContext}>
              <DroneArrangement parentcallback={handleCallbackStatus} sx={{ height: '100%' }} />
            </droneArrangementContext.Provider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
};
MissionConfig.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MissionConfig;
