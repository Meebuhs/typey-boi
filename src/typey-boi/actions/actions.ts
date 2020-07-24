import {
  ADD_CHARACTER,
  REMOVE_CHARACTER,
  COMPLETE_WORD,
  COMPLETE_PARAGRAPH,
  SET_TEXT,
  IRemoveCharacterAction,
  IAddCharacterAction,
  ICompleteWordAction,
  ICompleteParagraphAction,
  ISetTextAction,
} from 'constants/types'

export const addCharacter = (character: string): IAddCharacterAction => ({
  type: ADD_CHARACTER,
  payload: {
    character: character,
  },
})

export const removeCharacter = (): IRemoveCharacterAction => ({
  type: REMOVE_CHARACTER,
})

export const completeWord = (): ICompleteWordAction => ({
  type: COMPLETE_WORD,
})

export const completeParagraph = (): ICompleteParagraphAction => ({
  type: COMPLETE_PARAGRAPH,
})

export const setText = (text: string): ISetTextAction => ({
  type: SET_TEXT,
  payload: {
    text: text,
  },
})
