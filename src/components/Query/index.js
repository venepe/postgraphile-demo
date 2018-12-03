import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import Spinner from '../Spinner'
import Message from '../Message'
import Button from '@material-ui/core/Button';

export const QueryWrapper = ({ children, ...rest }) => (
  <Query {...rest}>
    {({ loading, error, data, fetchMore, networkStatus, refetch }) => {
      if (loading && networkStatus !== 3) {
        return <Spinner />
      }

      if (error) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Message type="error" text={`Error! ${error.message}`} />
              <Button onClick={() => {refetch()}}>Retry?</Button>
            </div>
        )
      }

      return children({ loading, error, data, fetchMore, networkStatus })
    }}
  </Query>
)

QueryWrapper.propTypes = {
  children: PropTypes.func.isRequired,
}

export default QueryWrapper
