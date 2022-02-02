import React from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { RecentMissionCard } from './recent-mission-card';
import { MissionListButton } from './mission-list-button';

export const RecentMission = (props) => {
  const [activeIndex, SetActiveIndex] = React.useState(0);

  const handleCallback = (index) => {
    SetActiveIndex(index);
    console.log(index);
  }

  return (
    <Grid 
      className="recent-mission-list"
      container 
      column={12} 
      spacing={1} 
      sx={{  
        marginBottom: '1em', 
        marginLeft: '0.5em'}}>
      {[...Array(3)].map((x, i) =>
        <RecentMissionCard key={i} className="mission-selector" index={i} parentcallback={handleCallback} activeindex={activeIndex}/>
      )}
      <MissionListButton />
    </Grid>
  );
};