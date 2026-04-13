// Reads language preference from localStorage.
// If saved lang differs from current URL lang, redirect.
(function () {
  const savedLang = localStorage.getItem('lang')
  const currentPath = window.location.pathname
  const isZhPath = currentPath.startsWith('/zh')
  const currentLang = isZhPath ? 'zh' : 'en'

  if (savedLang && savedLang !== currentLang) {
    if (savedLang === 'zh' && !isZhPath) {
      window.location.replace('/zh' + currentPath)
    } else if (savedLang === 'en' && isZhPath) {
      window.location.replace(currentPath.replace(/^\/zh/, '') || '/')
    }
  }
})()
