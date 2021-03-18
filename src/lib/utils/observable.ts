import { BehaviorSubject, Observable } from "rxjs";
import { useEffect, useState } from "react";
import { distinctUntilChanged, tap } from "rxjs/operators";

type ObservableType<T extends Observable<any>> = T extends Observable<infer A>
  ? A
  : never;

export const setObservableState = <T extends BehaviorSubject<any>>(
  stateBehaviorSubject: T,
  newState: (state: ObservableType<T>) => Partial<ObservableType<T>>
) => {
  const _previousValue = stateBehaviorSubject.getValue();
  stateBehaviorSubject.next({
    ..._previousValue,
    ...newState(_previousValue),
  });
};

export const useObservable = <T extends Observable<any>>(state$: T) => {
  const [state, setState] = useState<ObservableType<T>>();

  useEffect(() => {
    const subscription = state$
      .pipe(
        distinctUntilChanged(),
        tap((state) => setState(state))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  });

  return [state];
};
