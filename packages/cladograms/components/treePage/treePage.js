

Template.treePage.onDestroyed(function () {
  this.handle && this.handle.stop();
});



Template.treePage.onRendered( function () {
  self.node = self.find(".d3graph svg");

  Cladogram.setDefault();

  if (!self.node) {
    self.node = Tracker.autorun(function () {
      var resize = Session.get("resize");

      Graphs.clear();
      Graphs.renderCollapsibleTreeChart();
    });
  };
});
