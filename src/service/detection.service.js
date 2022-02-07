import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:6868/api/v1/detection';

class DetectionService {
  fetchDetectionByRackID(rackID) {
    return axios.get(API_URL + '/racks/' + rackID, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("detectionByRack", JSON.stringify(response.data));
      }
    );
  }

  fetchDetectionByMissionID(missionID) {
    return axios.get(API_URL + '/mission', {
      mission_id: missionID
    }, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("detectionByMission", JSON.stringify(response.data));
      }
    );
  }

  fetchDetectionByStatus(status) {
    return axios.get(API_URL + '/status/' + status, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("detectionByStatus", JSON.stringify(response.data));
        return response.data;
      }
    );
  }

  fetchDetectionByDate(date) {
    // console.log(API_URL + '/dates' + date);
    return axios.get(API_URL + '/dates/' + date, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("detectionByDate", JSON.stringify(response.data));
        return response.data;
      }
    );
  }

  fetchAllDetection() {
    return axios.get(API_URL, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("allDetectionData", JSON.stringify(response.data));
        return response.data;
      }
    );
  }

  getData

  getDataMap() {
    return JSON.parse(localStorage.getItem('map'));
  }
}

export default new DetectionService();