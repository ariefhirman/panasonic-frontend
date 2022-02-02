import React from "react"
import { Box, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ItemBoxTesting from './item-testing'
import SeatPicker from "react-seat-picker";
// import './item.css';

const initialState =  {
  success: [4,6,7],
  audited: [1,2,3]
}

const emptyBox = [
  25,42,52,53,60,66,67,68,69,70,77,83,84,85,86,90,101,102
]

export const ItemMatrixTesting = (props) => {
  const [progress, setProgress] = React.useState(props.data);
  const [clickable, setClickable] = React.useState(props.isClickable);
  const router = useRouter();

  const fillArray = (start, end) => {
    let tempArr = [];
    let interval = end - start
    console.log(start);
    console.log(end);
    for (let i = 0; i <= interval; i++) {
      tempArr[i] = start
      start++
    }
    return tempArr;
  }

  const generateArrayFromRows = (row) => {
    let array = []
    switch(row) {
      case 'A':
        array = fillArray(1,17);
        console.log(array);
        return GenerateRows(array);
      case 'B':
        array = fillArray(18,34);
        console.log(array);
        return GenerateRows(array);
      case 'C':
        array = fillArray(35,51);
        console.log(array);
        return GenerateRows(array);
      case 'D':
        array = fillArray(52,68);
        console.log(array);
        return GenerateRows(array);
      case 'E':
        array = fillArray(69,85);
        console.log(array);
        return GenerateRows(array);
      case 'F':
        array = fillArray(86,102);
        console.log(array);
        return GenerateRows(array);
      default:
        // code block
    }
  }

  const GenerateRows = (boxNumbers) => {
    return (
      <>
        {
          boxNumbers.map((number) => {
            let propStatus = 'box-black';
            if (progress.success.includes(number)) {
              propStatus = 'box-green';
            } else if (progress.audited.includes(number)) {
              propStatus = 'box-yellow';
            }

            if (emptyBox.includes(number)) {
              propStatus = '';
            }

            return (
              <Grid className="row" key={number}>
                <ItemBoxTesting key={number} boxNumber={number} status={propStatus}/>
              </Grid>
            );
          })
        }
      </>
    )
  }

	return (
    <Card
      sx={{
        backgroundColor: 'neutral.900',
        border: "1px solid #646A7B"
      }}
    >
      <div style={{ marginTop: '2em', marginLeft: '3em', marginBottom: '2em'}}>
        <Box 
          sx={{ 
            display: 'flex'
          }}
        >
          <Grid gridRow={7}>
            <Grid container sx={{ marginBottom: '2em'}}>
              <Grid sx={{ display: "flex",
                flexDirection: "column",
                justifyContent: "center"}}
              >
                <Typography color="#FFF" sx={{ paddingRight: '1em'}}>
                  A
                </Typography>
              </Grid>
              {generateArrayFromRows('A')}
            </Grid>
            <Grid container>
              <Grid sx={{ paddingRight: '1em'}}>
                <Typography color="#FFF">
                  B
                </Typography>
              </Grid>
              {generateArrayFromRows('B')}
            </Grid>
            <Grid container sx={{ marginBottom: '2em'}}>
              <Grid sx={{ paddingRight: '1em'}}>
                <Typography color="#FFF">
                  C
                </Typography>
              </Grid>
              {generateArrayFromRows('C')}
            </Grid>
            <Grid container>
              <Grid sx={{ paddingRight: '1em'}}>
                <Typography color="#FFF">
                  D
                </Typography>
              </Grid>
              {generateArrayFromRows('D')}
            </Grid>
            <Grid container sx={{ marginBottom: '2em'}}>
              <Grid sx={{ paddingRight: '1em'}}>
                <Typography color="#FFF">
                  E
                </Typography>
              </Grid>
              {generateArrayFromRows('E')}
            </Grid>
            <Grid container>
              <Grid sx={{ paddingRight: '1em'}}>
                <Typography color="#FFF">
                  F
                </Typography>
              </Grid>
              {generateArrayFromRows('F')}
            </Grid>
          </Grid>
        </Box>
      </div>
    </Card>
	)
}