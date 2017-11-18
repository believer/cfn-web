// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import asyncComponent from '../../environment/asyncComponent'

const AsyncWorkouts = asyncComponent(() => import('./Workouts/Workouts'))

const Home = styled.div``

const LoggedIn = () => {
  return (
    <Home>
      <Switch>
        <Route path="/dashboard/workouts" component={AsyncWorkouts} />
      </Switch>
    </Home>
  )
}

export default LoggedIn
