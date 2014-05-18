function Stage(_config) {

  var self = this,
      config = _config,
      layer = null,
      components = null,
      stage;

  self.width = null;
  self.height = null;
  self.container = null;

  self.setContainer = function(_container) {
    self.container = _container;
  };

  self.setDimensions = function(_width, _height) {
    self.width = _width;
    self.height = _height;
  };

  self.add = function(klass) {
    createStage();
    klass.draw(stage);
    components = klass.getComponents();
    layer = new Kinetic.Layer();

    for(var i=0; i<components.length; i++) {
      layer.add(components[i]);
    }

    // layer.getCanvas()._canvas.style.paddingTop = (c*400) + 'px';
    stage.add(layer);
  };

  var createStage = function() {
    if(stage) {
      return;
    }

    stage = new Kinetic.Stage({
        container: self.container,
        width: self.width,
        height: self.height
    });
  }
  
  return self;
}
