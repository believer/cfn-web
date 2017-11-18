// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import FormLabel from '../FormElements/FormLabel'
import FormError from './FormError'
import styled from 'styled-components'

type Props = {
  name: string,
  placeholder: string,
  required?: boolean,
  type?: string
}

type Context = {
  formik: {
    touched: Object,
    errors: Object
  }
}

const Wrap = styled.div`
  background: #fff;
  border-radius: 3px;
  margin-bottom: 10px;
`

const FormField = styled(Field)`
  background: none;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px 15px;
  transition: border ease-in-out 150ms;
  width: 100%;

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px white inset;
  }

  &:focus {
    border-color: ${({ theme }) => theme.lochmara};
    outline: none;
  }
`

const FormInput = (
  { name, placeholder, required, type }: Props,
  { formik }: Context
) => {
  const error = formik.errors[name]
  const touched = formik.touched[name]

  return (
    <div>
      <FormLabel htmlFor={name} label={placeholder} required={required} />
      <Wrap>
        <FormField
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      </Wrap>
      {!!error && touched && <FormError>{error}</FormError>}
    </div>
  )
}

FormInput.defaultProps = {
  type: 'text',
}

FormInput.contextTypes = {
  formik: PropTypes.object,
}

export default FormInput
