import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import MicrosoftStrategy from 'passport-microsoft';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(`El id enviado es: ${id}`);
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.user.upsert({
      where: { 
        provider_providerId: { 
            provider: 'google', 
            providerId: profile.id 
        },
    },
      update: {
        name: profile.displayName,
        email: profile.emails[0].value,
      },
      create: {
        email: profile.emails[0].value,
        name: profile.displayName,
        provider: 'google',
        providerId: profile.id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
