import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, useTheme } from '@mui/material';
import { MissionHistoryCard } from './mission-history-card';

export const MissionHistory = (props) => {
  const [activeIndex, SetActiveIndex] = React.useState(0);

  const handleCallback = (index) => {
    SetActiveIndex(index);
    console.log(index);
  }

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
      <CardContent 
        className="mission-history-list"
        style={{
        height: "750px",
        border: "2px solid black",
        overflow: "hidden",
        overflowY: "scroll" // added scroll
      }}>
        {[...Array(10)].map((x, i) =>
          <MissionHistoryCard key={i} className="mission-selector" index={i} parentcallback={handleCallback} activeindex={activeIndex}/>
        )}
      </CardContent>
      {/* </Grid> */}
    </Card>
  );
};
