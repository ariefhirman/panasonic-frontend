import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ariefhirmanto.xyz/api/node/';

class NodeService {
  fetchAllNode() {
    return axios.get(API_URL, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("node", JSON.stringify(response.data));
      }
    );
  }

  fetchSpecificNode(node_id) {
    return axios.get(API_URL + node_id, { headers: authHeader() })
    .then(response => {
        localStorage.setItem("node", JSON.stringify(response.data));
      }
    );
  }

  getDataNode() {
    return JSON.parse(localStorage.getItem('node'));
  }
}

export default new NodeService();