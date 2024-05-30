import React, { useState } from 'react';
import { Card, FormControl, MenuItem, Select } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0f0', '#82c'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DonutCharts = () => {
  const [selectedDuration, setSelectedDuration] = useState('this-month');

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const getDataBasedOnDuration = () => {
    // Example logic to generate data based on selected duration
    if (selectedDuration === 'this-month') {
      return [
        { name: 'Male', value: 30 },
        { name: 'Female', value: 70 },
      ];
    } else if (selectedDuration === 'this-year') {
      return [
        { name: 'Male', value: 40 },
        { name: 'Female', value: 60 },
      ];
    }
  };

  const data = getDataBasedOnDuration();

  return (
    <Card style={{ width: '20vw', height: '45vh', outline: '#930100 solid 1px', marginTop: '5vh', borderRadius: '15px', position: 'relative' }}>

      <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', top: '90%', left: '50%', transform: 'translateX(-50%)' }}>
        <div>
          <h5 style={{ marginLeft: '1vw', marginTop: '1vh' }}>Gender</h5>
        </div>
        <div>
          <FormControl style={{ width: '50%', marginTop: '1vh', marginLeft: '7vw' }}>
            <Select
              variant="outlined"
              value={selectedDuration}
              onChange={handleDurationChange}
              style={{
                height: '6vh',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            >
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="this-year">This Year</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)' }}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={40} // Adjust the inner radius to create a donut chart
            fill="#8884d8"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="left" verticalAlign="bottom" wrapperStyle={{ left: 0 }} />
        </PieChart>
      </div>
      
    </Card>
  );
};

export default DonutCharts;
