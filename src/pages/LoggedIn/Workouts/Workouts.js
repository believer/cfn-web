// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import Workout from './Workout'
import WorkoutsWrap from './WorkoutsWrap'
import WorkoutFilter from './WorkoutFilter'
import MyWorkouts from './MyWorkouts'
import AllWorkouts from './AllWorkouts'
import type { ActivitiesQuery, WOD } from '../../../schema.flow.js'

type Props = {
  data: ActivitiesQuery & {
    error?: ?{
      message: string
    },
    loading: boolean
  }
}

type State = {
  filteredActivities: WOD[]
}

class Workouts extends Component<Props, State> {
  state = {
    filteredActivities: [
      'DAGENS',
      'PERFORMANCE',
      'FITNESS',
      'HELG',
      'MASTODONT',
      'TRYOUT',
    ],
  }

  toggleType = (wod: WOD) => {
    this.setState(state => ({
      filteredActivities: state.filteredActivities.includes(wod)
        ? state.filteredActivities.filter(activity => activity !== wod)
        : state.filteredActivities.concat([wod]),
    }))
  }

  render () {
    const { data: { activities, myActivities, error, loading } } = this.props
    const { filteredActivities } = this.state

    if (error) {
      return <div>{error.message}</div>
    }

    if (loading) {
      return <div>Loading</div>
    }

    return (
      <WorkoutsWrap>
        <MyWorkouts activities={myActivities} />

        <WorkoutFilter
          selected={filteredActivities}
          toggleType={this.toggleType}
        />

        <AllWorkouts
          activities={activities}
          filteredActivities={filteredActivities}
        />
      </WorkoutsWrap>
    )
  }
}

const WorkoutsQuery = gql`
  query Activities($startDate: String, $endDate: String) {
    activities(startDate: $startDate, endDate: $endDate) {
      ...WorkoutActivity
    }
    myActivities {
      ...WorkoutActivity
    }
  }

  ${Workout.fragments.activity}
`

export default graphql(WorkoutsQuery, {
  options: {
    variables: {
      startDate: format(new Date(), 'YYYY-MM-DD'),
      endDate: format(addDays(new Date(), 5), 'YYYY-MM-DD'),
    },
  },
})(Workouts)
