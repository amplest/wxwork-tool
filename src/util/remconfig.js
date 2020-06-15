export const remConfig = () => {
  const baseFontSize = 100
  const baseWidth = 375
  const set = () => {
    const clientWidth = document.documentElement.clientWidth || window.innerWidth
    const rem = 100
    if (clientWidth != baseWidth) {
      rem = Math.floor((clientWidth / baseWidth) * baseFontSize)
    }
    // document.querySelector('html').style.fontSize = rem + 'px'
  }
  set()
  window.addEventListener('resize', set)
}
