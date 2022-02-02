import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Fab, Grid, InputLabel, LinearProgress, MenuItem, Select, Typography, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import StopIcon from '@mui/icons-material/Stop';
import { ColoredLine } from '../dashboard/coloredline';
// import { MediaCard } from './media-card';

export const ProductInfo = (props) => {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(0);
  const [dataStatus, setDataStatus] = React.useState(props.data);
  const [note, setNote] = React.useState('');
  const [statusInput, setStatusInput] = React.useState(false);
  // let status_input = false;

  const handleChange = (event, newNotes) => {
    if (event.target.value !== null) {
      setNote(event.target.value);
    }
    setNote(event.target.value);
    console.log(event.target.value)
    if (event.target.value === 'Input') {
      setStatusInput(true)
    } else {
      setStatusInput(false)
    }
  };

  const renderInputProduct = () => {
    console.log(statusInput);
    if (!statusInput) {
      return (
        <Grid container>
          <Grid item
            lg={4}
            md={6}
            sx={{
              marginLeft: '1em',
              marginBottom: '1em'
            }}
          >
            <Grid item>
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Input Product Code
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
              <TextField
                  color='secondary'
                  name="product-code"
                  type="text"
                  disabled
                  fullWidth
                  sx={{ 
                    input: { color: '#FFF' },   
                    marginRight: '0.5em',
                }}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item
            lg={4}
            md={6}
            sx={{
              marginLeft: '1em',
              marginBottom: '1em'
            }}
          >
            <Grid item>
              <Typography
                color="#B4BEDA"
                variant="caption"
              >
                Input Product Code
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
              <TextField
                  color='secondary'
                  name="mission-speed"
                  type="text"
                  fullWidth
                  sx={{ 
                    input: { color: '#FFF' },   
                    marginRight: '0.5em',
                }}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }
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
                  // alignItems: 'center',
                }}
            >
              <Grid container>
                <Grid item
                  xl={3}
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                      sx={{
                        marginRight: '0.5em'
                      }}
                    >
                      Line
                    </Typography>
                    <Typography
                      color="#397BBB"
                      variant="substitle1"
                      sx={{
                        padding: '0.25em',
                        border: '1px solid #374657',
                        backgroundColor: '#374657'
                      }}
                    >
                      A
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  xl={3}
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                >
                </Grid>
                <Grid item
                  xl={3}
                  lg={2}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em',
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                      sx={{
                        marginRight: '0.5em'
                      }}
                    >
                      Order
                    </Typography>
                    <Typography
                      color="#397BBB"
                      variant="substitle1"
                      sx={{
                        padding: '0.25em',
                        border: '1px solid #374657',
                        backgroundColor: '#374657'
                      }}
                    >
                      1
                    </Typography>
                  </Grid> 
                </Grid>
              </Grid>
            </Box>
            <Box
              // sx={{
              //   display: 'flex',
              //   alignItems: 'center',
              // }}
            >
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Product Code
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
                  <TextField
                    name="product-code"
                    type="text"
                    fullWidth
                    sx={{ 
                      color: '#FFF',
                      input: { color: '#FFF' },   
                      marginRight: '0.5em',
                      height: '2em',
                    }}
                    size="small"
                    value="123456"
                  />
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                ></Grid>
              </Grid>
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Date Scanned
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
                      color="#FFF"
                      variant="subtitle2"
                    >
                      09/12/2021
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                ></Grid>
              </Grid>
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Time Scanned
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
                      color="#FFF"
                      variant="subtitle2"
                    >
                      03:35 PM
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                ></Grid>
              </Grid>
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Confidence Value
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
                      color="#FFF"
                      variant="subtitle2"
                    >
                      0.468
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                ></Grid>
              </Grid>
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Status
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
                      color="#F2A900"
                      variant="subtitle2"
                    >
                      Low
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                  <Grid item>
                    <Typography
                      color="#B4BEDA"
                      variant="caption"
                    >
                      Note
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
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        // label="Finish"
                        onChange={handleChange}
                        sx={{ 
                          color: '#FFF',
                          height: '2em',
                        }}
                        size="small"
                      >
                        <MenuItem value={'Audit'}>
                          <Typography variant="caption">
                            Audit
                          </Typography>
                        </MenuItem>
                        <MenuItem value={'Resolved'}>
                          <Typography variant="caption">
                            Resolved
                          </Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto'
                  }}
                ></Grid>
              </Grid>
              {/* {renderInputProduct()} */}
              <Grid container>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    marginLeft: '1em',
                    marginBottom: '1em'
                  }}
                >
                </Grid>
                <Grid item
                  lg={4}
                  md={6}
                  sx={{
                    margin: 'auto',
                    marginBottom: '1em',
                  }}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      size="small"
                      type="submit"
                      variant="contained"
                      sx={{
                        marginTop: '5em',
                        float: 'right'
                      }}
                      // disabled
                    >
                      <Typography variant="caption">
                        Save
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          {/* </CardContent>
        </Card> */}
      </CardContent>
      {/* </Grid> */}
    </Card>
  );
};
