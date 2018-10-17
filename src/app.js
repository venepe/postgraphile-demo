import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { renderRoutes } from 'react-router-config'
import { Content, Navbar, Link } from 'components'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const App = ({ route, location }) => (
  <Container>
    <AppBar position="static">
      <Toolbar>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant="title" color="textSecondary">
          Babelpack
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
    <Content>
      {renderRoutes(route.routes)}
    </Content>
  </Container>
);

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
