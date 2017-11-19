// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import type { RouterHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import FormInput from '../../components/FormElements/FormInput'
import Button from '../../components/Button/Button'
import styled from 'styled-components'
import backgroundImage from './img/cfn-bg.jpg'
import logo from './img/cfn-logo.png'

type Props = {
  location: {
    search: string
  },
  mutate: Function,
  history: RouterHistory
}

const LoginBackground = styled.div`
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  display: flex;
  justify-content: center;
  height: 100vh;
`

const LoginOverlay = styled.div`
  background-color: ${({ theme }) => theme.lochmara};
  bottom: 0;
  left: 0;
  opacity: 0.1;
  position: fixed;
  right: 0;
  top: 0;
`

const LoginWrap = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
  padding: 20px;
  position: relative;
  width: 300px;
  z-index: 1;
`

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  max-width: 60%;
`

const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

class Login extends Component<Props> {
  handleSubmit = async values => {
    const result = await this.props.mutate({
      variables: {
        input: {
          ...values,
        },
      },
    })

    localStorage.setItem('token', result.data.login)
    this.props.history.push('/workouts')
  }

  render () {
    return (
      <LoginBackground>
        <LoginOverlay />
        <LoginWrap>
          <Logo alt="CrossFit Nordic logo" src={logo} />
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={this.handleSubmit}
            render={() => (
              <Form className="Login__form">
                <FormInput name="username" placeholder="Användarnamn" />
                <FormInput
                  name="password"
                  placeholder="Lösenord"
                  type="password"
                />
                <FormFooter>
                  <Button buttonStyle="primary" type="submit">
                    Logga in
                  </Button>
                </FormFooter>
              </Form>
            )}
          />
        </LoginWrap>
      </LoginBackground>
    )
  }
}

const LoginMutation = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`

export default graphql(LoginMutation)(Login)
