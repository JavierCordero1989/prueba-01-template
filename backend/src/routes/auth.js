import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'http://localhost:3000/login',
}));

// Logout universal (POST por seguridad y cumplimiento REST)
router.post('/logout', (req, res) => {
  // Documentación: Cierra sesión local y, si aplica, redirige a logout del proveedor OAuth
  const provider = req.user?.provider; // 'google', 'facebook', 'microsoft', etc.
  console.log(`Iniciando logout para el proveedor: ${provider}`);
  
  req.logout((err) => {
    if (err) {
      // Manejo de errores controlado, sin exponer detalles internos
      return res.status(500).json({ message: 'Error al cerrar la sesión. Por favor, inténtalo más tarde.' });
    }
    res.clearCookie('connect.sid', { path: '/' });

    // URLs de logout de proveedores externos
    const logoutUrls = {
      google: 'https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/login',
      facebook: 'https://www.facebook.com/logout.php?next=http://localhost:3000/login&access_token=' + (req.user?.accessToken || ''),
      microsoft: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000/login'
    };

    // Si el usuario inició sesión con un proveedor, devolver la URL de logout correspondiente
    if (provider && logoutUrls[provider]) {
      return res.status(200).json({ message: 'Sesión cerrada correctamente.', externalLogout: logoutUrls[provider] });
    }

    // Si no hay proveedor externo, solo cerrar sesión local
    res.status(200).json({ message: 'Sesión cerrada correctamente.' });
  });
});

// // Facebook OAuth
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: 'http://localhost:3000/dashboard',
//   failureRedirect: 'http://localhost:3000/login',
// }));

// // Microsoft OAuth (Hotmail/Outlook)
// router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }));
// router.get('/microsoft/callback', passport.authenticate('microsoft', {
//   successRedirect: 'http://localhost:3000/dashboard',
//   failureRedirect: 'http://localhost:3000/login',
// }));

export default router;
