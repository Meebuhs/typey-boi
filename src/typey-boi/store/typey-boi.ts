import { reducer } from 'reducers/typey-boi'
import { createStore } from 'redux'
import { initialState } from 'models/typey-boi'

export const store = createStore(reducer, initialState)
