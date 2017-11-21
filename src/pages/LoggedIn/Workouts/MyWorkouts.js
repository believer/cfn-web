// @flow

import React from 'react'
import isFuture from 'date-fns/is_future'
import WorkoutsInDay from './WorkoutsInDay'
import WorkoutDayTitle from './WorkoutDayTitle'
import WorkoutsList from './WorkoutsList'
import Workout from './Workout'
import { filter } from 'graphql-anywhere'
import type { WorkoutActivityFragment } from '../../../schema.flow.js'

type Props = {
  activities: WorkoutActivityFragment[]
}

const MyWorkouts = ({ activities }: Props) => {
  if (!activities.length) {
    return 'Inga bokade aktiviteter'
  }

  return (
    <WorkoutsList>
      <WorkoutDayTitle>Mina bokningar</WorkoutDayTitle>
      <WorkoutsInDay>
        {activities
          .filter(activity => isFuture(activity.timestamp * 1000))
          .map(activity => (
            <Workout
              activity={filter(Workout.fragments.activity, activity)}
              key={activity.id}
            />
          ))}
      </WorkoutsInDay>
    </WorkoutsList>
  )
}

export default MyWorkouts
