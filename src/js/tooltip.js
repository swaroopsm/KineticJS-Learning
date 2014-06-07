var ToolTip = function(_config) {

  var self = this,
      config = _config,
      $body = $('body'),
      $tooltip = null;

  var init = function() {
    $tooltip = $("<div/>", {
      class: 'tooltip'
    });
  };

  self.show = function(x, y, label) {
    $tooltip.css({
      left: x + document.body.scrollLeft - $tooltip.width() / 2,
      top: y + document.body.scrollTop - 40
    });

    $body.append($tooltip);
    $tooltip.html(label);
    $tooltip.show();
  };

  self.hide = function() {
    setTimeout(function() {
      $tooltip.hide();
      destroy();
    }, 600)
  };

  var destroy = function() {
   $tooltip.remove();
  };

  init();

  return self;

}
