import React from 'react';
import Head from 'next/head';
import EventEmitter from 'events';
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

// let arrImageDetection = [];

const resMessage = 'Mission Stopped';

const CheckProgress = () => {
  const router = useRouter();
  const [progress, setProgress] = React.useState({
    success: [],
    audited: []
  });
  const [progressSuccess, setProgressSuccess] = React.useState([]);
  const [progressFailed, setProgressFailed] = React.useState([]);
  const [arrImageDetection, setArrImageDetection] = React.useState([]);
  const [stopMission, setStopMission] = React.useState(false);
  const [pauseMission, setPauseMission] = React.useState('false');
  const [runDetection, setRunDetection] = React.useState('true'); // true for demo purpose
  const [imageDetection, setImageDetection] = React.useState({});
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
  client.subscribe(mqttTopic.topicDetectionProgress);
  client.subscribe(mqttTopic.topicRunDetection);

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

  const getIndexRack = (detectionRack) => {
    let index;
    let rackID = detectionRack.split("-")[0];
    // let rackID = detectionRack.substring(0,2);
    let prefix = rackID[0]
    let suffix = parseInt(rackID.substring(1));
    switch(prefix) {
      case 'A':
        index = 0;
        break;
      case 'B':
        index = 17;
        break;
      case 'C':
        index = 34;
        break;
      case 'D':
        index = 51;
        break;
      case 'E':
        index = 68;
        break;
      case 'F':
        index = 85;
        break;
    }
    return index + suffix;
  };

  const updateProgress = (detection) => {
    const emitter = new EventEmitter()
    emitter.setMaxListeners(50)
    let success = progressSuccess;
    let failed = progressFailed;
    let rackID = getIndexRack(detection.rack_id);
    if (detection.status == 1) {
      if (!success.includes(rackID)) {
        if (!failed.includes(rackID)) {
          success.push(rackID);
          setProgressSuccess(success);
        }
      }
    } else {
      if (!failed.includes(rackID)) {
        if (success.includes(rackID)) {
          success = removeItem(success, rackID);
          // console.log(success_filtered);
          // success = success_filtered;
          setProgressSuccess(success);
        }
        failed.push(rackID);
        setProgressFailed(failed)
      }
    }
    setProgress({
      success: success,
      audited: failed
    })
    // console.log(progress);
  }

  const removeItem = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const createArrayOfUrls = (objOfUrls) => {
    const emitter = new EventEmitter()
    emitter.setMaxListeners(50)
    let tempArr = [];
    Object.keys(objOfUrls).forEach(key => {
      for (let i=0; i<objOfUrls[key].length; i++) {
        tempArr.push(objOfUrls[key][i].url)
      }
    });
    // arrImageDetection = tempArr;
    setArrImageDetection(tempArr);
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
      } else if (topic == mqttTopic.topicRunDetection) {
        note = message.toString();
        setRunDetection(note);
      } else if (topic == mqttTopic.topicDetectionProgress) {
        note = message.toString();
        let detection = JSON.parse(note);
        if (runDetection == 'True' || runDetection == 'true') {
          updateProgress(detection);
          let objDetection = imageDetection;
          let rackID = detection.rack_id.split("-")[0];
          objDetection[rackID] = detection.product_detection;
          createArrayOfUrls(objDetection);
        }
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
                  dataImage={arrImageDetection}  
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
