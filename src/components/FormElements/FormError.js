import styled from 'styled-components'

const FormError = styled.div`
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px 15px;
  position: relative;
`

export default FormError
