Session.setDefault('graphData', {});
Session.setDefault("selectedGraph","tree");
Session.setDefault("anchor_image", "");


Meteor.startup(function () {
  $(window).resize(function(evt) {
      Session.set("resize", new Date());
  });
  Cladogram.setDefault();
});
