import React from 'react';
import { Grid, Typography } from '@mui/material';

export const ColoredLine = ({ color }) => {
  return (
  <>
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
  </>)
};