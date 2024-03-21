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
import Store from "@evolify/tiny/store"

const initialState = {
  tasks: [],
  counter: 0
}

export const store = new Store(initialState)

export function addTask(title){
  store.update({
    tasks: store.state.tasks.concat({
      title,
      updateTime: Date.now()
    })
  })
}

export function increase(){
  store.update(state => ({
    counter: state.counter + 1
  }))
}

export { store, addTask, increase }

```
- use store
```jsx
// App.jsx
import { store, increase } from "./store.js"

export function App(){
  // Get whole state and destruct
  const { counter } = store.use()
  // or get needed state
  const tasks = store.use(state => state.tasks)

  return (
    <div className="page">
      <button onClick={increase}>{counter}</button>
    </div>
  )
}
```
