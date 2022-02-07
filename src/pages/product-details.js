import React from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { MissionHistory } from 'src/components/dashboard/mission-history/mission-history';
import { ItemMatrixHistory } from 'src/components/item/item-matrix-history';
import { ProductVideoDetails } from 'src/components/product-details/product-video';
import { ProductInfo } from 'src/components/product-details/product-info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'
import AuthService from 'src/service/auth.service';

const MissionName = "Mission 1"

const initialState =  {
  success: [1,2,3],
  audited: [5,8]
}

const ProductDetail = () => {
  const [progress, SetProgress] = React.useState(initialState);
  const router = useRouter()

  React.useEffect(() => {
    let isUser = AuthService.getCurrentUser();
    if(!isUser) {
      router.push('/');
      // navigate('/app/data');
      // pindah kalo udh login
    }}
  );

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
          <Grid container sx={{ marginBottom: '2em'}}>
            <Grid item onClick={() => router.back()} sx={{ cursor: 'pointer', display: 'flex'}}>
              <ArrowBackIcon sx={{ marginRight: '0.5em', color: '#FFF'}} />
              <Typography color="#FFF" variant='h6'>
                Mission Overview
              </Typography>
            </Grid>
          </Grid>
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
              <ProductVideoDetails data={progress} missionName={MissionName} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <ProductInfo sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

ProductDetail.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProductDetail;
