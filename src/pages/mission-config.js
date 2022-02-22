import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DroneArrangement } from 'src/components/dashboard/drone-arrangement';
import { ItemMatrixConfig } from 'src/components/item/item-matrix-config';
import mqttClientContext from 'src/context/mqttContext';
import topicMqttContext from 'src/context/topicContext';
import droneArrangementContext from 'src/context/mission-config/droneArrangementContext';
import Modal from '@mui/material/Modal';
import AuthService from 'src/service/auth.service';
import ConfigService from 'src/service/config.service';
import NextLink from 'next/link';

const resMessage = 'Mission Started';

// variables for POST config
const widthType15 = 2.7;
const level_height_type15 = [
  1.225, 1.05, 1.06
];

// modal style (popup style)
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'neutral.900',
  borderRadius: '10px',
  border: '1px solid #252F3A',
  boxShadow: 24,
  p: 4,
};

const MissionConfig = () => {
  const getConnection = () => {
    let connection = localStorage.getItem('droneConnection');
    if (!connection) {
      connection = 'Disconnected';
    }
    return connection;
  }
  
  const getFlightControl = () => {
    let control = localStorage.getItem('flightControl');
    if (!control) {
      control = 'False';
    }
    return control;
  }

  var uuid = require("uuid");
  const router = useRouter();
  const [layoutOrientation, setLayoutOrientation] = React.useState('left');
  const [droneName, setDroneName] = React.useState('Drone 1');
  const [connectionStatus, setConnectionStatus] = React.useState('');
  const [batteryLevel, setBatteryLevel] = React.useState('0%');
  const [startMission, setStartMission] = React.useState(false);
  const [restartMission, setRestartMission] = React.useState(false);
  const [sweepConfig, setSweepConfig] = React.useState([]);
  const [droneConfig, setDroneConfig] = React.useState();
  const [flightControl, setFlightControl] = React.useState('');
  const [turningPoint, setTurningPoint] = React.useState();
  const [openPopupStartMission, setOpenPopupStartMission] = React.useState(false);
  const [openPopupRestartMission, setOpenPopupRestartMission] = React.useState(false);
  const client = React.useContext(mqttClientContext);
  const mqttTopic = React.useContext(topicMqttContext)
  
  // subscibe
  client.subscribe(mqttTopic.topicConfig.drone_name);
  client.subscribe(mqttTopic.topicConfig.drone_connection);
  client.subscribe(mqttTopic.topicConfig.drone_battery);
  client.subscribe(mqttTopic.topicConfig.drone_flight_control);
  client.subscribe(mqttTopic.topicMissionStarted);

  const arrangementContext = {
    drone_name: droneName,
    connection_status: connectionStatus,
    battery_level: batteryLevel,
    flight_control: flightControl
  };

  // OBSOLETE
  // const checkMultiRow = (sweepConfig) => {
  //   let isMultiRow = false;
  //   let firstElement = sweepConfig[0];
  //   let lastElement = sweepConfig[sweepConfig.length-1];
  //   if (getTurningPoint(firstElement) < getTurningPoint(lastElement)) {
  //     isMultiRow = true;
  //   }

  //   return isMultiRow;
  // }

  const checkIsStopFillArray = (index, sweepConfig) => {
    let iterate = true;
    if (index == sweepConfig[sweepConfig.length-1]) {
      iterate = false;
    }
    return iterate;
  }

  const fillSweepConfig = (index, sweepConfig) => {
    let config = {};
    config["rack"] = index;
    config["rack_id"] = getRackID(index);
    config["rack_size"] = {
      width: widthType15,
      level_height: level_height_type15
    }
    if (sweepConfig.includes(index)) {
      config["scan"] = true;
    } else {
      config["scan"] = false;
    }

    return config;
  }

  const fillRackArray = (sweepConfig) => {
    let arrSweepConfig = [];
    if (sweepConfig.length != 0) {
      // OBSOLETE
      // let multiRow = checkMultiRow(sweepConfig);
      // OBSOLETE
      // if (multiRow) {
      //   arrSweepConfig = fillMultiRowConfig(sweepConfig, multiRow);
      // } else {
      //   arrSweepConfig = fillSingleRowConfig(sweepConfig);
      // }
      arrSweepConfig = fillConfig(sweepConfig);
    }
    return arrSweepConfig;
  }

  // Obsolete
  // const fillSingleRowConfig = (sweepConfig) => {
  //   let arrSweepConfig = [];
  //   let direction = droneConfig.droneDirection;
  //   if (direction == 'left') {
  //     for (let i=sweepConfig[0]; i <= Math.max(...sweepConfig); i++) {
  //       let config = fillSweepConfig(i, sweepConfig)
  //       arrSweepConfig.push(config)
  //     };
  //   } else {
  //     for (let i = Math.max(...sweepConfig); i >= Math.min(...sweepConfig); i--) {
  //       let config = fillSweepConfig(i, sweepConfig)
  //       arrSweepConfig.push(config)
  //     };
  //   }

  //   return arrSweepConfig;
  // };

  const fillConfig = (sweepConfig) => {
    let arrSweepConfig = [];
    let iterate = true;
    let direction = droneConfig.droneDirection;
    let i = sweepConfig[0];
    let firstRowElement = sweepConfig[0];
    let isTurning = true;
    while (iterate) {
      if (direction == 'left') {
        if (i <= getTurningPoint(firstRowElement)) {
          iterate = checkIsStopFillArray(i, sweepConfig);
          let config = fillSweepConfig(i, sweepConfig)
          arrSweepConfig.push(config);
          i++;
        } else {
          if (isTurning) {
            i = getTurningPoint(i);
            isTurning = false;
          }
          iterate = checkIsStopFillArray(i, sweepConfig);
          let config = fillSweepConfig(i, sweepConfig)
          arrSweepConfig.push(config);
          i--;
        }
      } 
      else {
        if (i >= getRackStartPoint(firstRowElement) && i < getTurningPoint(firstRowElement)) {
          iterate = checkIsStopFillArray(i, sweepConfig);
          let config = fillSweepConfig(i, sweepConfig)
          arrSweepConfig.push(config);
          i--;
          if (i == 0) {
            i = getTurningPoint(i) + 1;
          };
        } else {
          if (isTurning) {
            i = getRackStartPoint(i);
            isTurning = false;
          }
          iterate = checkIsStopFillArray(i, sweepConfig);
          let config = fillSweepConfig(i, sweepConfig)
          arrSweepConfig.push(config);
          i++;
        }
      }
    }

    return arrSweepConfig;
  }

  const getTurningPoint = (num) => {
    let point;
    let numPrefix = (num / 18) >> 0;
    switch(numPrefix) {
      case 0:
        point = 17;
        break;
      case 1:
        point = 34;
        break;
      case 2:
        point = 51;
        break;
      case 3:
        point = 68;
        break;
      case 4:
        point = 85;
        break;
      case 5:
        point = 102;
        break;
    }
    return point;
  };

  const getRackStartPoint = (num) => {
    let point;
    let numPrefix = (num / 18) >> 0;
    switch(numPrefix) {
      case 0:
        point = 1;
        break;
      case 1:
        point = 18;
        break;
      case 2:
        point = 35;
        break;
      case 3:
        point = 52;
        break;
      case 4:
        point = 69;
        break;
      case 5:
        point = 86;
        break;
    }
    return point;
  };

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
    sweep.forEach(el => 
      // console.log(getRackID(el))
      arr.push(getRackID(el))
    );
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

  const handleCallbackOrientation = (data) => {
    setLayoutOrientation(data);
  }

  const handleCallbackRestart = (data) => {
    setRestartMission(data);
  }

  const handleCallbackTurningPoint = (data) => {
    setTurningPoint(data);
  }

  const handleClose = () => {
    setOpenPopupStartMission(false);
    setOpenPopupRestartMission(false);
  }

  const handleRestartPopup = () => {
    setOpenPopupRestartMission(true);
    setTimeout(() => handleClose(), 1000);
  }

  if (startMission) {
    let dataConfig = {};
    let arrRack = [];
    let arrRackID = [];
    if (sweepConfig.length > 0) {
      arrRack = fillRackArray(sweepConfig);
      arrRackID = getArrayRackID(sweepConfig);
    }
    publishMessage(mqttTopic.topicStartMission, 'true', resMessage);
    if (droneConfig) {
      dataConfig = {
        id: uuid.v4(),
        mission_name: droneConfig.missionName,
        drone_name: droneName,
        start_point: parseInt(sweepConfig[0]), // will be implemented rack ID array
        end_point: parseInt(sweepConfig[sweepConfig.length-1]), // will be implemented rack ID array
        mission_speed: parseFloat(droneConfig.missionSpeed),
        max_altitude: parseFloat(droneConfig.maxAltitude),
        min_altitude: parseFloat(droneConfig.minAltitude),
        turning_point: turningPoint,
        orientation: droneConfig.droneDirection,
        rack_ids: arrRackID,
        sweep_config: arrRack,
      };
    } else {
      dataConfig = {
        id: uuid.v4(),
        mission_name: '',
        drone_name: droneName,
        start_point: parseInt(sweepConfig[0]), // will be implemented rack ID array
        end_point: parseInt(sweepConfig[sweepConfig.length-1]),
        mission_speed: 0,
        max_altitude: 0,
        min_altitude: 0.3,
        turning_point: turningPoint,
        orientation: droneConfig.droneDirection,
        rack_ids: arrRackID,
        sweep_config: arrRack,
      };
    }
    // ConfigService.postConfig(dataConfig).then(
    //   () => {
    //     console.log("Success post data");
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     console.log(error.message);
    //   }
    // );
    console.log(dataConfig);
    setStartMission(false)
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
        localStorage.setItem("droneConnection", note);
      } else if (topic == mqttTopic.topicConfig.drone_battery) {
        note = message.toString();
        setBatteryLevel(note);
        localStorage.setItem("flightControl", note);
      } else if (topic == mqttTopic.topicConfig.drone_flight_control) {
        note = message.toString();
        setFlightControl(note);
      } else if (topic == mqttTopic.topicMissionStarted) {
        note = message.toString();
        if (note == 'started' || note == 'Started') {
          setOpenPopupStartMission(true);
          // router.push('/success-launched');
        }
      }
      // client.end();
    });
  });

  React.useEffect(() => {
    setConnectionStatus(getConnection());
    setFlightControl(getFlightControl);
    if (restartMission) {
      publishMessage(mqttTopic.topicRestartMission, 'true', resMessage);
      publishMessage(mqttTopic.topicStartMission, 'true', resMessage);
      handleRestartPopup();
      setRestartMission(false);
    }
  })

  // React.useEffect(() => {
  //   let isUser = AuthService.getCurrentUser();
  //   if(!isUser) {
  //     router.push('/');
  //     // navigate('/app/data');
  //     // pindah kalo udh login
  //   }}
  // );

  const renderModalStarted = (openPopupStartMission) => {
    return (
      <Modal
        open={openPopupStartMission}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* <Typography align="center" id="modal-modal-title" variant="h6" component="h2" color="#FFF">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" color="#FFF" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
                <img
                  alt="drone-icon"
                  src="/static/images/success-launched.png"
                  style={{
                    height: '50%',
                    width: '50%'
                  }}
                />
            </Box>
            <Box
            >
              <Typography color="#FFF" style={{ textAlign: 'center', marginTop: '1em'}} variant="h6">
                Drone Successfully Launched
              </Typography>
              <NextLink href="/check-progress">
                <Typography color="#397BBB" style={{ textAlign: 'center', marginTop: '1em', cursor: 'pointer'}} variant="subtitle1">
                  Go To Check Progress
                </Typography>
              </NextLink>
              {/* <NextLink href="/check-progress">
                <Typography color="#397BBB" style={{ textAlign: 'center', marginTop: '1em', cursor: 'pointer'}} variant="subtitle1">
                  Go To Check Progress
                </Typography>
              </NextLink> */}
            </Box>
          </Container>
        </Box>
      </Modal>
    );
  }

  const renderModalRestarted = (openPopupRestartMission) => {
    return (
      <Modal
        open={openPopupRestartMission}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* <Typography align="center" id="modal-modal-title" variant="h6" component="h2" color="#FFF">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" color="#FFF" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
                <img
                  alt="drone-icon"
                  src="/static/images/success-launched.png"
                  style={{
                    height: '50%',
                    width: '50%'
                  }}
                />
            </Box>
            <Box
            >
              <Typography color="#FFF" style={{ textAlign: 'center', marginTop: '1em'}} variant="h6">
                Mission Restarted
              </Typography>
              {/* <NextLink href="/check-progress">
                <Typography color="#397BBB" style={{ textAlign: 'center', marginTop: '1em', cursor: 'pointer'}} variant="subtitle1">
                  Go To Check Progress
                </Typography>
              </NextLink> */}
            </Box>
          </Container>
        </Box>
      </Modal>
    );
  }

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
      {renderModalRestarted(openPopupRestartMission)}
      {renderModalStarted(openPopupStartMission)}
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
            <ItemMatrixConfig 
              callbackTurningPoint={handleCallbackTurningPoint}
              callbackSweep={handleCallbackSweepConfig}
              callbackLayout={handleCallbackOrientation}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <droneArrangementContext.Provider value={arrangementContext}>
              <DroneArrangement
                callbackrestart={handleCallbackRestart} 
                callbackconfig={handleCallbackDroneConfig} 
                parentcallback={handleCallbackStatus} sx={{ height: '100%' }} />
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
