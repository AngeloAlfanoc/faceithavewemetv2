import axios from "axios";

const baseUrl = "https://open.faceit.com/data/v4/search/"
// const token = process.env.REACT_APP_FACEITAPI
const tokenArray = [
  process.env.REACT_APP_FACEITAPI_1,
  process.env.REACT_APP_FACEITAPI_2,
  process.env.REACT_APP_FACEITAPI_3,
  process.env.REACT_APP_FACEITAPI_4,
  process.env.REACT_APP_FACEITAPI_5,
  process.env.REACT_APP_FACEITAPI_6,
  process.env.REACT_APP_FACEITAPI_7,
  process.env.REACT_APP_FACEITAPI_8,
  process.env.REACT_APP_FACEITAPI_9,
  process.env.REACT_APP_FACEITAPI_10,
]

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${tokenArray[Math.floor(Math.random() * tokenArray.length)]}`,
  }
});

