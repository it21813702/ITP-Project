import React from 'react';
import CommonLayout from './CommonLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './dashboard.css'
const data = [
  { name: 'Jan', revenue: 1500 },
  { name: 'Feb', revenue: 2200 },
  { name: 'Mar', revenue: 3000 },
  { name: 'Apr', revenue: 1800 },
  { name: 'May', revenue: 2500 },
  { name: 'Jun', revenue: 3500 },
];

const Dashboard = () => {
  return (
    <CommonLayout>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat">
            <h2>Total Users</h2>
            <p>1000</p>
          </div>
          <div className="stat">
            <h2>Revenue</h2>
            <p>$10,000</p>
          </div>
          <div className="stat">
            <h2>New Orders</h2>
            <p>50</p>
          </div>
        </div>
        <div className="dashboard-chart ">
          <h3>Monthly Revenue Chart</h3>
          <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
