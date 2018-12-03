const path = require('path')
const express = require('express')
import bodyParser from 'body-parser';
const compression = require('compression')
const invariant = require('invariant')
const fs = require('fs');
const http = require('http');
const https = require('https');
import {
  logSearchText,
} from './logger';
const { Pool } = require('pg');
const { postgraphile } = require("postgraphile");

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'public');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'supersecretpswd',
  port: 5432,
});

const app = express();

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
app.use(postgraphile(pool, 'carco', {
    graphiql: false,
    appendPlugins: [],
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

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});
