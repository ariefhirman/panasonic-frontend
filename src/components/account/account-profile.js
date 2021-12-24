import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const AccountProfile = (props) => (
  <Card {...props} 
    sx={{
      backgroundColor: "#252F3A"
    }}
  >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="#fff"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="#E7E8E9"
          variant="body2"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="#E7E8E9"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
