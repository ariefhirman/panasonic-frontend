import { useState, useEffect, createContext } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import mqttClientContext from 'src/context/mqttContext';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  var mqtt    = require('mqtt');
  var client  = mqtt.connect('mqtt://localhost:9005');
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [mqttClient, setMqttClient] = useState(client);

  
  // var options = {
    // protocol: 'mqtt',
    // clientId uniquely identifies client
    // choose any string you wish
    // clientId: 'b0908853' 	
  // };

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <mqttClientContext.Provider value={mqttClient}>
            {children}
          </mqttClientContext.Provider>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
