import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  background-color: #e77587;
  border: 0;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.9;
  padding: 10px 20px;
  transition: opacity 200ms ease-in-out;

  ${props =>
    props.disabled &&
    `
    background-color: #ccc;
  `};

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 1;
  }
`

Button.defaultProps = {
  type: 'button'
}

export default Button
