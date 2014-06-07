var PieChart = function(_config) {

  CircleChart.call(this, _config);

  var self = this,
      config = _config,
      center,
      wedge;

  self.type = 'pie';

  self.draw = function() {
    center = self.getCenter();
    for(var i=0; i<config.values.length; i++) {
      wedge = drawWedge(i);
      self.addShape(wedge);
      self.addToolTip({
        shape: wedge,
        index: i
      });
      self.addShape(drawLabel(i));
    }

    for(var i=0; i<config.values.length; i++) {
    }
  };

  var drawLabel = function(index) {
    var label = new Kinetic.Text({
      x: (center.x) + self.getRadius() * Math.cos(calculateLabelAngle(index) * Math.PI / 180),
      y: (center.y) + self.getRadius() * Math.sin(calculateLabelAngle(index) * Math.PI / 180),
      fill: '#111',
      text: config.labels[index]
    });

    return label;
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

    return wedge;
  };

  var calculateLabelAngle = function(index) {
    if(index === 0){
      return self.calculateAngle(index) / 2;
    }

    return self.calculateAngle(index) / 2 + self.calculateRotation(index);
  };

  return self;
}
