import {DOMListener} from './DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    
    this.prepare()
  }

  // Настройка компонента до метода init()
  prepare() {}

  // Возвращиет шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляет слушателей о событии event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  //  Подпиисывается на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Инициализирует компонент
  // Добавляет слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляет компонент и слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
