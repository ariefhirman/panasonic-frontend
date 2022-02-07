import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Card, Container, Grid } from '@mui/material';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { RecentMission } from '../components/dashboard/recent-mission/recent-mission';
import { MissionListButton } from 'src/components/dashboard/recent-mission/mission-list-button';
import { DroneOverview } from '../components/dashboard/drone-overview';
import { DashboardLayout } from '../components/dashboard-layout';
import { ItemMatrix } from 'src/components/item/item-matrix';
import { ProductScannedList } from 'src/components/dashboard/overview/product-scanned-list';
import { ProductScannedToolbar } from 'src/components/dashboard/overview/product-scanned-toolbar';
import { products } from '../__mocks__/products';
import AuthService from 'src/service/auth.service';
import DetectionService from 'src/service/detection.service';

const getLayoutState = (products, state) => {
  for (let i in products) {
    if (products[i].confidence_level == 'Low') {
      state.audited.push(parseInt(products[i].segment.slice(1)))
    } else {
      state.success.push(parseInt(products[i].segment.slice(1)))
    }
  }
}

const Dashboard = () => {
  const router = useRouter();
  let initialState =  {
    success: [],
    audited: []
  }

  getLayoutState(products, initialState);

  const [progress, setProgress] = React.useState(initialState);
  const [statusTable, setStatusTable] = React.useState('')
  const [tableLayout, setTableLayout] = React.useState(true);

  let data;

  React.useEffect(() => {
    let isUser = AuthService.getCurrentUser();
    if(!isUser) {
      router.push('/');
      // navigate('/app/data');
      // pindah kalo udh login
    }}
  );

  React.useEffect(() => {
    let detectionData = DetectionService.fetchDetectionByStatus(1);
    console.log(detectionData);
  })

  let dataProduct = products;

  const filterProduct = (products, status) => {
    if (status == 'success') {
      var filtered = products.filter(function(product){ 
        return product.confidence_level == 'High';
      });
    } else if (status == 'audit') {
      var filtered = products.filter(function(product){ 
        return product.confidence_level == 'Low';
      });
    } else {
      return products
    }
    return filtered
  }
  
  const handleCallbackLayout = (data) => {
    setTableLayout(data);
  }

  const handleCallbackStatus = (data) => {
    setStatusTable(data);
  }

  const renderLayout = (isTableLayout) => {
    let data = filterProduct(dataProduct, statusTable)
    if (!isTableLayout) {
      return (
        <ItemMatrix data={progress} isClickable={true}/>
      );
    }

    return (
      <Box sx={{ mt: 3 }}>
        <ProductScannedList products={data} />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>
          Dashboard
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
            <RecentMission data={progress} />
            {/* <MissionListButton /> */}
            <Grid container column={12} spacing={1} sx={{ marginBottom: '1em', marginLeft: '0.5em'}}>
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                {/* <ItemMatrix data={progress} /> */}
                <Card
                  sx={{
                    backgroundColor: 'neutral.900',
                    border: "1px solid #646A7B"
                  }}
                >
                  <ProductScannedToolbar parentCallbackLayout={handleCallbackLayout} parentCallbackStatus={handleCallbackStatus} />
                  {renderLayout(tableLayout)}
                </Card>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <DroneOverview data={progress} sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
