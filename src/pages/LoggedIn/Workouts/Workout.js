// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import type { WorkoutActivityFragment } from '../../../schema.flow.js'
import { opacity } from '../../../styles/theme'
import format from 'date-fns/format'
import svLocale from 'date-fns/locale/sv'

type Props = {
  activity: WorkoutActivityFragment
}

type State = {
  displayParticipants: boolean
}

const WorkoutWrap = styled.li`
  border-bottom: 1px solid #d4d4d4;
  border-left: 4px solid ${({ theme, wod }) => theme[wod]};
`

const WorkoutInformation = styled.div`
  align-items: center;
  background-color: ${({ booked, theme }) =>
    booked ? opacity(theme.lochmara, '0.1') : '#fff'};
  cursor: pointer;
  display: flex;
  padding: 20px;
  transition: background-color 100ms ease;

  &:hover {
    background-color: #e1e1e1;
  }
`

const WorkoutTitle = styled.header`font-weight: 700;`
const WorkoutTime = styled.div`font-size: 12px;`
const WorkoutCoach = styled.div`font-size: 12px;`
const WorkoutQueue = styled.div`
  font-size: 12px;
  margin-left: auto;
  text-align: right;
`

const Participants = styled.ul`
  background-color: #dadada;
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
            {activity.participants.map(person => (
              <li key={person.id}>{person.fullname}</li>
            ))}
          </Participants>
        )}
      </WorkoutWrap>
    )
  }
}
