import axios from "axios";

const baseUrl = "https://open.faceit.com/data/v4/"
const token = "f8181d9d-947e-4bad-9e62-a38605cf440d"


export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

