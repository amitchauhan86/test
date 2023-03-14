import axios from "axios";
const DBURL = "http://localhost:9000/api/topics";

export const OptionsApi = async (props) => {
    let response;
  try{
//   response = await axios.post(DBURL)
response = await axios.get(DBURL)
 .catch((error) => console.error(error));
  }catch (e) {
    // catch error
    throw new Error(e.message)
  }
  console.log(response?.data,"response?.data")
//   return response?.data  // or set initial value
};

