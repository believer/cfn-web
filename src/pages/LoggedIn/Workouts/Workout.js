// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import type { WorkoutActivityFragment } from '../../../schema.flow.js'

type Props = {
  activity: WorkoutActivityFragment
}

type State = {
  displayParticipants: boolean
}

const WorkoutWrap = styled.li`
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  border-left: 4px solid ${({ theme, wod }) => theme[wod]};
  padding: 20px;
`

const WorkoutInformation = styled.div`
  align-items: center;
  display: flex;
`
const WorkoutTitle = styled.header`font-weight: 700;`
const WorkoutTime = styled.div`font-size: 12px;`
const WorkoutCoach = styled.div`font-size: 12px;`
const WorkoutQueue = styled.div`
  font-size: 14px;
  margin-left: auto;
`

const Participants = styled.ul`
  background-color: #dadada;
  display: grid;
  font-size: 14px;
  grid-column-gap: 20px;
  grid-row-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  padding: 20px;
`

export default class Workout extends Component<Props, State> {
  static fragments = {
    activity: gql`
      fragment WorkoutActivity on Activity {
        booked
        coach
        date
        id
        name
        participants {
          fullname
          id
        }
        slots {
          open
          total
          waiting
        }
        time
        wod
      }
    `,
  }

  state = {
    displayParticipants: false,
  }

  toggleDisplayParticipants = () => {
    this.setState(state => ({
      displayParticipants: !state.displayParticipants,
    }))
  }

  render () {
    const { activity } = this.props
    const { displayParticipants } = this.state

    return (
      <WorkoutWrap key={activity.id} wod={activity.wod}>
        <WorkoutInformation onClick={this.toggleDisplayParticipants}>
          <div>
            <WorkoutTime>{activity.time}</WorkoutTime>
            <WorkoutTitle>{activity.name}</WorkoutTitle>
            <WorkoutCoach>{activity.coach}</WorkoutCoach>
          </div>

          <WorkoutQueue>
            Ledigt: {activity.slots.open} / Reserver: {activity.slots.waiting} /
            Platser: {activity.slots.total}
          </WorkoutQueue>
        </WorkoutInformation>

        {displayParticipants && (
          <Participants>
            {activity.participants.map(person => (
              <li key={person.id}>{person.fullname}</li>
            ))}
          </Participants>
        )}
      </WorkoutWrap>
    )
  }
}
