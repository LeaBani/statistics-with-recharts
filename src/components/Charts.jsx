/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-duplicate-props */

import { PieChart, Pie, BarChart, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

import PropTypes from 'prop-types';

function Charts({regionCode, data}) {
 
    console.log(regionCode)
    console.log(data)

  const dataViewCount = 
    data.map((data) => (
    { 
        name: (data.snippet.channelTitle),
        value: parseInt(data.statistics.viewCount, 10)
    }
    ))


  return (

    <div className='Charts'>

        
    <PieChart width={600} height={600}>
      <Pie data={dataViewCount} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
    </PieChart>

    <BarChart
          width={800}
          height={500}
          data={dataViewCount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

       </div>         
  )

  
}

Charts.propTypes = {
    regionCode: PropTypes.string,
    data: PropTypes.array
  }

export default Charts;
