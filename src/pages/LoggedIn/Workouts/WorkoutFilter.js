// @flow

import React from 'react'
import type { WOD } from '../../../schema.flow.js'
import styled from 'styled-components'

type Props = {
  selected: WOD[],
  toggleType: (wod: WOD) => void
}

const WorkoutFilterWrap = styled.div`display: flex;`

const WorkoutWODType = styled.div`
  background-color: ${({ selected, theme, wod }) =>
    selected ? theme[wod] : '#fff'};
  border-radius: 3px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.08);
  color: ${({ selected, inverse }) =>
    selected ? (inverse ? 'inherit' : ' #fff') : 'inherit'};
  cursor: pointer;
  padding: 5px 15px;

  &:hover {
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const WorkoutFilter = ({ selected, toggleType }: Props) => {
  return (
    <WorkoutFilterWrap>
      <WorkoutWODType
        inverse
        selected={selected.includes('DAGENS')}
        onClick={() => toggleType('DAGENS')}
        wod="DAGENS"
      >
        Dagens pass
      </WorkoutWODType>
      <WorkoutWODType
        inverse
        selected={selected.includes('HELG')}
        onClick={() => toggleType('HELG')}
        wod="HELG"
      >
        Helgpass
      </WorkoutWODType>
      <WorkoutWODType
        inverse
        selected={selected.includes('MASTODONT')}
        onClick={() => toggleType('MASTODONT')}
        wod="MASTODONT"
      >
        Mastodontpass
      </WorkoutWODType>
      <WorkoutWODType
        selected={selected.includes('PERFORMANCE')}
        onClick={() => toggleType('PERFORMANCE')}
        wod="PERFORMANCE"
      >
        Performance
      </WorkoutWODType>
      <WorkoutWODType
        selected={selected.includes('FITNESS')}
        onClick={() => toggleType('FITNESS')}
        wod="FITNESS"
      >
        Fitness
      </WorkoutWODType>
      <WorkoutWODType
        selected={selected.includes('TRYOUT')}
        onClick={() => toggleType('TRYOUT')}
        wod="TRYOUT"
      >
        Prova på
      </WorkoutWODType>
    </WorkoutFilterWrap>
  )
}

export default WorkoutFilter
