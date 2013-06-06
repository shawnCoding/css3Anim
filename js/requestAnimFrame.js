// requestAnimFrame
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();
//clearRequestTimeout
window.clearRequestTimeout = function(id) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(id) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(id) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(id) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(id) :
    window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(id) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(id) :
    clearTimeout(id);
};
