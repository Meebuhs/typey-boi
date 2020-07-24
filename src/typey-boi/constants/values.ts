// These parameters control how many paragraphs are displayed on either side of the current one.
// The higher these numbers are the longer it will take to perform a render.
// Completed paragraphs are more expensive than future. (~4x longer to render)

export const COMPLETED_PARAGRAPHS_TO_KEEP = 1
export const FUTURE_PARAGRAPHS_TO_LOAD = 2
