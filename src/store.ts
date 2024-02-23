import { useSyncExternalStore, useMemo } from "react"

export default function createStore<S>(initialState: S) {
  let state = initialState
  let listeners: Array<(data: S) => void> = []

  function emit(data: S) {
    for (let listener of listeners) {
      listener(data)
    }
  }

  function subscribe(listener: (data: S) => void) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  function getData() {
    return state
  }

  function update(data: Partial<S>): S
  function update(updater: (state: S) => Partial<S>): S
  function update(payload: Partial<S> | ((state: S) => Partial<S>)) {
    let data: Partial<S>
    if (typeof payload === "function") {
      data = payload(state)
    } else {
      data = payload
    }
    state = {
      ...state,
      ...data,
    }
    emit(state)
    return state
  }

  function useData(): S
  function useData<T>(compute: (state: S) => T): T
  function useData<T>(compute?: (state: S) => T): S | T {
    const state = useSyncExternalStore(subscribe, getData) as S
    if(!compute){
      return state
    }
    // const state = useData()
    return useMemo(() => compute(state), [state])
  }

  return {
    state,
    update,
    subscribe,
    useData,
  }
}
