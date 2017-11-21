/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type WOD =
  | 'DAGENS'
  | 'PERFORMANCE'
  | 'FITNESS'
  | 'HELG'
  | 'MASTODONT'
  | 'TRYOUT'

export type LoginInput = {|
  username: string,
  password: string
|}

export type ActivitiesQueryVariables = {|
  startDate?: ?string,
  endDate?: ?string
|}

export type ActivitiesQuery = {|
  activities: Array<{|
    booked: boolean,
    coach: string,
    date: string,
    id: number,
    name: string,
    participants: Array<{|
      fullname: string,
      id: ?number
    |}>,
    slots: {|
      open: number,
      total: number,
      waiting: number
    |},
    time: string,
    wod: WOD,
    timestamp: number
  |}>,
  myActivities: Array<{|
    booked: boolean,
    coach: string,
    date: string,
    id: number,
    name: string,
    participants: Array<{|
      fullname: string,
      id: ?number
    |}>,
    slots: {|
      open: number,
      total: number,
      waiting: number
    |},
    time: string,
    timestamp: number,
    wod: WOD
  |}>
|}

export type loginMutationVariables = {|
  input: LoginInput
|}

export type loginMutation = {|
  login: string
|}

export type WorkoutActivityFragment = {|
  booked: boolean,
  coach: string,
  date: string,
  id: number,
  name: string,
  participants: Array<{|
    fullname: string,
    id: ?number
  |}>,
  slots: {|
    open: number,
    total: number,
    waiting: number
  |},
  time: string,
  timestamp: number,
  wod: WOD
|}
