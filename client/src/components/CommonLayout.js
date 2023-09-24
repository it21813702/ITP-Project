import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import { Container, CssBaseline } from '@mui/material';

const CommonLayout = ({ children }) => {
    return (
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <main style={{ flexGrow: 12, padding: '15px' }}>
          <Navbar />
          <Container maxWidth="lg">
            {children} 
          </Container>
        </main>
      </div>
    );
  };
  
  export default CommonLayout;