import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { ProgressLine } from '../progress-line'

export const RecentMissionCard = (props) => {
  let index = props.index;
  let activeIndex = props.activeindex;
  let bordercolor = '';
  if (index == activeIndex) {
    bordercolor="#397BBB"
  }

  const selectedItems = () => {
    activeIndex = index;
    props.parentcallback(activeIndex);
    bordercolor="#397BBB";
  }

  return (
  <Grid
        item
        lg={4}
        sm={6}
        xl={4}
        xs={12}
  >
  <Card
    sx={{ height: '100%', backgroundColor: '#252F3A' }}
    style={{ border: "1px solid", borderColor: bordercolor }}
    {...props}
    onClick={selectedItems}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="#646A7B"
            gutterBottom
            variant="overline"
          >
            09 December 2021
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="#FFF"
            gutterBottom
            variant="overline"
          >
            43 Swept
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            color="#B4BEDA"
            gutterBottom
          >
            Warehouse Scan
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <ProgressLine color='#FFF' />
      </Grid>
      <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
      >
        <Grid item
          sx={{
            marginRight: '2em'
          }}
        >
          <Grid item>
            <Typography
              color="#B4BEDA"
              variant="caption"
            >
              Start Point
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="#FFF"
              variant="caption"
            >
              A1, 1
            </Typography>
          </Grid>
        </Grid>
        <Grid item
          sx={{
            marginRight: '2em'
          }}
        >
          <Grid item>
            <Typography
              color="#B4BEDA"
              variant="caption"
            >
              End Point
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="#FFF"
              variant="caption"
            >
              C1, 1
            </Typography>
          </Grid>
        </Grid>
        <Grid item
          sx={{
            marginRight: '2em'
          }}
        >
          <Grid item>
            <Typography
              color="#B4BEDA"
              variant="caption"
            >
              Total Time
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="#FFF"
              variant="caption"
            >
              2:28:30
            </Typography>
          </Grid>
        </Grid>
        <Grid item
          sx={{
            marginRight: '2em'
          }}
        >
          <Grid item>
            <Typography
              color="#B4BEDA"
              variant="caption"
            >
              Total Scanned
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="#FFF"
              variant="caption"
            >
              243
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
  </Grid>);
};
