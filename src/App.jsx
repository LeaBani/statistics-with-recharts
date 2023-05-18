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
  
  // test avec Youtube API

  const [videos, setVideos] = useState([]);

  const instance = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  const regionCode = "FR";

  function fetchApi() {
    instance.get(`/videos?part=statistics&chart=mostPopular&maxResults=10&regionCode=${regionCode}&key=${import.meta.env.VITE_API_KEY}`)
    .then((response) => {
      console.log(response.data);
      setVideos(response.data.items);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  useEffect(() => {
    fetchApi();
  }, [regionCode]);

  // console.log(data02);

  const dataViewCount = 
    videos.map((video) => (
    { name: (video.id),
      value: 
        parseInt(video.statistics.viewCount, 10)
    }
    ))
  // console.log(data03);
  
  return (
    <div>
      <h1>Statistics</h1>

        <PieChart width={400} height={400}>
          <Pie data={dataViewCount} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius={60} 
              fill="#8884d8" 
          />
          <Pie data={dataViewCount} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>

    </div>
  )
}

export default App
