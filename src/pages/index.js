import React, { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Divider } from '@mui/material';
import AuthService from 'src/service/auth.service';

const Login = () => {
  useEffect(() => {
    let isUser = AuthService.getCurrentUser();
    if(isUser) {
      router.push('/dashboard');
      // navigate('/app/data');
      // pindah kalo udh login
    }}
  );
  
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'loremipsum@lorem.com',
      password: 'Password123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (values, { resetForm }) => {
      router.push('/dashboard');
      // AuthService.login(values.email, values.password).then(
      //   () => {
      //     // const userData = AuthService.getCurrentUser();
      //     router.push('/dashboard');
      //     // navigate('/app/data', { replace: true, state: { node_id: data_node } });
      //     // window.location.reload();
      //   },
      //   error => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //     console.log(error.message);
      //     resetForm();
      //   }
      // );
    }
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          backgroundColor: 'neutral.900',
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  justify="center" 
                  alignItems="center"
                  // style={{ borderRight: '0.1em solid black' }}
                >
                  <img
                    alt="panasonic-logo"
                    src="/static/images/panasonic-logo.png"
                    style={{
                      height: '5rem',
                      width: '30rem'
                    }}
                    align="center"
                  />
                  <Divider 
                    orientation="vertical" 
                    flexItem
                    sx={{
                      margin: '2.5em'
                    }} 
                  />
              </Grid>
              <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  
                >
                <Typography
                  color="#fff"
                  variant="h3"
                  align="center"
                  sx={{
                    marginBottom: '0.5em'
                  }}
                >
                  Login
                </Typography>
                <TextField
                  color='secondary'
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                  sx={{ input: { color: '#FFF' } }}
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                  sx={{ input: { color: '#FFF' } }}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
                </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
