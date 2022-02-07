import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Download as DownloadIcon } from '../../../icons/download';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

export const ProductScannedToolbar = (props) => {
  const [statusProduct, setStatusProduct] = React.useState('all-status');
  const [isLayout, setIsLayout] = React.useState(true);

  const handleStatus = (event, newStatus) => {
    if (newStatus !== null) {
      setStatusProduct(newStatus);
      props.parentCallbackStatus(newStatus);
    } else {
      props.parentCallbackStatus(statusProduct);
    }
  };

  const handleLayout = (event, newLayout) => {
    if (newLayout !== null) {
      setIsLayout(newLayout);
      props.parentCallbackLayout(newLayout);
    } else {
      props.parentCallbackLayout(isLayout);
    }
  };

  return (
  <Box {...props} sx={{ margin: '2em', marginBottom: '1em'}}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Box sx={{ m: 1 }}>
        <StyledToggleButtonGroup
          size="small"
          value={statusProduct}
          exclusive
          onChange={handleStatus}
          aria-label="status"
        >
          <ToggleButton 
            value="all-status" 
            aria-label="all-status"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            All Status
          </ToggleButton>
          <ToggleButton 
            value="success" 
            aria-label="success"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            High
          </ToggleButton>
          <ToggleButton 
            value="audit" 
            aria-label="audit"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            Low
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ m: 1 }}>
        {/* <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button> */}
        <StyledToggleButtonGroup
          size="small"
          value={isLayout}
          exclusive
          onChange={handleLayout}
          aria-label="layout"
        >
          <ToggleButton 
            value={true} 
            aria-label="true-state"
            sx={{
              backgroundColor: '#252F3A'
            }}
            
          >
            Table
          </ToggleButton>
          <ToggleButton 
            value={false} 
            aria-label="false-state"
            sx={{
              backgroundColor: '#252F3A'
            }}
          >
            Map
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Button
          sx={{ backgroundColor: '#397BBB' }}
          variant="contained"
        >
          <DownloadIcon />
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
        >
          Add Customers
        </Button> */}
      </Box>
    </Box>
  </Box>
  );
};
