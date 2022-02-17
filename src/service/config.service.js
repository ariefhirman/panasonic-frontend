import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:6868/api/v1/config';

class ConfigService {
  postConfig(config) {
    return axios
      .post(API_URL, {
        id: config.id,
        mission_name: config.mission_name,
        drone_name: config.drone_name,
        start_point: config.start_point,
        end_point: config.end_point,
        mission_speed: config.mission_speed,
        max_altitude: config.max_altitude,
        min_altitude: config.min_altitude,
        turning_point: config.turning_point,
        orientation: config.orientation,
        rack_ids: config.rack_ids,
        sweep_config: config.sweep_config,
      }, { headers: authHeader() })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("newConfig", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }

  fetchLatestConfig() {
    return axios.get(API_URL + '/latest', { headers: authHeader() })
    .then(response => {
        localStorage.setItem("latestConfig", JSON.stringify(response.data));
      }
    );
  }

  fetchAllConfig() {
    return axios.get(API_URL, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("allConfig", JSON.stringify(response.data));
      }
    );
  }

  fetchConfigByMissionID(missionID) {
    return axios.get(API_URL + missionID, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("config", JSON.stringify(response.data));
      }
    );
  }

  getDataMap() {
    return JSON.parse(localStorage.getItem('map'));
  }
}

export default new ConfigService();