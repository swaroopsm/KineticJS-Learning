var CircleChart = function(_config) {
  
  var self = this,
      config = _config,
      values = config.values ? config.values : [],
      labels = config.labels ? config.labels : [],
      colors = config.colors ? config.colors : [],
      type = config.type ? config.type : 'full',
      total,
      radius,
      totalAngle = 360,
      startRotationAngle = 0,
      surface = null,
      shapes = [],
      centerX = 0,
      centerY = 0,
      HEIGHT_ADJUST_FACTOR = 10;

  var init = function() {
    surface = new Surface(config.surface);
    radius = calculateRadius();
    centerX = surface.width() / 2;
    centerY = surface.height() / 2;
    total = getTotal();
  };

  self.setRadius = function(_radius) {
    radius = _radius;
  };

  self.getRadius = function() {
    return radius;
  };

  self.setCenter = function(center) {
    centerX = center.x;
    centerY = center.y;
  };

  self.getCenter = function() {
    return {
      x: centerX,
      y: centerY
    }
  };

  self.isFull = function() {
    return (config.type === 'full');
  };

  self.isSemi = function() {
    return (config.type === 'semi');
  };

  self.setTotalAngle = function(angle) {
    totalAngle = angle;
  };

  self.setStartRotationAngle = function(angle) {
    startRotationAngle = angle;
  };

  self.getColor = function(index) {
    return colors[index];
  };

  self.calculateAngle = function(index) {
    return values[index] / total * totalAngle;
  };

  self.calculateRotation = function(index) {
    var rotation = startRotationAngle;

    if(index === 0) {
      return rotation;
    }

    for(var i=0; i<index; i++) {
      rotation += self.calculateAngle(i);
    }

    return rotation;

  };

  self.addShape = function(shape) {
    shapes.push(shape);
  };

  self.render = function() {
    var layer = surface.createLayer();
    for(var i=0; i<shapes.length; i++) {
      layer.add(shapes[i]);
    }
    surface.add(layer);
  };

  var getTotal = function() {
    var sum =0;
    for(var i=0; i<values.length; i++) {
      sum += values[i];
    }

    return sum;
  };

  var calculateRadius = function() {
    var min = Math.min(surface.width(), surface.height());
    return min / 2 - HEIGHT_ADJUST_FACTOR;
  };
 
  init();

  return self;
};
