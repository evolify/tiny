# tiny
Tiny utils for web develop

## install
```
pnpm add @evolify/tiny
```

## tiny-store
tiny store for React

### usage
- create store
```jsx
// store.js
import createStore from "@evolify/tiny/store"

const initialState = {
  tasks: [],
  counter: 0
}

const { state, update, useData } = createStore({tasks: []})

export function addTask(title){
  update({
    tasks: state.tasks.concat({
      title,
      updateTime: Date.now()
    })
  })
}

export function increase(){
  update(state => ({
    counter: state.counter + 1
  }))
}

export { useData, addTask, increase }

```
- use store
```jsx
// App.jsx
import { useData, increase } from "./store.js"
export function App(){
  // Get whole state and destruct
  const { counter } = useData()
  // or get needed state
  const tasks = useData(state => state.tasks)
  return (
    <div className="page">
      <button onClick={increase}>{counter}</button>
    </div>
  )
}
```
