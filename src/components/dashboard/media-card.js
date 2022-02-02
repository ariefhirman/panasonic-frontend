import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export const MediaCard = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/auth.jpeg"
        alt="Video Stream"
      />
    </Card>
  );
}