import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import {BaseState} from "../model/base-state";
export class BaseStore<T extends BaseState> {
  state$: Observable<T>;
  readonly initialState?: T;

  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.initialState = initialState;
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.state$.pipe(
      map(state => state.loading),
    );
  }
  get state(): T {
    return this._state$.getValue();
  }

  get$<K>(property: keyof T): Observable<K> {
    return this.state$.pipe(
      map((state) => state[property] as K),
      distinctUntilChanged(),
    );
  }

  set<K>(property: keyof T, data: K) {
    this.setState({
      ...this.state,
      [property]: data,
    });
  }

  setState(nextState: T) {
    this._state$.next(nextState);
  }

  setLoading(loading: boolean) {
    this.setState({
      ...this.state,
      loading,
    });
  }
}
