// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'
import { graphql } from 'react-apollo'
import format from 'date-fns/format'
import isFuture from 'date-fns/is_future'
import addDays from 'date-fns/add_days'
import svLocale from 'date-fns/locale/sv'
import styled from 'styled-components'
import Workout from './Workout'
import WorkoutFilter from './WorkoutFilter'
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

const WorkoutsWrap = styled.div`
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr;
  margin: 60px auto;
  width: 960px;
`
const WorkoutDay = styled.section``
const WorkoutsInDay = styled.section`box-shadow: 0 3px 3px rgba(0, 0, 0, 0.08);`
const WorkoutDayTitle = styled.header`
  color: #000;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 20px;
`

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

    const sortedByDay = activities
      .filter(activity => filteredActivities.includes(activity.wod))
      .filter(activity => isFuture(activity.timestamp * 1000))
      .reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = []
        }

        acc[curr.date].push(curr)

        return acc
      }, {})

    return (
      <WorkoutsWrap>
        <ul>
          <WorkoutDayTitle>Mina bokningar</WorkoutDayTitle>
          <WorkoutsInDay>
            {myActivities
              .filter(activity => isFuture(activity.timestamp * 1000))
              .map(activity => {
                return (
                  <WorkoutDay key={`workout-${activity.id}`}>
                    <Workout
                      activity={filter(Workout.fragments.activity, activity)}
                      key={activity.id}
                    />
                  </WorkoutDay>
                )
              })}
          </WorkoutsInDay>
        </ul>

        <WorkoutFilter
          selected={filteredActivities}
          toggleType={this.toggleType}
        />

        <ul>
          {Object.keys(sortedByDay).map((date, i) => {
            const activitiesInDay = sortedByDay[date]

            return (
              <WorkoutDay key={`workout-${i}`}>
                <WorkoutDayTitle>
                  {format(date, 'dddd YYYY-MM-DD', { locale: svLocale })}
                </WorkoutDayTitle>
                <WorkoutsInDay>
                  {activitiesInDay.map(activity => (
                    <Workout
                      activity={filter(Workout.fragments.activity, activity)}
                      key={activity.id}
                    />
                  ))}
                </WorkoutsInDay>
              </WorkoutDay>
            )
          })}
        </ul>
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
