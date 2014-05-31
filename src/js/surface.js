function Surface(_config) {

  var self = this,
      config = _config,
      container = config.container,
      width = config.width ? config.width : 0,
      height = config.height ? config.height : 0
      layer = null,
      layers = [],
      components = null,
      stage = null;

  self.id = config.id;

  self.stage = stage;

  self.width = function() {
    return stage.width();
  };

  self.height = function() {
    return stage.height();
  };

  self.add = function(layer) {
    stage.add(layer);
  };

  self.createLayer = function() {
    layer = new Kinetic.Layer();
    // layers.push(layer);

    return layer;
  };

  var init = function() {
    self.stage = createStage();
  };

  var createStage = function() {
    stage = new Kinetic.Stage({
        container: container,
        width: width,
        height: height
    });

    return stage;
  };

  init();
  
  return self;
}
