// @flow

import React from 'react'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'
import { graphql } from 'react-apollo'
import format from 'date-fns/format'
import isFuture from 'date-fns/is_future'
import addDays from 'date-fns/add_days'
import styled from 'styled-components'
import Workout from './Workout'
import type { ActivitiesQuery } from '../../../schema.flow.js'

type Props = {
  data: ActivitiesQuery & {
    error?: ?{
      message: string
    },
    loading: boolean
  }
}

const WorkoutsWrap = styled.div`
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr;
  margin: 60px auto;
  width: 960px;
`
const WorkoutDay = styled.section``
const WorkoutDayTitle = styled.header`
  color: #000;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 20px;
`

const Workouts = ({ data: { activities, error, loading } }: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  const sortedByDay = activities
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
        {Object.keys(sortedByDay).map((date, i) => {
          const activitiesInDay = sortedByDay[date]

          return (
            <WorkoutDay key={`workout-${i}`}>
              <WorkoutDayTitle>{date}</WorkoutDayTitle>
              {activitiesInDay.map(activity => (
                <Workout
                  activity={filter(Workout.fragments.activity, activity)}
                  key={activity.id}
                />
              ))}
            </WorkoutDay>
          )
        })}
      </ul>
    </WorkoutsWrap>
  )
}

const WorkoutsQuery = gql`
  query Activities($startDate: String, $endDate: String) {
    activities(startDate: $startDate, endDate: $endDate) {
      ...WorkoutActivity
      timestamp
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
