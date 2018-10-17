import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import invariant from 'invariant';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack/webpack.dev.babel';
import {
  RegisterProductMutationPlugin,
  RegisterProductAndCreatePackItemMutationPlugin,
  RegisterBabelTagMutationPlugin
} from './plugins';
import {
  logSearchText,
} from './logger';
const { Pool } = require('pg');
const { postgraphile } = require('postgraphile');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'public');

const pool = new Pool({
  user: 'venepe',
  host: 'localhost',
  database: 'venepe',
  password: '5WRk22eYUUs',
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
app.use(postgraphile(pool, 'babelpack', {
    graphiql: true,
    appendPlugins: [
      RegisterProductMutationPlugin,
      RegisterProductAndCreatePackItemMutationPlugin,
      RegisterBabelTagMutationPlugin,
    ],
  }));

const compiler = webpack(webpackDevConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  quiet: true,
}));
app.use(webpackHotMiddleware(compiler, { log: false }));

// Serve static files from /public directory
app.use(express.static(DIST_DIR));

// This is kind of a History Api Fallback
app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

const server = app.listen(PORT, (error) => {
  invariant(!error, 'Something failed: ', error);
  console.info('Express is listening on PORT %s.', PORT);
});

server.setTimeout(10 * 60 * 1000);
