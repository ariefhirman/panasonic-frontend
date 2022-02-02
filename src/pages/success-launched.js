import React from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link';

const SuccessLaunched = () => {

  return (
    <>
      <Head>
        <title>
          Customers | Material Kit
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
        <Container sx={{
          marginTop: '10%'
        }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              <img
                alt="drone-icon"
                src="/static/images/success-launched.png"
                style={{
                  height: '35%',
                  width: '40%'
                }}
              />
          </Box>
          <Box
          >
            <Typography color="#FFF" style={{ textAlign: 'center'}} variant="h5">
              Drone Successfully Launched
            </Typography>
            <NextLink href="/check-progress">
              <Typography color="#397BBB" style={{ textAlign: 'center', marginTop: '1em', cursor: 'pointer'}} variant="subtitle1">
                Go To Check Progress
              </Typography>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

SuccessLaunched.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SuccessLaunched;
