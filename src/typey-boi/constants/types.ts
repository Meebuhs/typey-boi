// Action types
export const ADD_CHARACTER = 'ADD_CHARACTER'
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER'
export const COMPLETE_WORD = 'COMPLETE_WORD'
export const COMPLETE_PARAGRAPH = 'COMPLETE_PARAGRAPH'
export const SET_TEXT = 'SET_TEXT'

export interface IAddCharacterAction {
  type: typeof ADD_CHARACTER
  payload: {
    character: string
  }
}

export interface IRemoveCharacterAction {
  type: typeof REMOVE_CHARACTER
}

export interface ICompleteWordAction {
  type: typeof COMPLETE_WORD
}

export interface ICompleteParagraphAction {
  type: typeof COMPLETE_PARAGRAPH
}

export interface ISetTextAction {
  type: typeof SET_TEXT
  payload: {
    text: string
  }
}

export type Action =
  | IAddCharacterAction
  | IRemoveCharacterAction
  | ICompleteWordAction
  | ICompleteParagraphAction
  | ISetTextAction

// File event types
export interface IFileReaderEventTarget extends EventTarget {
  result: string
}

export interface IFileReaderEvent extends Event {
  target: IFileReaderEventTarget
  getMessage(): string
}

export interface IFileSelectorEventTarget extends EventTarget {
  files: FileList
}

export interface IFileSelectorEvent extends Event {
  target: IFileSelectorEventTarget
  getMessage(): string
}
