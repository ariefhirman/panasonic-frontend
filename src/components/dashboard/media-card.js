import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export const MediaCard = (props) => {
  const [previousIndex, setPreviousIndex] = React.useState(0);
  const [nextIndex, setNextIndex] = React.useState(0);
  let slideImages = ['/static/images/placeholder.png'];
  if (props.data.length > 0) {
    slideImages = props.data;
  }

  return (
    <Card>
      <Slide
        defaultIndex={nextIndex}
        easing="ease"
        arrows={false}
        autoplay={true}
        onChange={(previous, next) => {
          setPreviousIndex(previous);
          setNextIndex(next);
        }}
      >
        {slideImages.map((slide, index) => {
          return (
            <div style={{ height: '20vh'}} key={slide}>
              <div style={{ 
                backgroundImage: `url(${slideImages[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                height: '20vh'
              }}>
              </div>
            </div>
          );
        })}
      </Slide>
    </Card>
  );
}