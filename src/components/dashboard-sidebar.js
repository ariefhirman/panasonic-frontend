import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Cog as CogIcon } from '../icons/cog';
import { User as UserIcon } from '../icons/user';
import { TableSplit as MissionIcon } from '../icons/table-split';
import { Progress as ProgressIcon } from '../icons/progress';
import { History as HistoryIcon } from '../icons/history';
import { Logout as LogoutIcon } from '../icons/logout';
import HomeIcon from '@mui/icons-material/Home';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import AuthService from 'src/service/auth.service';

const items = [
  {
    href: '/dashboard',
    icon: (<HomeIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/mission-config',
    icon: (<MissionIcon fontSize="small" />),
    title: 'Mission Configuration'
  },
  {
    href: '/check-progress',
    icon: (<ProgressIcon fontSize="small" />),
    title: 'Check Progress'
  },
  {
    href: '/history',
    icon: (<HistoryIcon fontSize="small" />),
    title: 'History'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  }
  // {
  //   href: '/product-details',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Product Details'
  // },
  // {
  //   href: '/success-launched',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Success'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const logout = () => {
    AuthService.logout();
  };

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#161C23'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <img
                    alt="panasonic-logo"
                    src="/static/images/panasonic-white.png"
                    style={{
                      height: '2em',
                      width: '12em',
                      marginTop: '1em',
                      marginLeft: '1em'
                    }}
                    align="center"
                  />
              </a>
            </NextLink>
          </Box>
        </div>
        {/* <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        /> */}
        <Box sx={{ flexGrow: 1, marginTop: '1em' }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        {/* <Divider sx={{ borderColor: '#2D3748' }} /> */}
        <NavItem
          icon={(<LogoutIcon fontSize="small" />)}
          href='/'
          title="Logout"
          onClick={logout}
        />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
