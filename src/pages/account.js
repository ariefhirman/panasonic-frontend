import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import AuthService from 'src/service/auth.service';

const Account = () => {
  const router = useRouter();
  // React.useEffect(() => {
  //   let isUser = AuthService.getCurrentUser();
  //   if(!isUser) {
  //     router.push('/');
  //     // navigate('/app/data');
  //     // pindah kalo udh login
  //   }}
  // );

  return (
  <>
    <Head>
      <title>
        Account | Material Kit
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
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3, color: "#FFF" }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
