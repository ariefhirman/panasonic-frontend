import React from "react"
import { Box, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ItemBoxProgress from './item-progress'
import SeatPicker from "react-seat-picker";
// import './item.css';

const initialState =  {
  success: [4,6,7],
  audited: [1,2,3]
}

const emptyBox = [
  1,26,43,52,53,59,66,67,68,69,70,76,83,84,85,96
]

export const ItemMatrixProgress = (props) => {
  const [progress, setProgress] = React.useState(props.data);
  const [clickable, setClickable] = React.useState(props.isClickable);
  const router = useRouter();
  React.useEffect(() => {
    setProgress(props.data);
  })

  const fillArray = (start, end) => {
    let tempArr = [];
    let interval = end - start
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
        return GenerateRows(array);
      case 'B':
        array = fillArray(18,34);
        return GenerateRows(array);
      case 'C':
        array = fillArray(35,51);
        return GenerateRows(array);
      case 'D':
        array = fillArray(52,68);
        return GenerateRows(array);
      case 'E':
        array = fillArray(69,85);
        return GenerateRows(array);
      case 'F':
        array = fillArray(86,102);
        return GenerateRows(array);
      default:
        // code block
    }
  }

  const GenerateRows = (boxNumbers) => {
    boxNumbers = boxNumbers.reverse();
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
                <ItemBoxProgress key={number} boxNumber={number} status={propStatus}/>
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