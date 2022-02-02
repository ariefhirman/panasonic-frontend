import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ariefhirmanto.xyz/api/map/';

class MapService {
  fetchAllMap() {
    return axios.get(API_URL, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("map", JSON.stringify(response.data));
      }
    );
  }

  fetchSpecificMap(node_owner) {
    return axios.get(API_URL + node_owner, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("map", JSON.stringify(response.data));
      }
    );
  }

  getDataMap() {
    return JSON.parse(localStorage.getItem('map'));
  }
}

export default new MapService();