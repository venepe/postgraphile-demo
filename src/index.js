import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import client from './apolloClient';
import injectGlobal, { theme } from './styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { withTheme } from '@material-ui/core/styles';

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#dbffff',
      main: '#a7ffeb',
      dark: '#75ccb9'
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ffb2dd',
      main: '#ff80ab',
      dark: '#c94f7c',
      // contrastText: '#ffcc00',
    },
  },
});

injectGlobal();

const render = () => {
  ReactDOM.render(
    (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={materialTheme}>
          <BrowserRouter>
            {renderRoutes(routes)}
          </BrowserRouter>
          </MuiThemeProvider>
        </ThemeProvider>
      </ApolloProvider>
    ),
    document.getElementById('root'),
  );
};

render()

if (module.hot) {
  module.hot.accept()
}
