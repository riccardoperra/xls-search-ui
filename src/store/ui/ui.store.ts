import { BehaviorSubject, fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  shareReplay,
} from "rxjs/operators";

export type UIState = {
  innerHeight: number;
  innerWidth: number;
};

const initialState: UIState = {
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
};

export const UIState$ = new BehaviorSubject(initialState);

export const windowResize$ = fromEvent(window, "resize").pipe(
  debounceTime(100),
  distinctUntilChanged(),
  shareReplay({ refCount: true, bufferSize: 1 })
);
