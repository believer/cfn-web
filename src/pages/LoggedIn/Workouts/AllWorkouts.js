// @flow

import React from 'react'
import isFuture from 'date-fns/is_future'
import svLocale from 'date-fns/locale/sv'
import format from 'date-fns/format'
import WorkoutsInDay from './WorkoutsInDay'
import WorkoutDayTitle from './WorkoutDayTitle'
import WorkoutsList from './WorkoutsList'
import Workout from './Workout'
import { filter } from 'graphql-anywhere'
import type { WorkoutActivityFragment, WOD } from '../../../schema.flow.js'

type Props = {
  activities: WorkoutActivityFragment[],
  filteredActivities: WOD[]
}

const AllWorkouts = ({ activities, filteredActivities }: Props) => {
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
    <WorkoutsList>
      {Object.keys(sortedByDay).map((date, i) => (
        <div key={`workout-${i}`}>
          <WorkoutDayTitle>
            {format(date, 'dddd YYYY-MM-DD', { locale: svLocale })}
          </WorkoutDayTitle>
          <WorkoutsInDay>
            {sortedByDay[date].map(activity => (
              <Workout
                activity={filter(Workout.fragments.activity, activity)}
                key={activity.id}
              />
            ))}
          </WorkoutsInDay>
        </div>
      ))}
    </WorkoutsList>
  )
}

export default AllWorkouts
