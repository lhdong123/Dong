import axios from "axios";

const url = "http://localhost:3000/join/add-student"

export default async function addStudentIntoClass(userInfo,id) 
{
    console.log("userInfo")
    console.log(userInfo);
    try {
      //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      const response = await axios.post(url,{
        _id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
        classId: id
                  });
     console.log("response")
     return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }