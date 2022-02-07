import React from "react";

export const topic = React.createContext({
  topicConfig: {
    drone_name: 'dji/model/name',
    drone_connection: 'dji/status/connection',
    drone_battery: 'dji/status/battery',
    drone_altitude: 'dji/status/altitude',
    drone_vertical_speed: 'dji/status/vertical-speed',
    drone_horizontal_speed: 'dji/status/horizontal-speed'
  },
  topicStopMission: 'mission-planner/stop',
  topicStartMission: 'mission-planner/start'
});