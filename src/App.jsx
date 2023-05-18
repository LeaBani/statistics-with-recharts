import './App.css'

import { PieChart, Pie } from 'recharts';

import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  // const data = [
  //  { name: 'January', value: 1 },
  //  { name: 'February', value: 8 },
  //  { name: 'March', value: 2 },
  //  { name: 'April', value: 10 },
  // ];

  
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];
  
  // test avec Youtube API

  const [videos, setVideos] = useState([]);

  const instance = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  const regionCode = "FR";

  function fetchApi() {
    instance.get(`/videos?part=statistics&chart=mostPopular&maxResults=50&regionCode=${regionCode}&key=${import.meta.env.VITE_API_KEY}`)
    .then((response) => {
      // console.log(response.data.items);
      setVideos(response.data.items);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  useEffect(() => {
    fetchApi();
  }, [regionCode]);

  console.log(data02);
  console.log(
    videos.map((video) => (
      parseInt(video.statistics.viewCount, 10)
    )));
  
  return (
    <div>
      <h1>Statistics</h1>

      {videos.map((video) => (
      video.statistics.viewCount
      ))}

        <PieChart width={400} height={400}>
          <Pie data={
                videos.map((video) => (
                  parseInt(video.statistics.viewCount, 10)
                ))} 
              dataKey="viewCount" 
              cx="50%" 
              cy="50%" 
              outerRadius={60} 
              fill="#8884d8" 
          />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>

    </div>
  )
}

export default App
