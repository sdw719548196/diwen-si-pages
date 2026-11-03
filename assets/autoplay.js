// Play muted looping videos while they are on screen; pause them when scrolled away.
(function () {
  var videos = document.querySelectorAll('video[data-autoplay]');
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videos.forEach(function (v) { v.controls = true; v.preload = 'metadata'; });
    return;
  }
  if (!('IntersectionObserver' in window)) {
    videos.forEach(function (v) { v.preload = 'auto'; v.play().catch(function () {}); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        if (v.preload === 'none') v.preload = 'auto';
        v.play().catch(function () {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach(function (v) { v.muted = true; io.observe(v); });
})();
