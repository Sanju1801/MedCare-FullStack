import * as dotenv from "dotenv";
dotenv.config();

const config = {
  serverPort: process.env.PORT,
  dbUser: process.env.USER,
  database: process.env.DATABASE,
  dbPassword: process.env.DBPASS,
  dbPort: process.env.DBPORT,
  max: process.env.POOLSIZE,
  idleTimeoutMillis: process.env.TIMEOUT,
  connectionTimeoutMillis: process.env.MILLIS,
  googleClientID: process.env.GOOGLECLIENTID,
  googleClientSecret: process.env.GOOGLECLIENTSECRET,
  googleCallbackURL: process.env.GOOGLECALLBACKURL,
  jwtSecret: process.env.JWTSECRETKEY,
  expiresIn: process.env.JWTEXPIRES,
  adminName: process.env.ADMIN_NAME,
  adminPass: process.env.ADMIN_PASS,
  adminEmail: process.env.ADMIN_EMAIL, 
  sessionSecret: process.env.SESSIONSECRET,
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

export default config;
