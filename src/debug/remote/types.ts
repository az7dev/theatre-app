/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type EditorEvent =
  | 'setSheet'
  | 'setSheetObject'
  | 'updateSheetObject'
  | 'updateTimeline'

export interface BroadcastData {
  event: EditorEvent
  data: any
}

export type noop = () => void

export type BroadcastCallback = (data: BroadcastData) => void

export type TheatreUpdateCallback = (data: any) => void

// Default SheetObject.onValuesChange callback
export const defaultTheatreCallback: TheatreUpdateCallback = (_: any) => {}
