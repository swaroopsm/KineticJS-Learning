var ToolTip = function() {

  var self = this,
      layer = new Kinetic.Layer();

  var tooltip = new Kinetic.Label({
      x: 0,
      y: 0,
      visible: false,
      opacity: 1
    });

  tooltip.add(new Kinetic.Tag({
    fill: 'black',
    pointerDirection: 'left',
    pointerWidth: 10,
    pointerHeight: 10,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 0,
    shadowOffset: {x:10,y:20},
    shadowOpacity: 0
  }));

  tooltip.add(new Kinetic.Text({
    text: '',
    fontFamily: 'serif',
    fontSize: 14,
    padding: 5,
    fill: 'white'
  }));

  layer.add(tooltip);

  self.getToolTip = function() {
    return tooltip;
  };

  self.getLayer = function() {
    return layer;
  };

  self.show = function(x, y, label) {
    tooltip.getText().setText(label);
    tooltip.setPosition({
      x: x,
      y: y
    });
    tooltip.setVisible(true);
    layer.moveToTop();
    layer.draw();
  };

  self.hide = function() {
    tooltip.setVisible(false);
    layer.draw();
  };

  return self;

}
