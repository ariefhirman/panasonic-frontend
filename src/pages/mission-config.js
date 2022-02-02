import React from 'react';
import Head from 'next/head';
import { Grid, Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DroneArrangement } from 'src/components/dashboard/drone-arrangement';
import { ItemMatrixConfig } from 'src/components/item/item-matrix-config';
import mqttClientContext from 'src/context/mqttContext';
import droneArrangementContext from 'src/context/mission-config/droneArrangementContext';

const topicConfig = {
  drone_name: 'dji/model/name',
  drone_connection: 'dji/status/connection',
  drone_battery: 'dji/status/battery',
  drone_altitude: 'dji/status/altitude',
  drone_vertical_speed: 'dji/status/vertical-speed',
  drone_horizontal_speed: 'dji/status/horizontal-speed'
};

const topicStartMission = 'mission-planner/start';

const MissionConfig = () => {
  // const [mesg, setMesg] = React.useState('Test');
  const [droneName, setDroneName] = React.useState('Drone 1');
  const [connectionStatus, setConnectionStatus] = React.useState('Disconnected');
  const [batteryLevel, setBatteryLevel] = React.useState('0%');
  const [startMission, setStartMission] = React.useState(false);
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

  if (startMission) {
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
            <ItemMatrixConfig />
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <droneArrangementContext.Provider value={arrangementContext}>
              <DroneArrangement parentCallback={handleCallbackStatus} sx={{ height: '100%' }} />
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
