;(() => {
  // below the breakpoint the menu will not push the content sideways
  // but covers it and will always start in a hidden state
  const SM_BREAKPOINT = 750

  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => Array.from(document.querySelectorAll(selector))

  // is the storage writable? maybe not... (safari private, out of quota etc.)
  let hasLocalStorage = true
  try {
    localStorage.setItem('foo', 'bar')
    if (localStorage.getItem('foo') !== 'bar') hasLocalStorage = false
    localStorage.removeItem('foo')
  } catch (err) {
    hasLocalStorage = false
  }

  // scroll to the currently selected link
  ;(() => {
    // since the menu is hidden below this width,
    // we don't want to retain the vertical position
    if (document.body.clientWidth < SM_BREAKPOINT) return
    const selectedMenuItem = document.querySelector('.menu-item.selected')
    if (selectedMenuItem) {
      selectedMenuItem.scrollIntoView(true)
    }
  })()

  // add menu toggle
  ;(() => {
    let isHidden = hasLocalStorage ? localStorage.getItem('sidebar-preference') === 'hidden' : false
    if (document.body.clientWidth < SM_BREAKPOINT) {
      isHidden = true
    }
    if (isHidden) {
      document.body.classList.add('sidebar-hidden')
    }
    const handleMenuToggle = (event) => {
      event?.preventDefault()
      isHidden = !isHidden
      document.body.classList.toggle('sidebar-hidden')
      if (hasLocalStorage) localStorage.setItem('sidebar-preference', isHidden ? 'hidden' : 'visible')
    }
    document.addEventListener('keyup', (event) => {
      if (event.key === 'M') handleMenuToggle()
    })

    // let's skip the animation for the one that happens at the end of the page load
    setTimeout(() => document.body.classList.add('allow-sidebar-transitions'), 1000)
  })()

  // handle menu tree auto collapse
  ;(() => {
    const getDepth = (el) => parseInt(el.className.match(/depth-(\d+)/)[1], 10)
    const isSelected = (el) => el.className.split(' ').includes('selected')

    const collapseTree = () => {
      if (hasLocalStorage) localStorage.setItem('sidebar-collapse', 'collapse')
      document.body.classList.add('sidebar-collapsed')
      const menuItems = $$('.menu .menu-item')
      const selectedNode = $('.menu .menu-item.selected')
      let d2Parent = getDepth(selectedNode) === 2 ? selectedNode : null // depth 2 parent (or self)
      // hide all, but if we have a deeper node selected, then let's update the d2 parent
      menuItems.forEach((el, idx) => {
        const depth = getDepth(el)
        const selected = isSelected(el)
        if (depth > 2) el.style.display = 'none'
        if (selected && depth > 2) {
          d2Parent = menuItems
            .slice(0, idx)
            .reverse()
            .find((pastEl) => getDepth(pastEl) === 2)
        }
      })
      // unhide everything between the d2 parent and the next d2 element (or the end of the list)
      if (d2Parent) {
        const groupIdx = menuItems.indexOf(d2Parent)
        for (let idx = groupIdx + 1; idx < menuItems.length; idx++) {
          const el = menuItems[idx]
          if (getDepth(el) <= 2) break
          el.style.display = ''
        }
      }
    }

    const expandTree = () => {
      if (hasLocalStorage) localStorage.setItem('sidebar-collapse', 'expand')
      document.body.classList.remove('sidebar-collapsed')
      $$('.menu .menu-item').forEach((el) => (el.style.display = ''))
    }

    const toggleTreeCollapse = () => {
      if (document.body.classList.contains('sidebar-collapsed')) expandTree()
      else collapseTree()
    }

    if (hasLocalStorage && localStorage.getItem('sidebar-collapse') === 'collapse') {
      collapseTree()
    }
    document.addEventListener('keyup', (event) => {
      if (event.key === 'C') toggleTreeCollapse()
    })
  })()
})()
