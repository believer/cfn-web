// @flow

import React from 'react'
import { mount } from 'enzyme'
import WorkoutFilter from '../WorkoutFilter'
import 'jest-styled-components'

describe('components/WorkoutFilter', () => {
  let component
  let toggleType

  beforeEach(() => {
    toggleType = jest.fn()

    component = mount(
      <WorkoutFilter selected={['DAGENS']} toggleType={toggleType} />
    )
  })

  it('renders WorkoutFilter', () => {
    expect(component).toMatchSnapshot()
  })
})
