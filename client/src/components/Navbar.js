import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  TextField,
  InputAdornment, // Import InputAdornment
} from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material'; // Import the search icon

import { NavLink } from 'react-router-dom';

const Header = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar sx={{ background: '#219C90' }} position='sticky'>
        <Toolbar>
          <NavLink to='/' style={{ color: 'white' }}>
            <Typography>

            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: 'auto' }}
            textColor='inherit'
            indicatorColor='primary'
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            
          </Tabs>

          
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{ marginLeft: '10px',background:'white' }} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
