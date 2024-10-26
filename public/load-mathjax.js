window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};

(function () {
  var script = document.createElement('script');
  script.src = '/libs/mathjax_3.2.2_es5_tex-svg.js';
  script.async = true;
  document.head.appendChild(script);
})();
