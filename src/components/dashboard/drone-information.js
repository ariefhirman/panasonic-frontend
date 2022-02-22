import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Fab, Grid, InputLabel, LinearProgress, MenuItem, Select, Typography, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { MediaCard } from './media-card';
import progressInfoContext from 'src/context/check-progress/progressInfoContext';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export const DroneInformation = (props) => {
  const theme = useTheme();
  const [imageArray, setImageArray] = React.useState([]);
  const [stopMission, setStopMission] = React.useState(false);
  const [pauseMission, setPauseMission] = React.useState('false');
  const data = React.useContext(progressInfoContext);

  const handleStatus = () => {
    setStopMission(true);
    props.parentcallback(true);
  };

  const handlePause = () => {
    let toggler = false;
    if (pauseMission == 'false') {
      toggler = true;
    }
    setPauseMission(toggler.toString());
    props.callbackpause(toggler.toString());
  }

  const renderPauseButton = (pauseMission) => {
    console.log(pauseMission)
    if (pauseMission == 'false') {
      return (
        <Fab 
          sx={{
            color: '#FFF',
            backgroundColor: "#FFAB4C",
            '&:hover': {
              backgroundColor: '#D98C00'
            }
          }}
          onClick={handlePause}
        >
          <PauseIcon />
        </Fab>
      )
    } else {
      return (
        <Fab 
          sx={{
            color: '#FFF',
            backgroundColor: "#398AB9",
            '&:hover': {
              backgroundColor: '#33779e'
            }
          }}
          onClick={handlePause}
        >
          <PlayArrowIcon />
        </Fab>
      )
    }
  }

  let connectionColor = "#F00";
  if (data.connection_status == 'True' || data.connection_status == 'true') {
    connectionColor = "#11AC92"
  }

  React.useEffect(() => {
    setImageArray(props.dataImage);
  })
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);


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
              <Grid container>
                <Grid item
                  lg={6}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Drone Name
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="caption"
                    >
                      {data.drone_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Connection Status
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color={connectionColor}
                      variant="caption"
                    >
                      {data.connection_status}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={6}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Battery Level
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="caption"
                    >
                      {data.battery_level}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Altitude
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="caption"
                    >
                      {data.altitude} m
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={6}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Vertical Speed
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="caption"
                    >
                      {data.vertical_speed} m/s
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Horizontal Speed
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="caption"
                    >
                      {data.horizontal_speed} m/s
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid item
                  lg={12}
                  md={12}
                  sx={{
                    marginLeft: '0.5em',
                    marginBottom: '1em'
                  }}
                >
                  <Typography color="#FFF">
                    Sweeping Progress
                  </Typography>
                </Grid>
                <Grid item
                  lg={12}
                  md={12}
                  sx={{
                    marginLeft: '0.5em',
                    marginBottom: '1em'
                  }}
                >
                  <Typography color="#FFF">
                    <LinearProgressWithLabel variant="determinate" value={progress} />
                  </Typography>
                </Grid> */}
                {/* <Grid item
                  lg={12}
                  md={12}
                  sx={{
                    marginLeft: '0.5em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Flight Time
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#FFF"
                      variant="substitle2"
                    >
                      00:35:27
                    </Typography>
                  </Grid>
                </Grid> */}
                {/* <Grid item
                  lg={4}
                  md={4}
                  sx={{
                    marginLeft: '0.5em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Match
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#11AC92"
                      variant="subtitle2"
                    >
                      {props.data.success.length}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={4}
                  sx={{
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Audit
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="#F2A900"
                      variant="subtitle2"
                    >
                      {props.data.audited.length}
                    </Typography>
                  </Grid>
                </Grid> */}
                <Grid item
                  lg={12}
                  md={12}
                  sx={{
                    marginLeft: '0.5em',
                    marginBottom: '1em'
                  }}
                >
                  <MediaCard data={imageArray} />
                </Grid>
                <Grid item
                  lg={4}
                  md={4}
                  sm={12}
                  sx={{ marginBottom: '1em', right:'100'}}
                >
                  {renderPauseButton(pauseMission)}
                  <Fab 
                    sx={{
                      color: '#FFF',
                      backgroundColor: "#D14343",
                      '&:hover': {
                        backgroundColor: '#9c2a2a'
                      },
                    }}
                    onClick={handleStatus}
                  >
                    <StopIcon />
                  </Fab>
                </Grid>
                <Grid item
                  lg={4}
                  md={4}
                  sm={12}
                  sx={{ marginBottom: '1em'}}
                ></Grid>
                {/* <Grid item
                  lg={4}
                  md={4}
                  sm={12}
                  sx={{ marginBottom: '1em'}}
                >
                  <Button
                    color="primary"
                    size="small"
                    type="submit"
                    variant="contained"
                    // disabled
                  >
                    <Typography variant="caption">
                    Return to Base
                    </Typography>
                  </Button>
                </Grid> */}
              </Grid>
            </Box>
          {/* </CardContent>
        </Card> */}
      </CardContent>
      {/* </Grid> */}
    </Card>
  );
};
