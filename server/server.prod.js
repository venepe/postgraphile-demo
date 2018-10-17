const path = require('path')
const express = require('express')
import bodyParser from 'body-parser';
const compression = require('compression')
const invariant = require('invariant')
const fs = require('fs');
const http = require('http');
const https = require('https');
import {
  RegisterProductMutationPlugin,
  RegisterProductAndCreatePackItemMutationPlugin,
  RegisterBabelTagMutationPlugin
} from './plugins';
import {
  logSearchText,
} from './logger';
const { Pool } = require('pg');
const { postgraphile } = require("postgraphile");

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'public');
// const CERT_DIR = path.resolve(__dirname, '..', 'etc/letsencrypt/live/babelpack.com');

const pool = new Pool({
  user: 'venepe',
  host: 'postgres',
  database: 'venepe',
  password: '5WRk22eYUUs',
  port: 5432,
});

const app = express();

// Automatic https redirect
// app.use((req, res, next) => {
//   if (req.hostname !== 'localhost' && req.get('X-Forwarded-Proto') !== 'https') {
//     return res.redirect(`https://${req.hostname}${req.url}`);
//   }
//   return next();
// });

app.use(bodyParser.json());

app.use('/graphql', (req, res, next) => {
  if (req.body) {
    const { operationName, variables } = req.body;
    if (operationName === 'searchBabels') {
      logSearchText({ pool, text: variables.search });
    }
  }
  next();
});

//GraphQL Api
app.use(postgraphile(pool, 'babelpack', {
    graphiql: false,
    appendPlugins: [
      RegisterProductMutationPlugin,
      RegisterProductAndCreatePackItemMutationPlugin,
      RegisterBabelTagMutationPlugin,
    ],
  }));

// https://github.com/expressjs/compression
app.use(compression());

// Serve static files from /public directory
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// Starting both http
const httpServer = http.createServer(app);

// app.listen(PORT, (error) => {
//   invariant(!error, 'Something failed: ', error);
//   console.info('Express is listening on PORT %s.', PORT);
// });

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

// Certificate
// try {
//   const privateKey = fs.readFileSync(path.resolve(CERT_DIR, 'privkey.pem'), 'utf8');
//   const certificate = fs.readFileSync(path.resolve(CERT_DIR, 'cert.pem'), 'utf8');
//   const ca = fs.readFileSync(path.resolve(CERT_DIR, 'chain.pem'), 'utf8');
//
//   const credentials = {
//   	key: privateKey,
//   	cert: certificate,
//   	ca: ca
//   };
//
//   const httpsServer = https.createServer(credentials, app);
//
//   httpsServer.listen(443, () => {
//   	console.log('HTTPS Server running on port 443');
//   });
//
// } catch (error) {
//   console.log('HTTPS Server not running: verify certs created and mapped correctly');
//   console.log(error);
// }
