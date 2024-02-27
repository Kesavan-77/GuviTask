// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Home = () => {
    const { userId } = useParams();
    const [homeData, setHomeData] = useState({
      name: '',
      age: '',
      gender: '',
      dob: '',
      mobile: '',
    });
  
    const [isEditMode, setIsEditMode] = useState(false);
  
    useEffect(() => {
      console.log('User ID:', userId);
      const fetchHome = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/Home/${userId}`);
          if (response.data) {
            setHomeData(response.data);
          } else {
            setIsEditMode(true);
          }
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
  
      fetchHome();
    }, [userId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setHomeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:5000/Home/${userId}`, homeData);
        setIsEditMode(false);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

  return (
    <div>
      <h2>Home</h2>
      {isEditMode ? (
        <>
          <label>
            Age:
            <input type="text" name="age" value={homeData.age} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Gender:
            <input type="text" name="gender" value={homeData.gender} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            DOB:
            <input type="text" name="dob" value={homeData.dob} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Mobile:
            <input type="text" name="mobile" value={homeData.mobile} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>Name: {homeData.name}</p>
          <p>Age: {homeData.age}</p>
          <p>Gender: {homeData.gender}</p>
          <p>DOB: {homeData.dob}</p>
          <p>Mobile: {homeData.mobile}</p>
        </>
      )}
    </div>
  );
};

export default Home;
