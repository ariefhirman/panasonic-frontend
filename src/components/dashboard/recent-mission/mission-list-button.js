import React from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Grid} from '@mui/material';

export const MissionListButton = (props) => {
  const router = useRouter();
  return (
    <>
    <Grid item 
      lg={4}
      sm={6}
      xl={4}
      xs={12}
      sx={{ 
        position: 'absolute', 
        right: '0', 
      }}
    >
    <Card
      className="mission-selector list-history-button"
      sx={{ 
        backgroundColor: '#252F3A', 
        width: '5em',
        borderRadius: 0.5,
        border: "0.1em solid",
        borderColor: "neutral.900",
        alignItems: 'center',
        display: 'flex',
      }}
      onClick={() => {
        router.push('/history');
      }}
    >
      <Box sx={{
        marginLeft: '25%'
      }}
      >
        <img
          justify="center" 
          alignItems="center"
          alt="drone-icon"
          src="/static/images/right-arrow.png"
          style={{
            height: 25,
            width: 25
          }}
        />
      </Box>
    </Card>
    </Grid>
    </>
  )
}