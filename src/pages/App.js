import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { client } from '../environment/ApolloSetup'
import { injectGlobal, ThemeProvider } from 'styled-components'
import asyncComponent from '../environment/asyncComponent'
import ScrollToTop from './ScrollToTop'
import LoggedIn from './LoggedIn/LoggedIn'
import theme from '../styles/theme'

const AsyncLogin = asyncComponent(() => import('./Login/Login'))

injectGlobal`
  body {
    background-color: #e5e5e5;
    color: rgb(34, 34, 34);
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={AsyncLogin} />
              <Route path="/workouts" render={LoggedIn} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
