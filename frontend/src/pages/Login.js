
import React from 'react';
import { Container, Typography, Button, Stack, Box, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const providers = [
  { name: 'Google', url: 'http://localhost:4000/auth/google' },
  { name: 'Facebook', url: 'http://localhost:4000/auth/facebook' },
  { name: 'Microsoft', url: 'http://localhost:4000/auth/microsoft' },
];

function Login() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3, textAlign: 'center', background: '#fff' }}>
          <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Bienvenido
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Accede a tu cuenta para continuar
          </Typography>
          <Stack spacing={2}>
            {providers.map((prov) => (
              <Button
                key={prov.name}
                variant="contained"
                color="primary"
                fullWidth
                href={prov.url}
                sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 16, py: 1.5, boxShadow: 2 }}
              >
                Iniciar sesión con {prov.name}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
