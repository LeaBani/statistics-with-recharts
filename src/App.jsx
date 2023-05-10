import './App.css'

import { LineChart, Line, PieChart, Pie } from 'recharts';


function App() {

  const data = [
    { name: 'January', value: 1 },
    { name: 'February', value: 8 },
    { name: 'March', value: 2 },
    { name: 'April', value: 10 },
  ];

  console.log(data);

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

  return (
    <div>
      <h1>Statistics</h1>

      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>

        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>

    </div>
  )
}

export default App
