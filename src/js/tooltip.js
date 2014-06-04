var ToolTip = function(_config) {

  var self = this,
      config = _config,
      $tooltip = null;

  var init = function() {
    $tooltip = $("<div/>", {
      class: 'tooltip'
    });
  };

  self.show = function(x, y, label) {
    $tooltip.css({
      left: x + document.body.scrollLeft + 10,
      top: y + document.body.scrollTop + 10
    });

    $('body').append($tooltip);
    $tooltip.html(label);
    $tooltip.show();
  };

  self.hide = function() {
    $tooltip.hide();
    destroy();
  };

  var destroy = function() {
   $tooltip.remove();
  };

  init();

  return self;

}
