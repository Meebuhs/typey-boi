// Action types
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER'
export const COMPLETE_WORD = 'COMPLETE_WORD'
export const ADD_CHARACTER = 'ADD_CHARACTER'

export interface IRemoveCharacterAction {
  type: typeof REMOVE_CHARACTER
}

export interface ICompleteWordAction {
  type: typeof COMPLETE_WORD
}

export interface IAddCharacterAction {
  type: typeof ADD_CHARACTER
  payload: {
    character: string
  }
}

export type Action =
  | IRemoveCharacterAction
  | ICompleteWordAction
  | IAddCharacterAction
