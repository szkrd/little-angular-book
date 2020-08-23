;(() => {
  // below the breakpoint the menu will not push the content sideways
  // but covers it and will always start in a hidden state
  const SM_BREAKPOINT = 750

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
    // is the storage writable? maybe not... (safari private, out of quota etc.)
    const el = document.getElementById('menu-toggle')
    let hasLocalStorage = true
    try {
      localStorage.setItem('foo', 'bar')
      if (localStorage.getItem('foo') !== 'bar') hasLocalStorage = false
      localStorage.removeItem('foo')
    } catch (err) {
      hasLocalStorage = false
    }

    let isHidden = hasLocalStorage ? localStorage.getItem('sidebar-preference') === 'hidden' : false
    if (document.body.clientWidth < SM_BREAKPOINT) {
      isHidden = true
    }
    if (isHidden) {
      document.body.classList.add('sidebar-hidden')
    }
    el.addEventListener('click', (event) => {
      event.preventDefault()
      isHidden = !isHidden
      document.body.classList.toggle('sidebar-hidden')
      if (hasLocalStorage) localStorage.setItem('sidebar-preference', isHidden ? 'hidden' : 'visible')
    })

    // let's skip the animation for the one that happens at the end of the page load
    setTimeout(() => document.body.classList.add('allow-sidebar-transitions'), 1000)
  })()
})()
