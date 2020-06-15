export const rem = () => {
  ;(function () {
    // 在标准 375px 适配下，100px = 1rem;
    var baseFontSize = 100
    var baseWidth = 375
    var set = function () {
      var clientWidth = document.documentElement.clientWidth || window.innerWidth
      var rem = 100
      if (clientWidth != baseWidth) {
        rem = Math.floor((clientWidth / baseWidth) * baseFontSize)
      }
      document.querySelector('html').style.fontSize = rem + 'px'
    }
    set()
    window.addEventListener('resize', set)
  })()
}
