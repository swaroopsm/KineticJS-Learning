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
      HEIGHT_ADJUST_FACTOR = 10,
      tooltip = null;

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
    return !(self.isSemi());
  };

  self.isSemi = function() {
    return (config.type === 'semi');
  };

  self.isDonut = function() {
    return self.type === 'donut';
  };

  self.isPie = function() {
    return self.type === 'pie';
  };

  self.setTotalAngle = function(angle) {
    totalAngle = angle;
  };

  self.getHeightAdjustFactor = function() {
    return HEIGHT_ADJUST_FACTOR;
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

    tooltip = new ToolTip();

    if(self.isSemi()) {
      self.setTotalAngle(180);
      self.setStartRotationAngle(180);
    } 

    self.draw();

    for(var i=0; i<shapes.length; i++) {
      layer.add(shapes[i]);
    }

    surface.stage.add(layer);
  };

  self.addToolTip = function(shape) {
    shape.on('mousemove', function(e) {
      tooltip.show(e.clientX, e.clientY, getToolTipText(shape.index));
    });

    shape.on('mouseout', function() {
      tooltip.hide();
    });
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

  var calculateValuePercent = function(index) {
    return values[index] / getTotal() * 100;
  };

  var getToolTipText = function(index) {
    return labels[index] + ' - ' + parseFloat(calculateValuePercent(index)).toFixed(2) + '%';
  };
 
  init();

  return self;
};
