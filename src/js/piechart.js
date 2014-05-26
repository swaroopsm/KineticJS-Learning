var PieChart = function(_config) {
  var self = this,
      config = _config,
      values = config.values,
      labels = config.labels,
      stage = null,
      wedges = [],
      components = [],
      colors = config.colors ? config.colors : null,
      radius,
      DEFAULT_COLOR = '#F5F5F5',
      HEIGHT_ADJUST_FACTOR = 10,
      color = DEFAULT_COLOR,
      INNER_RADIUS,
      shape,
      label,
      centerX = 0,
      centerY = 0,
      tooltip = null;

  self.draw = function(_stage, _layer) {
    stage = _stage;
    radius = calculateRadius();
    centerX = stage.width() / 2;
    centerY = stage.height() / 2;
    INNER_RADIUS = centerY / 2;
    for(var i=0; i<values.length; i++) {
      if(colors) {
        color = colors[i];
      }

      if(config.type === 'pie') {
        shape = drawWedge({
          angle: calculateAngle(i),
          rotation: calculateRotation(i),
          radius: radius,
          fill: color,
          index: i
        });
      }
      else {
        shape = drawArc(i, {
          color: color
        });
      }
      components.push(shape);
    }

    tooltip = new ToolTip();
    stage.add(tooltip.getLayer());

    return self;
  };

  self.getComponents = function() {
    return components;
  };

  var drawLabel = function(index) {
    var x = calculateXCord(index),
        y = calculateYCord(index);

    var text = new Kinetic.Text({
      x: x,
      y: y,
      text: labels[index],
      fill: '#000'
    });

    return text;
  }

  var calculateAngle = function(index) {
    return values[index] / getTotal(values) * 360;
  };

  var calculateRotation = function(index) {
    var rotation = 0;

    if(index === 0) {
      return rotation;
    }

    for(var i=0; i<index; i++) {
      rotation += calculateAngle(i);
    }

    return rotation;
  };

  var getTotal = function(values) {
    var sum = 0;
    for(var i=0; i<values.length; i++) {
      sum += values[i];
    }

    return sum;
  };

  var drawArc = function(index, options) {
    var arcShape = new Kinetic.Arc({
      innerRadius: centerY - INNER_RADIUS,
      outerRadius: radius,
      angle: calculateAngle(index),
      rotationDeg: calculateRotation(index),
      x: centerX,
      y: centerY,
      fill: options.color
    });

    arcShape.on('mousemove', function(e) {
      tooltip.show(e.x, e.y, getLabel(index));
    });

    arcShape.on('mouseout', function() {
      tooltip.hide();
    });

    return arcShape;
  };

  var drawWedge = function(options) {
    var wedge = new Kinetic.Wedge({
      x: centerX,
      y: centerY,
      radius: options.radius,
      angle: options.angle,
      fill: options.fill,
      stroke: options.stroke,
      strokeWidth: options.strokeWidth,
      rotation: options.rotation
    });

    wedge.on('mousemove', function(e) {
      tooltip.show(e.x, e.y, getLabel(options.index));
    });

    wedge.on('mouseout', function() {
      tooltip.hide();
    });

    return wedge;
  };

  var getLabel = function(index) {
    return labels[index] + " - " + calculatePercentage(index) + "%";
  };

  var calculatePercentage = function(index) {
    return +parseFloat( values[index] / getTotal(values) * 100 ).toFixed(2);
  };

  var calculateRadius = function() {
    var min = Math.min(stage.width(), stage.height());
    return min / 2 - HEIGHT_ADJUST_FACTOR;
  };

  return self;
}
