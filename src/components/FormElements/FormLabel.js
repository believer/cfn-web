// @flow

import React from 'react'
import styled from 'styled-components'

type Props = {
  htmlFor: string,
  label: string,
  required?: boolean
}

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`

const Required = styled.span`
  color: red;
  margin-left: 5px;
`

const FormLabel = ({ htmlFor, label, required }: Props) => {
  return (
    <Label htmlFor={htmlFor}>
      {label}
      {required && <Required>*</Required>}
    </Label>
  )
}

export default FormLabel
