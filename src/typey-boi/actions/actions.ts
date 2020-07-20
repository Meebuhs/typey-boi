import {
  REMOVE_CHARACTER,
  COMPLETE_WORD,
  ADD_CHARACTER,
  IRemoveCharacterAction,
  ICompleteWordAction,
  IAddCharacterAction,
} from 'constants/types'

export const removeCharacter = (): IRemoveCharacterAction => ({
  type: REMOVE_CHARACTER,
})

export const completeWord = (): ICompleteWordAction => ({
  type: COMPLETE_WORD,
})

export const addCharacter = (character: string): IAddCharacterAction => ({
  type: ADD_CHARACTER,
  payload: {
    character: character,
  },
})
