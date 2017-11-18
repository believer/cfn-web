// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import gql from 'graphql-tag'
import FormInput from '../../components/FormElements/FormInput'
import Button from '../../components/Button/Button'
import type { RouterHistory } from 'react-router-dom'

type Props = {
  location: {
    search: string
  },
  mutate: Function,
  history: RouterHistory
}

class Login extends Component<Props> {
  handleSubmit = async values => {
    const result = await this.props.mutate({
      variables: {
        input: {
          ...values
        }
      }
    })

    localStorage.setItem('token', result.data.login)
    this.props.history.push('/dashboard/workouts')
  }

  render() {
    return (
      <div className="Login">
        <div className="Login__form-wrapper">
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={this.handleSubmit}
            render={() => (
              <Form className="Login__form">
                <FormInput name="username" placeholder="Username" />
                <FormInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Button type="submit">Login</Button>
              </Form>
            )}
          />
        </div>
      </div>
    )
  }
}

const LoginMutation = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`

export default graphql(LoginMutation)(Login)
