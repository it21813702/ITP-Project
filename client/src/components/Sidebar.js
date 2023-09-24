import React from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 280;


const Sidebar = () => {
 
  const username = "John Doe";
  const userImageURL = '';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#176B87', 
        },
      }}
    >
      <Toolbar />

      {/* User Info */}
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h5" sx={{ color: 'white', marginRight: '16px' }}>{username}</Typography>
          <Avatar alt="User Image" src={userImageURL} sx={{ width: 60, height: 60 }} />
        </ListItem>
      </List>

      {/* Sidebar Links */}
      <List>
        <ListItem button component={NavLink} to="/dash" activeClassName="active-link">
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/add" activeClassName="active-link">
          <ListItemIcon>
            <AddCircleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Add Product" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/products" activeClassName="active-link">
          <ListItemIcon>
            <ListAltIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="My Products" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/help" activeClassName="active-link">
          <ListItemIcon>
            <HelpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Help and Support" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/profile" activeClassName="active-link">
          <ListItemIcon>
            <PersonIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="My Profile" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/sales" activeClassName="active-link">
          <ListItemIcon>
            <MonetizationOnIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="My Sales" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/reports" activeClassName="active-link">
          <ListItemIcon>
            <DescriptionIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Reports" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/" activeClassName="active-link">
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
