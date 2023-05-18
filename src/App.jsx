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

  const [statistics, setStatistics] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [regionCode, setRegionCode] = useState('FR');

  const instance = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  function fetchApiStatistics() {
    instance.get(`/videos?part=statistics&chart=mostPopular&maxResults=10&regionCode=${regionCode}&key=${import.meta.env.VITE_API_KEY}`)
    .then((response) => {
      // console.log(response.data);
      setStatistics(response.data.items);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function fetchApiSnippet() {
    instance.get(`/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=${regionCode}&key=${import.meta.env.VITE_API_KEY}`)
    .then((response) => {
      console.log('snippet', response.data);
      setSnippets(response.data.items);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  useEffect(() => {
    fetchApiStatistics();
    fetchApiSnippet();
  }, [regionCode]);

  // console.log(data02);

  const dataViewCount = 
    statistics.map((statistic) => (
    { name: (statistic.id),
      value: 
        parseInt(statistic.statistics.viewCount, 10)
    }
    ))
  // console.log(data03);
  
  const dataTitle = 
  snippets.map((snippet) => (
  { name: (snippet.id),
    value: 
      snippet.snippet.title
  }
  ))

  console.log('title', dataTitle);

  // regionCode 

  function handleChange(event) {
      setRegionCode(event.target.value);
  }

  function handleSubmit(event) {
    // a la soumission du formulaire, évite le rafraichissement de la page par exemple
    event.preventDefault();
  }


  return (
    <div>
      <h1>Statistics</h1>

      <form onSubmit={handleSubmit}>
        <input 
          value={regionCode}
          onChange={handleChange}
        ></input>
      </form>

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
