import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import droneArrangementContext from 'src/context/mission-config/droneArrangementContext';

export const DroneArrangement = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const [missionName, setMissionName] = React.useState('');
  const [maxAltitude, setMaxAltitude] = React.useState(0);
  const [missionSpeed, setMissionSpeed] = React.useState(0);
  const [startMission, setStartMission] = React.useState(false);

  const data = React.useContext(droneArrangementContext);
  console.log(data);

  const handleStatus = (event) => {
    let configData = {
      missionName: missionName,
      missionSpeed: missionSpeed,
      maxAltitude: maxAltitude
    }
    setStartMission(true);
    props.parentcallback(true);
    props.callbackconfig(configData);
  };

  let connectionColor = "#F00";
  if (data.connection_status == 'Connected' || data.connection_status == 'connected') {
    connectionColor = "#11AC92"
  }

  return (
    <Card {...props}
      sx={{
        backgroundColor: '#252F3A'
      }}
    >
      {/* <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      > */}
      <CardContent>
        {/* <Card 
          sx={{ 
            display: 'flex', 
            backgroundColor: '#252F3A', 
            marginBottom: '2em',
          }}
          borderColor="#F00"
        >
          <CardContent> */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
             >
              <Grid item
                lg={2}
                md={2}
              />
              <Grid item
                lg={4}
                md={4}
                sx={{
                  marginRight: '2em'
                }}
              >
                <img
                  alt="drone-icon"
                  src="/static/images/drone-icon.png"
                  style={{
                    height: 100,
                    width: 100
                  }}
                />
              </Grid>
              <Grid item
                lg={6}
                md={6}
                sx={{
                  marginRight: '2em'
                }}
              >
                <Grid 
                  item
                >
                  <Typography 
                    color="#646A7B"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Drone Name
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    variant="subtitle1"
                    color="#FFF" 
                  >
                    {data.drone_name}
                  </Typography>
                </Grid>
                <Grid 
                  item
                  sx={{
                    marginTop: '0.5em'
                  }}
                >
                  <Typography 
                    color="#646A7B"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Connection Status
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    variant="subtitle1"
                    color={connectionColor} 
                  >
                    {data.connection_status}
                  </Typography>
                </Grid>
                <Grid 
                  item
                  sx={{
                    marginTop: '0.5em'
                  }}
                >
                  <Typography 
                    color="#646A7B"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Battery Level
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    variant="subtitle1"
                    color="#FFF" 
                  >
                    {data.battery_level}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          {/* </CardContent>
        </Card> */}
        <Divider 
          sx={{
            marginTop: '1.5em',
          }}
        />
        <Box
          sx={{
            marginTop: '2em',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid container>
          <Grid item
              lg={8}
              md={8}
              sm={12}
              sx={{ marginBottom: '2em'}}
            >
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Mission Name
              </Typography>
            </Grid>
            <Grid item
              lg={4}
              md={4}
              sm={12}
            >
              <TextField
                  onChange={
                    (event) => {setMissionName(event.target.value)}
                  }
                  color='secondary'
                  name="mission-name"
                  type="text"
                  sx={{ 
                    input: { color: '#FFF' },
                    width: '7em',
                    marginRight: '0.5em',
                 }}
                 size="small"
              />
            </Grid>
            <Grid item
              lg={8}
              md={8}
              sm={12}
              sx={{ marginBottom: '2em'}}
            >
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Mission Speed
              </Typography>
            </Grid>
            <Grid item
              lg={4}
              md={4}
              sm={12}
            >
              <TextField
                  onChange={
                    (event) => {setMissionSpeed(event.target.value)}
                  }
                  color='secondary'
                  name="mission-speed"
                  type="text"
                  sx={{ 
                    input: { color: '#FFF' },
                    width: '3em',
                    marginRight: '0.5em',
                 }}
                 size="small"
              />
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                m/s
              </Typography>
            </Grid>
            <Grid item
              lg={8}
              md={8}
              sm={12}
              sx={{ marginBottom: '2em'}}
            >
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Maximum Altitude
              </Typography>
            </Grid>
            <Grid item
              lg={4}
              md={4}
              sm={12}
              sx={{ marginBottom: '2em'}}
            >
              <TextField
                  onChange={
                    (event) => {setMaxAltitude(event.target.value)}
                  }
                  color='secondary'
                  name="max-altitude"
                  type="text"
                  sx={{ 
                    input: { color: '#FFF' },
                    width: '3em',
                    marginRight: '0.5em',
                 }}
                 size="small"
              />
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                m/s
              </Typography>
            </Grid>
            {/* <Grid item
              lg={12}
              md={12}
              sm={12}
              sx={{ marginBottom: '1em'}}
            >
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Finish Action
              </Typography>
            </Grid>
            <Grid item
              lg={12}
              md={12}
              sm={12}
              sx={{ marginBottom: '4em'}}
            >
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  // label="Finish"
                  onChange={handleChange}
                  sx={{ 
                    input: { color: '#FFF' },
                    height: '2.5em',
                 }}
                >
                  <MenuItem value={'Manual'}>Manual</MenuItem>
                  <MenuItem value={'Automatic'}>Automatic</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item
              lg={8}
              md={8}
              sx={{ marginBottom: '1em'}}
            ></Grid>
            <Grid item
              lg={4}
              md={4}
              sm={12}
              sx={{ marginBottom: '1em', right:'100'}}
            >
              <Button
                color="primary"
                size="small"
                type="submit"
                variant="contained"
                onClick={handleStatus}
              >
                <Typography variant="caption" nowrap="true">
                Launch Drone
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {/* </Grid> */}
    </Card>
  );
};
