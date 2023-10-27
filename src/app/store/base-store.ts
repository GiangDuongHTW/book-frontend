import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
export class BaseStore<T> {
  state$: Observable<T>;
  readonly initialState?: T;

  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.initialState = initialState;
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  get$<K>(property: keyof T): Observable<K> {
    return this.state$.pipe(
      map((state) => state[property] as unknown as K),
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

  clear() {
    this._state$.next(this.initialState!);
  }
}
