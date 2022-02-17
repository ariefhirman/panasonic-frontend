import React from "react"
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import ItemBoxConfig from './item-config'
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

let listBox = [];
// let rackSize = [];
// const width = 2.7;
// const level_height = [
//   1.225, 1.05, 1.06
// ];

// const emptyBox = [
//   25,42,52,53,60,66,67,68,69,70,77,83,84,85,86,90,101,102
// ]

const emptyBox = [
  1,26,43,52,53,59,66,67,68,69,70,76,83,84,85,96
]

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    textTransform: 'none',
    color: '#FFF',
    border: 0,
    '&.Mui-selected': {
      border: 0,
      backgroundColor: '#397BBB'
    },
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const ItemMatrixConfig = (props) => {
  const [boxSelected, setBoxSelected] = React.useState([]);
  const [layoutConfig, setLayoutConfig] = React.useState('right');
  const [firstSelected, setFirstSelected] = React.useState(0);
  const [selectedRack, setSelectedRack] = React.useState(false);

  const resetConfigHandler = () => {
    setBoxSelected([]);
    listBox = [];
    window.location.reload(); 
  }

  const handleLayout = (event, newStatus) => {
    if (newStatus !== null) {
      setLayoutConfig(newStatus);
      props.callbackLayout(newStatus);
    } else {
      props.callbackLayout(layoutConfig);
    };
  };

  const handleCallback = (data) => {
    console.log(data);
    if (listBox.includes(data)) {
      return;
    }
    // listBox.push(boxSelected);
    listBox.push(data);
    console.log(listBox);
    setBoxSelected(listBox);

    let turningPoint = getTurningPoint(listBox[0]);
    setFirstSelected(listBox[0]);
    props.callbackSweep(listBox);
    props.callbackTurningPoint(turningPoint);
  };

  const fillArray = (start, end) => {
    let tempArr = [];
    let interval = end - start
    for (let i = 0; i <= interval; i++) {
      tempArr[i] = start
      start++
    }
    return tempArr;
  }

  const generateArrayFromRowsV2 = (row) => {
    let array = []
    switch(row) {
      case 'A':
        array = fillArray(1,17);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      case 'B':
        array = fillArray(18,34);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      case 'C':
        array = fillArray(35,51);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      case 'D':
        array = fillArray(52,68);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      case 'E':
        array = fillArray(69,85);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      case 'F':
        array = fillArray(86,102);
        if (selectedRack) {
          return GenerateUsableRows(array, firstSelected)
        }
        return GenerateRows(array);
      default:
        // code block
    }
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

  const getTurningPoint = (num) => {
    let prefix;
    let numPrefix = (num / 18) >> 0;
    switch(numPrefix) {
      case 0:
        prefix = 17;
        break;
      case 1:
        prefix = 34;
        break;
      case 2:
        prefix = 51;
        break;
      case 3:
        prefix = 68;
        break;
      case 4:
        prefix = 85;
        break;
      case 5:
        prefix = 102;
        break;
    }
    return prefix;
  };

  const generateIntervalsFromIndex = (index) => {
    let intervals = {
      start: 0,
      stop: 0
    };
    let startInterval;
    let stopInterval;
    console.log(index);
    if (1 <= index && index <= 34) {
      startInterval = 1
      stopInterval = 34
    } else if (34 < index && index <= 68) {
      startInterval = 34
      stopInterval = 68
    } else if (68 < index && index <= 102) {
      startInterval = 68
      stopInterval = 102
    }
    intervals.start = startInterval
    intervals.stop = stopInterval
    return intervals
  }

  const GenerateUsableRows = (arrNumber, index) => {
    let boxNumbers = arrNumber.reverse();
    if (layoutConfig != 'right') {
      boxNumbers = boxNumbers.reverse();
    } 
    let usableRows = generateIntervalsFromIndex(index);
    // let boxNumbers = arrNumber;
    // console.log(boxNumbers);
    return (
      <>
        {
          boxNumbers.map((number) => {
            let propStatus = 'box-black'
            if (emptyBox.includes(number)) {
              propStatus = '';
            }

            if (usableRows.start <= number && number <= usableRows.stop) {
              propStatus = '';
            }

            {/* if () */}

            return (
              <Grid className="row" key={number}>
                <ItemBoxConfig 
                  key={number} 
                  boxNumber={number} 
                  parentcallback={handleCallback} 
                  status={propStatus}
                  emptylayout={emptyBox}  
                />
              </Grid>
            );
          })
        }
      </>
    )
  }
  
  const GenerateRows = (arrNumber) => {
    let boxNumbers = arrNumber.reverse();
    if (layoutConfig != 'right') {
      boxNumbers = boxNumbers.reverse();
    } 
    // console.log(boxNumbers[2]);
    // let boxNumbers = arrNumber;
    // console.log(boxNumbers);
    return (
      <>
        {
          boxNumbers.map((number) => {
            let propStatus = 'box-black'
            if (emptyBox.includes(number)) {
              propStatus = '';
            }

            return (
              <Grid className="row" key={number}>
                <ItemBoxConfig 
                  key={number} 
                  boxNumber={number} 
                  parentcallback={handleCallback} 
                  status={propStatus}
                  emptylayout={emptyBox}  
                />
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
    <Card
      sx={{
        backgroundColor: '#252F3A',
        marginTop: '2em', marginLeft: '2em', marginRight: '2em',
        display: 'flex'
        // border: "1px solid #646A7B"
      }}
    >
      <Grid item sx={{
        marginTop: '1em', 
        marginLeft: '2em', 
        marginBottom: '1em',
      }}>
        <Typography 
          color="#FFF" 
          variant="subtitle1"
        >
          Layout
        </Typography>
        <StyledToggleButtonGroup
          size="small"
          value={layoutConfig}
          exclusive
          onChange={handleLayout}
          aria-label="layout"
        >
          <ToggleButton 
            value="left" 
            aria-label="left"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            Left
          </ToggleButton>
          <ToggleButton 
            value="right" 
            aria-label="right"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            Right
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Grid>
    </Card>  
    <div style={{ marginTop: '2em', marginLeft: '3em', marginBottom: '2em', marginRight: '3em'}}>
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
      <Grid container>
        <Grid item lg={12}>
          <Button
            color="primary"
            size="small"
            type="submit"
            variant="contained"
            sx={{
              marginTop: '2em',
              marginBottom: '1em',
              marginRight: '3em',
              float: 'right'
            }}
            onClick={resetConfigHandler}
          >
            <Typography variant="caption">
            Reset Config
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
    </Card>
	)
}