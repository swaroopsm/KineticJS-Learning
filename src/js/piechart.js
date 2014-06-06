var PieChart = function(_config) {

  CircleChart.call(this, _config);

  var self = this,
      config = _config,
      center;

  self.type = 'pie';

  self.draw = function() {
    center = self.getCenter();
    for(var i=0; i<config.values.length; i++) {
      self.addShape(drawWedge(i));
    }
  };

  var drawWedge = function(index) {
    var wedge = new Kinetic.Wedge({
      x: center.x,
      y: center.y,
      radius: self.getRadius(),
      angle: self.calculateAngle(index),
      fill: self.getColor(index),
      rotation: self.calculateRotation(index),
      index: index
    });

    self.addToolTip(wedge);
    return wedge;
  };

  return self;
}
