import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { ProgressLine } from '../progress-line';

export const MissionHistoryCard = (props) => {
  const theme = useTheme();
  let index = props.index;
  let activeIndex = props.activeindex;
  let bordercolor = '';
  if (index == activeIndex) {
    bordercolor="#397BBB"
  }

  const showDetails = () => {
    activeIndex = index;
    props.parentcallback(activeIndex);
    bordercolor="#397BBB";
  }

  const renderDetails = () => {
    if (props.index == props.activeindex) {
      return (
        <Box sx={{ marginTop: '1em'}}>
        <Grid container>
          <Grid item lg={12}>
            <Typography
              color="#B4BEDA"
              gutterBottom
            >
              Warehouse Scan
            </Typography>
            <ProgressLine color='#FFF' />
            <Box
                sx={{
                  pt: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
            >
              <Grid item
                sx={{
                  marginRight: '2em'
                }}
              >
                <Grid item>
                  <Typography
                    color="#B4BEDA"
                    variant="caption"
                  >
                    Start Point
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="#FFF"
                    variant="caption"
                  >
                    A1, 1
                  </Typography>
                </Grid>
              </Grid>
              <Grid item
                sx={{
                  marginRight: '2em'
                }}
              >
                <Grid item>
                  <Typography
                    color="#B4BEDA"
                    variant="caption"
                  >
                    End Point
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="#FFF"
                    variant="caption"
                  >
                    C1, 8
                  </Typography>
                </Grid>
              </Grid>
              <Grid item
                sx={{
                  marginRight: '2em'
                }}
              >
                <Grid item>
                  <Typography
                    color="#B4BEDA"
                    variant="caption"
                  >
                    Total Time
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="#FFF"
                    variant="caption"
                  >
                    2:28:30
                  </Typography>
                </Grid>
              </Grid>
              <Grid item
                sx={{
                  marginRight: '2em'
                }}
              >
                <Grid item>
                  <Typography
                    color="#B4BEDA"
                    variant="caption"
                  >
                    Total Scanned
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="#FFF"
                    variant="caption"
                  >
                    243
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        </Box>
      )
    } 
  }

  const data = {
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ['#397BBB', '#36485D'],
      }
    ],
  };
  
  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      arc: {
          borderWidth: 0
      }
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      // borderColor: theme.palette.divider,
      // borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      // intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
  <Card
    sx={{ backgroundColor: '#252F3A', marginBottom: '1em' }}
    style={{ border: "1px solid", borderColor: bordercolor }}
    {...props}
    onClick={showDetails}
  >
    <CardContent>
      <Grid container>
        <Grid item>
          <Typography
            color="#646A7B"
            gutterBottom
            variant="overline"
          >
            09 December 2021
          </Typography>
        </Grid>
      </Grid>
      <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
      >
        <Grid sx={{ margin: 'auto'}}>
          <Grid item
            sx={{
              marginBottom: '1em',
              marginRight: '1em'
            }}
          >
            <Grid item>
              <Typography
                color="#B4BEDA"
                variant="subtitle2"
              >
                Mission Name
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color="#FFF"
                variant="subtitle2"
              >
                Mission 1
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography
                color="#B4BEDA"
                variant="subtitle2"
              >
                Drone Name
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color="#FFF"
                variant="subtitle2"
              >
                Drone 1
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Doughnut
            data={data}
            options={options}
          />
        </Grid>
      </Box>
      {renderDetails()}
    </CardContent>
  </Card>
  );
};
