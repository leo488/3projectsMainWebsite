/* The site theme lives on <html data-theme>, set before first paint so
   the page never flashes the other one. ?theme=dark|light overrides
   the remembered choice. */
export const THEME_KEY = '3p-theme'

export function initialTheme() {
  const param = new URLSearchParams(window.location.search).get('theme')
  if (param === 'dark' || param === 'light') return param
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
}

