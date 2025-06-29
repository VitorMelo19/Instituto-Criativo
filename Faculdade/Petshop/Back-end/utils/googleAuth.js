// utils/googleAuth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../config/db');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  // extrai e-mail e foto do perfil Google
  const email = profile.emails[0].value;
  const imageUrl = profile.photos?.[0]?.value || '';

  // 1) pesquisa usuário existente
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return done(err);
    if (results.length) {
      // já existe → devolve
      return done(null, results[0]);
    }
    // 2) não existe → insere novo registro, incluindo foto (imagem)
    const sql = `
      INSERT INTO users (nome, sobrenome, email, senha, imagem)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [givenName, familyName] = profile.name.givenName
      ? [profile.name.givenName, profile.name.familyName || '']
      : [profile.displayName, ''];
    db.query(sql,
      [givenName, familyName, email, '', imageUrl],
      (err, result) => {
        if (err) return done(err);
        db.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err, res2) => {
          if (err) return done(err);
          done(null, res2[0]);
        });
      }
    );
  });
}));

// Serialização “básica” (só usaremos JWT depois)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    done(err, results[0]);
  });
});

module.exports = passport;
