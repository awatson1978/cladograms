

Template.sunburstPage.onDestroyed(function () {
  this.handle && this.handle.stop();
});



Template.sunburstPage.onRendered( function () {
  self.node = self.find(".d3graph svg");

  Cladogram.setDefault();
  
  if (!self.node) {
    self.node = Tracker.autorun(function () {
      var resize = Session.get("resize");

      Graphs.clear();
      Graphs.renderSunburst();
    });
  };
});
