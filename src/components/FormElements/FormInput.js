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
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  display: flex;
  margin-bottom: 10px;
  transition: border-color ease-in-out 150ms, box-shadow ease-in-out 150ms;
`

const FormField = styled(Field)`
  background: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px 15px;
  transition: border ease-in-out 150ms, box-shadow ease-in-out 150ms;
  width: 100%;

  &:focus {
    box-shadow: 0px 0px 5px #e77587;
    outline: none;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px white inset;
    border: 0;
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
