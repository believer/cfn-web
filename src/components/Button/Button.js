import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  background-color: rgb(229, 229, 229);
  border: 0;
  border-radius: 3px;
  color: rgb(68, 68, 68);
  cursor: pointer;
  font-size: 16px;
  opacity: 0.9;
  padding: 10px 20px;
  transition: opacity 200ms ease-in-out;

  ${({ buttonStyle, theme }) =>
    buttonStyle === 'primary' &&
    `background-color: ${theme.lochmara};color:#fff;`};

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
  type: 'button',
}

export default Button
