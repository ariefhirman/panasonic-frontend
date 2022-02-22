import React from "react";

const topic = React.createContext({
  topicConfig: {
    drone_name: 'dji/model/name',
    drone_connection: 'dji/status/connection',
    drone_battery: 'dji/status/battery',
    drone_altitude: 'dji/status/altitude',
    drone_vertical_speed: 'dji/status/vertical-speed',
    drone_horizontal_speed: 'dji/status/horizontal-speed',
    drone_flight_control: 'dji/status/flight-control'
  },
  topicStartMission: 'mission-planner/start',
  topicPauseMission: 'mission-planner/pause',
  topicStopMission: 'mission-planner/shutdown',
  topicRestartMission: 'mission-planner/restart',
  topicMissionStarted: 'mission-planner/start/result',
  topicRunDetection: 'cv/run-detection',
  topicDetectionProgress: 'cv/status'
});

export default topic;