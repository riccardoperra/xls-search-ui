import { distinctUntilChanged, map } from "rxjs/operators";
import { UIConfig } from "./ui.config";
import { UIState, UIState$ } from "./ui.store";

const getIsMobile = (state: UIState) =>
  state.innerWidth < UIConfig.mobileMediaBreakpoint;

export const windowSize$ = UIState$.pipe(
  map(({ innerWidth, innerHeight }) => ({ innerWidth, innerHeight })),
  distinctUntilChanged()
);

export const isMobile$ = UIState$.pipe(
  map(getIsMobile),
  distinctUntilChanged()
);
