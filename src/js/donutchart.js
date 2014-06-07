var DonutChart = function(_config) {

  CircleChart.call(this, _config);

  var self = this,
      config = _config,
      caption = config.caption ? config.caption : { text: '', size: 16 },
      center = self.getCenter(),
      innerRadius,
      arcShape;

  self.draw = function() {
    innerRadius = calculateInnerRadius();
    for(var i=0; i<config.values.length; i++) {
      arcShape = drawArc(i);
      self.addShape(arcShape);
      self.addToolTip({
        shape: arcShape,
        index: i
      });

    }

    if(self.isSemi()) {
      self.addShape(drawCaption());
    }
  };

  self.calculteInnerRadius = function() {
    return calculateInnerRadius();
  };

  self.drawArc = function(index) {
    return drawArc(index);
  };

  self.drawCaption = function() {
    return drawCaption();
  };

  var drawArc = function(index) {
    var arcShape = new Kinetic.Arc({
      innerRadius: center.y - calculateInnerRadius(),
      outerRadius: self.getRadius(),
      angle: self.calculateAngle(index),
      rotationDeg: self.calculateRotation(index),
      x: center.x,
      y: center.y,
      fill: self.getColor(index),
      index: index
    });

    return arcShape;
  };

  var drawCaption = function() {
    var captionText = new Kinetic.Text({
      x: center.x - calculateInnerRadius() + self.getHeightAdjustFactor(),
      y: center.y - calculateInnerRadius() / 2,
      text: caption.text ? caption.text : '',
      fontSize: caption.size ? caption.size : 16,
      fill: '#000',
      align: 'center',
      width: self.getRadius() - self.getHeightAdjustFactor(),
      fontFamily: 'sans-serif'
    });

    return captionText;
  };

  var calculateInnerRadius = function() {
    return center.y / 2;
  };

  return self;
}
