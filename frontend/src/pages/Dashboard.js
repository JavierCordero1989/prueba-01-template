import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, IconButton, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 220;

const menuOptions = [
  { text: 'Inicio', icon: <HomeIcon /> },
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Configuración', icon: <SettingsIcon /> },
];

function Dashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Protección de ruta: verifica autenticación al cargar el Dashboard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/auth/check', { credentials: 'include' });
        console.log('Auth check response status:', response);
        if (!response.ok) {
          window.location.href = '/login';
        }
      } catch {
        window.location.href = '/login';
      }
    };
    checkAuth();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      // Llama al endpoint universal de logout
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      // Si hay URL de logout externo, redirige a ella
      if (data.externalLogout) {
        window.location.href = data.externalLogout;
      } else {
        window.location.href = 'http://localhost:3000/login';
      }
    } catch (error) {
      alert('Error al cerrar la sesión. Por favor, inténtalo más tarde.');
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Mi App
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuOptions.map((option) => (
          <ListItem button key={option.text}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
          <ListItemText primary="Cerrar sesión" primaryTypographyProps={{ color: 'error' }} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar">
        {/* Sidebar para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#fff' },
          }}
          open
        >
          {drawer}
        </Drawer>
        {/* Sidebar para mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Container maxWidth="md" sx={{ background: '#fff', borderRadius: 3, boxShadow: 3, py: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Bienvenido al Dashboard
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary', mb: 2 }}>
            Aquí irá el contenido principal de la aplicación.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
