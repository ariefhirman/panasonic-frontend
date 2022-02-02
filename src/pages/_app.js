import React, { useEffect } from "react";
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import '../style/item.css';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  // const [mqttClient, setMqttClient] = React.useState();
  // var mqtt    = require('mqtt');
  // // var options = {
  //   // protocol: 'mqtt',
  //   // clientId uniquely identifies client
  //   // choose any string you wish
  //   // clientId: 'b0908853' 	
  // // };
  // useEffect(() => {
  //   // Perform localStorage action
  //   var client  = mqtt.connect('mqtt://localhost:9005');
  //   setMqttClient(client);
  // })
  
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          {/* <mqttClientContext.Provider value={mqttClient}> */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          {/* </mqttClientContext.Provider> */}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
