import styled from 'styled-components'
import { mediaQueries } from 'styles'


const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 10px;

  ${mediaQueries.md} {
    padding: 25px 25px;
  }
`

export default Content
