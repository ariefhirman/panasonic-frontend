import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

export const DroneOverview = (props) => {
  const theme = useTheme();
  let total = props.data.success.length + props.data.audited.length;
  let success = ((total - (props.data.audited.length)) / total) * 100;
  let failed = ((total - props.data.success.length) / total) * 100

  const data = {
    datasets: [
      {
        data: [success, failed],
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

  const devices = [
    {
      title: 'Matched',
      value: props.data.success.length,
      color: '#11AC92'
    },
    {
      title: 'Audited',
      value: props.data.audited.length,
      color: '#F2A900'
    }
    // {
    //   title: 'Mobile',
    //   value: 23,
    //   icon: PhoneIcon,
    //   color: '#FB8C00'
    // }
  ];

  return (
    <Card {...props}
      sx={{
        backgroundColor: 'neutral.900',
        border: "1px solid #646A7B"
      }}
    >
      {/* <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      > */}
      <CardContent>
        <Card 
          sx={{ 
            display: 'flex', 
            backgroundColor: 'neutral.900',
            border: "1px solid #646A7B",
            marginBottom: '2em',
          }}
          borderColor="#F00"
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
             >
              <Grid item
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
                    Drone 1
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
                    Flight Status
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    variant="subtitle1"
                    color="#F00" 
                  >
                    OFF
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
                    Recent Flight Duration
                  </Typography>
                </Grid>
                <Grid item
                >
                  <Typography 
                    variant="subtitle1"
                    color="#FFF" 
                  >
                    07:45:23
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
                    Total Flight Duration
                  </Typography>
                </Grid>
                <Grid item
                >
                  <Typography 
                    variant="subtitle1"
                    color="#FFF" 
                  >
                    07:45:23
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            height: 200,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="#FFF"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="substitle1"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
      {/* </Grid> */}
    </Card>
  );
};
