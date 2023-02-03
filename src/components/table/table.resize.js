import {$} from '../../core/dom'

export function resizeHandler($root, e) {
  return new Promise(resolve => {
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const type = $resizer.data.resize
    const id = $parent.data.col
    const coords = $parent.getCoords()
    const side = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: '1',
      [side]: '-5000px'
    })
    
    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-${type}="${id}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })
      
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })
    }
  })
}
