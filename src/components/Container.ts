import styled from '@emotion/styled'
import constants from '../assets/theme/constants'

const Container = styled('div')`
  width: ${constants.containerSizes.xl};
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.values.xl}px) {
    width: ${constants.containerSizes.lg};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.values.lg}px) {
    width: ${constants.containerSizes.md};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    width: ${constants.containerSizes.sm};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    width: 90%;
  }
`

export default Container
