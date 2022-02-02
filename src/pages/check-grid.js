import React from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { MissionHistory } from 'src/components/dashboard/mission-history/mission-history';
import { ItemMatrixTesting } from 'src/components/item/item-matrix-testing';

const MissionName = "Mission 1"

const initialState =  {
  success: [],
  audited: []
}

const History = () => {
  const [progress, SetProgress] = React.useState(initialState);

  return (
    <>
      <Head>
        <title>
          History
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: 'neutral.900',
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/* <Sales /> */}
              <ItemMatrixTesting data={progress} missionName={MissionName} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <MissionHistory sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

History.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default History;
