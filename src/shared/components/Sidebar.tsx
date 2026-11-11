import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router';
import { MdDashboard, MdOutlineInventory2, MdOutlinePeople } from '../../assets/icons';

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { to: '/customers', label: 'Clientes', icon: MdOutlinePeople },
  { to: '/products', label: 'Productos', icon: MdOutlineInventory2 },
];

export default function Sidebar() {
  return (
    <Box
      component="nav"
      aria-label="Navegación principal"
      sx={{
        width: { xs: '100%', lg: 240 },
        position: { xs: 'sticky', lg: 'fixed' },
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        height: { lg: '100dvh' },
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderBottom: { xs: 1, lg: 0 },
        borderRight: { xs: 0, lg: 1 },
        borderColor: 'divider',
        p: { xs: 1, sm: 2 },
        // Reserve space for navigation in the adjacent page content.
        '& + main': {
          minWidth: 0,
          minHeight: { lg: '100dvh' },
          ml: { xs: 0, lg: '240px' },
          p: { xs: 2, sm: 3, lg: 4 },
        },
      }}
    >
      <Typography
        component="p"
        variant="h6"
        sx={{ px: 2, pt: { xs: 0, lg: 1 }, pb: 1, fontWeight: 700 }}
      >
        Cotiflow
      </Typography>
      <List
        disablePadding
        sx={{ display: 'flex', flexDirection: { xs: 'row', lg: 'column' }, flexWrap: 'wrap', gap: 1 }}
      >
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <ListItem
            key={to}
            disablePadding
            sx={{ flex: { xs: '1 1 auto', lg: 'initial' }, width: { xs: 'auto', lg: '100%' } }}
          >
            <ListItemButton
              component={NavLink}
              to={to}
              sx={{
                minHeight: 48,
                px: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                '&.active': {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                  '& .MuiListItemText-primary': { fontWeight: 700 },
                },
                '&.active:hover': { bgcolor: 'action.hover' },
                '&.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: -2,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                <Icon size={24} aria-hidden="true" focusable="false" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
