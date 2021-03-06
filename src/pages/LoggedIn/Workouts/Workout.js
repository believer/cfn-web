// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import type { WorkoutActivityFragment } from '../../../schema.flow.js'
import format from 'date-fns/format'
import svLocale from 'date-fns/locale/sv'

type Props = {
  activity: WorkoutActivityFragment
}

type State = {
  displayParticipants: boolean
}

const WorkoutWrap = styled.div`
  border-bottom: 1px solid #d4d4d4;
  border-left: 5px solid ${({ theme, wod }) => theme[wod]};
`

const WorkoutInformation = styled.div`
  align-items: center;
  background-color: ${({ booked }) => (booked ? '#f1f8ff' : '#fff')};
  cursor: pointer;
  display: flex;
  padding: 20px;
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: #efefef;
  }
`

const WorkoutTitle = styled.header`font-weight: 700;`
const WorkoutTime = styled.div`font-size: 12px;`
const WorkoutCoach = styled.div`font-size: 12px;`
const WorkoutQueue = styled.div`
  color: #586069;
  font-size: 12px;
  margin-left: auto;
  text-align: right;
`

const Participants = styled.ul`
  background-color: #fff;
  display: grid;
  font-size: 14px;
  grid-column-gap: 20px;
  grid-row-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
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
        timestamp
        wod
      }
    `,
  }

  state = {
    displayParticipants: false,
  }

  shouldComponentUpdate (nextProps: Props, nextState: State) {
    return nextState.displayParticipants !== this.state.displayParticipants
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
      <WorkoutWrap wod={activity.wod}>
        <WorkoutInformation
          booked={activity.booked}
          onClick={this.toggleDisplayParticipants}
        >
          <div>
            <WorkoutTime>
              {format(activity.date, 'dddd', { locale: svLocale })}{' '}
              {activity.time}
            </WorkoutTime>
            <WorkoutTitle>{activity.name}</WorkoutTitle>
            <WorkoutCoach>{activity.coach}</WorkoutCoach>
          </div>

          <WorkoutQueue>
            <div>
              Platser: {activity.slots.open} / {activity.slots.total}
            </div>
            <div>Reserver: {activity.slots.waiting}</div>
          </WorkoutQueue>
        </WorkoutInformation>

        {displayParticipants && (
          <Participants>
            {activity.participants.map((person, i) => (
              <li key={person.id || `person-${i}`}>{person.fullname}</li>
            ))}
          </Participants>
        )}
      </WorkoutWrap>
    )
  }
}
