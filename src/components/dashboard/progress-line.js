import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ColoredLine } from './coloredline'

export const ProgressLine = () => {
  return (
  <>
    <Grid container>
      <Grid 
        item
        lg={2}
        md={2}
      >
        <Typography color="#FFF" variant="caption">
          A11
        </Typography>
      </Grid>
      <Grid 
        item
        lg={8}
        md={8}
      ></Grid>
      <Grid 
        item
        lg={2}
        md={2}
        sx={{ float: 'right'}}
      >
        <Typography color="#FFF" 
          variant="caption" 
        >
          C11
        </Typography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item lg={11} md={11} xl={11}>
        <ColoredLine color='#FFF' />
      </Grid>
    </Grid>
  </>)
};