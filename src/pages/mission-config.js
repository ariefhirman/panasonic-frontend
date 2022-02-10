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
import ConfigService from 'src/service/config.service';

// topic for mission config
const topicConfig = {
  drone_name: 'dji/model/name',
  drone_connection: 'dji/status/connection',
  drone_battery: 'dji/status/battery',
  drone_altitude: 'dji/status/altitude',
  drone_vertical_speed: 'dji/status/vertical-speed',
  drone_horizontal_speed: 'dji/status/horizontal-speed',
  drone_flight_control: 'dji/status/flight-control'
};

// topic for starting mission
const topicStartMission = 'mission-planner/start';
const topicMissionStarted = 'mission-planner/start/result';
const resMessage = 'Mission Started';

// variables for POST config
const widthType15 = 2.7;
const level_height_type15 = [
  1.225, 1.05, 1.06
];

const MissionConfig = () => {
  var uuid = require("uuid");
  const router = useRouter();
  const [droneName, setDroneName] = React.useState('Drone 1');
  const [connectionStatus, setConnectionStatus] = React.useState('Disconnected');
  const [batteryLevel, setBatteryLevel] = React.useState('0%');
  const [startMission, setStartMission] = React.useState(false);
  const [sweepConfig, setSweepConfig] = React.useState();
  const [droneConfig, setDroneConfig] = React.useState();
  const [flightControl, setFlightControl] = React.useState('False');
  const client = React.useContext(mqttClientContext);
  console.log(client);

  // subscibe
  client.subscribe(topicConfig.drone_name);
  client.subscribe(topicConfig.drone_connection);
  client.subscribe(topicConfig.drone_battery);
  client.subscribe(topicConfig.drone_flight_control);
  client.subscribe(topicMissionStarted);

  const arrangementContext = {
    drone_name: droneName,
    connection_status: connectionStatus,
    battery_level: batteryLevel,
    flight_control: flightControl
  };

  const fillRackSizeArray = (sweepConfig) => {
    let arrRackSize = [];
    if (sweepConfig) {
      for(let i=sweepConfig[0]; i <= sweepConfig[sweepConfig.length-1]; i++) {
        let configRackSize = {};
        configRackSize["width"] = widthType15;
        console.log(sweepConfig.includes(i));
        if (sweepConfig.includes(i)) {
          configRackSize["level_height"] = level_height_type15;
        } else {
          configRackSize["level_height"] = [];
        }
        arrRackSize.push(configRackSize)
      };
    }
    return arrRackSize;
  }

  const getRackID = (num) => {
    let prefix;
    let numPrefix = (num / 18) >> 0;
    let numSuffix = num % 17;
    if (numSuffix == 0) {
      numSuffix = 17;
    }
    switch(numPrefix) {
      case 0:
        prefix = 'A';
        break;
      case 1:
        prefix = 'B';
        break;
      case 2:
        prefix = 'C';
        break;
      case 3:
        prefix = 'D';
        break;
      case 4:
        prefix = 'E';
        break;
      case 5:
        prefix = 'F';
        break;
    }
    return prefix + numSuffix.toString();
  };

  const getArrayRackID = (sweep) => {
    let arr = [];
    console.log(sweep);
    sweep.forEach(el => 
      // console.log(getRackID(el))
      arr.push(getRackID(el))
    );
    console.log(arr);
    return arr;
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

  const handleCallbackStatus = (data) => {
    setStartMission(data);
  }

  const handleCallbackDroneConfig = (data) => {
    setDroneConfig(data);
  }

  const handleCallbackSweepConfig = (data) => {
    setSweepConfig(data);
  };

  if (startMission) {
    let dataConfig = {};
    let arrRackSize = fillRackSizeArray(sweepConfig);
    let arrRackID = getArrayRackID(sweepConfig);
    publishMessage(topicStartMission, 'True', resMessage);
    if (droneConfig) {
        dataConfig = {
        id: uuid.v4(),
        mission_name: droneConfig.missionName,
        drone_name: droneName,
        start_point: arrRackID[0], // will be implemented rack ID array
        end_point: arrRackID[arrRackID.length-1], // will be implemented rack ID array
        mission_speed: parseFloat(droneConfig.missionSpeed),
        max_altitude: parseFloat(droneConfig.maxAltitude),
        rack_ids: arrRackID,
        sweep_config: sweepConfig,
        rack_size: arrRackSize
      };
    } else {
      dataConfig = {
        id: uuid.v4(),
        mission_name: '',
        drone_name: droneName,
        start_point: arrRackID[0],
        end_point: arrRackID[arrRackID.length-1],
        mission_speed: 0,
        max_altitude: 0,
        rack_ids: arrRackID,
        sweep_config: sweepConfig,
        rack_size: arrRackSize
      };
    }
    ConfigService.postConfig(dataConfig).then(
      () => {
        console.log("Success post data");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error.message);
      }
    );
    console.log(dataConfig);
    setStartMission(false)
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
      } else if (topic == topicConfig.drone_flight_control) {
        note = message.toString();
        setFlightControl(note);
      } else if (topic == topicMissionStarted) {
        note = message.toString();
        if (note == 'started') {
          router.push('/success-launched');
        }
      }
      console.log(note);
      // client.end();
    });
  });

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
              <DroneArrangement callbackconfig={handleCallbackDroneConfig} parentcallback={handleCallbackStatus} sx={{ height: '100%' }} />
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
