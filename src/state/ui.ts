import { BehaviorSubject, fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
} from "rxjs/operators";

type UIState = {
  innerHeight: number;
  innerWidth: number;
};

const mobileMq = 640;

const getIsMobile = (state: UIState) => state.innerWidth < mobileMq;

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

export const windowSize$ = UIState$.pipe(
  map(({ innerWidth, innerHeight }) => ({ innerWidth, innerHeight }))
);

export const isMobile$ = UIState$.pipe(
  map(getIsMobile),
  distinctUntilChanged()
);
