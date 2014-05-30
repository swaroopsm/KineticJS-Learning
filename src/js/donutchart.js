var DonutChart = function(_config) {

  CircleChart.call(this, _config);

  var self = this,
      config = _config,
      center,
      innerRadius;

  self.draw = function() {
    center = self.getCenter();
    innerRadius = calculateInnerRadius();
    if(self.isSemi()) {
      self.setTotalAngle(180);
      self.setStartRotationAngle(180);
    } 
    for(var i=0; i<config.values.length; i++) {
      self.addShape(drawArc(i));
    }

    self.render();
  };

  var drawArc = function(index) {
    var arcShape = new Kinetic.Arc({
      innerRadius: center.y - innerRadius,
      outerRadius: self.getRadius(),
      angle: self.calculateAngle(index),
      rotationDeg: self.calculateRotation(index),
      x: center.x,
      y: center.y,
      fill: self.getColor(index)
    });

    return arcShape;
  };

  var calculateInnerRadius = function() {
    return center.y / 2;
  };

  return self;
}