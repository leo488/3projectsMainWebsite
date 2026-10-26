// Opens the Start a conversation modal from anywhere on the site.
// `topic` preselects what the message is about (e.g. 'cpa'); `mode` is
// 'message' or 'call'.
export const openContact = ({ topic, mode } = {}) =>
  window.dispatchEvent(new CustomEvent('contact:open', { detail: { topic, mode } }))
