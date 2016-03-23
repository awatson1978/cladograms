


Template.sidebar.rendered = function() {
  this.find('#sidebarMenuContents a')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
};


Template.sidebar.events({
  'click #importDataBtn': function(){
    Router.go('/import');
    Session.set('secondPanelEnabled', true);
    Session.set('maxPageWidth', 768);
  },
  'click #treeGraphBtn': function(){
    console.log('click #treeGraph');
    Session.set('secondPanelEnabled', false)
    Session.set('maxPageWidth', 1200);
    Router.go('/tree');
  },
  'click #circleGraphBtn': function(){
    console.log('click #circleGraph');
    Session.set('secondPanelEnabled', false)
    Session.set('maxPageWidth', 1600);
    Router.go('/circle');
  },

  'click #logCountBtn': function(){
    Meteor.call("logCount");
  },
  'click #importCsvBtn': function(){
    Meteor.call("parseCsvFile");
  },
  'click #autoparseObservationBtn': function(){
    Meteor.call("autoparseObservation");
  },
  'click #autoGenerateGraphBtn': function(){
    Meteor.call("autogenerate");
  },

  'click #generateGraphBtn': function(){
    Meteor.call("getObservationGraph", function(error, json){
      if (error){
        console.log("error", error);
      }
      if (json){
        Session.set('graphData', json);
        Session.set('activeDataSet', json);
      }
    });
  },
  'click #exportTaxonomyBtn': function(){
    var csvContent = CSV.unparse(Taxonomy.find().map(function(record){
      delete record._id;
      return record;
    }).fetch());
    window.open('data:text/csv;charset=utf-8,' + escape(csvContent), '_self');
  },
  'click #importTaxonomyBtn': function(){
    console.log('parseCsvFile');
    Meteor.call("parseCsvFile");
  },

  'click #clearTaxonomyBtn': function(){
    console.log('Clearing generated taxa...');
    Meteor.call('clearGeneratedTaxa');
  },

  "click #usernameLink": function(){
    if (!Meteor.user()) {
      Router.go('/entrySignIn');
    }
  },
  'click #logoutButton': function() {
    Meteor.logout(function(){
      Router.go('/entrySignIn')
    });


    // if we are on a private list, we'll need to go to a public one
    var current = Router.current();
    if (current.route.name === 'checklistPage' && current.data().userId) {
      Router.go('checklistPage', Lists.findOne({userId: {$exists: false}}));
    }
    if (Session.get("appWidth") < 1024) {
      Session.set('useHorizontalFences', false)
    }

  },
  'click #newListButton': function() {
    Router.go('checklistPage', Lists.createNew());
  }
});

Template.sidebar.helpers({
  getUsername: function () {
    if (Meteor.user()) {
      if (Meteor.user().emails[0]) {
        return Meteor.user().emails[0].address;
      } else {
        return "---";
      }
    } else {
      return "Sign In";
    }
  },
  getConnectionStatus: function () {
    return Meteor.status().status;
  }
});
