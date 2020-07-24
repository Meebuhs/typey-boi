import { reducer } from 'reducers/typey-boi'
import { createStore } from 'redux'
import { initialState } from 'models/typey-boi'
import { loadState, saveState } from 'store/localStorage'

let persistedState = loadState()
if (!persistedState) {
  persistedState = initialState
}
export const store = createStore(reducer, persistedState)

store.subscribe(() => {
  saveState(store.getState())
})
