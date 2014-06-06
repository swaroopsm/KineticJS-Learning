var Gauge = function(_config) {

  var self = this,
      config = _config;
  
  config.type = 'semi';
  config.values = [ 0, config.value, config.max.value - config.value ];
  config.colors = [ '', config.min.color, config.max.color ];
  config.caption = {
    text: config.value,
    size: 42
  };
      
  self.draw = function() {
    for(var i=0; i<config.values.length; i++) {
      var arc = self.drawArc(i);
      self.addShape(arc);
    }

    self.addCaption();
  };
  
  // Temporary;
  DonutChart.call(this, _config);

  return self;
};
