// Reads language preference from localStorage.
// If saved lang differs from current URL lang, redirect.
(function () {
  const savedLang = localStorage.getItem('lang')
  const currentPath = window.location.pathname

  // Skip redirect for /demos/ paths
  if (currentPath.startsWith('/demos/')) return

  const isZhPath = currentPath.startsWith('/zh')
  const currentLang = isZhPath ? 'zh' : 'en'

  const VALID_LANGS = ['en', 'zh']
  if (savedLang && VALID_LANGS.includes(savedLang) && savedLang !== currentLang) {
    if (savedLang === 'zh' && !isZhPath) {
      window.location.replace('/zh' + currentPath)
    } else if (savedLang === 'en' && isZhPath) {
      window.location.replace(currentPath.replace(/^\/zh/, '') || '/')
    }
  }
})()
