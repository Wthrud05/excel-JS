export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn)
    }   
  }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('test', data => console.log('Sub:', data))

// setTimeout(() => {
//   emitter.emit('test', 'after 2s')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('test', 'after 4s')
// }, 4000)


// emitter.emit('dfdsf', 2342)
// emitter.emit('test', 2342)
