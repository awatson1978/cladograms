Router.configure({
  layoutTemplate: 'appLayout',
  yieldTemplates: {
    "bacteriaHeader": {
      to: "header"
    },
    "graphFooter": {
      to: "footer"
    },
    'sidebar': {
      to: 'westPanel'
    }
  }
});

Router.route('/', {
  name: 'homeRoute',
  template: 'treePage',
  yieldTemplates: {
    "bacteriaHeader": {
      to: "header"
    },
    "graphFooter": {
      to: "footer"
    },
    'sidebar': {
      to: 'westPanel'
    }
  },
});


Router.route('/tree', {
  name: 'treeRoute',
  template: 'treePage',
  yieldTemplates: {
    "bacteriaHeader": {
      to: "header"
    },
    "graphFooter": {
      to: "footer"
    },
    'sidebar': {
      to: 'westPanel'
    }
  },
  onAfterAction: function(){
    Graphs.clear();
    // Graphs.renderCollapsibleTreeChart();
    Session.set('selectedGraph', 'tree');
    Session.set('graphData', Session.get('activeDataSet'));
    // var data = Session.get('activeDataSet');
    // console.log('data', data);
    // Session.set('graphData', data);
    // // Meteor.setTimeout(function () {
    // //   Session.set('graphData', data);
    // // }, 200);
  }
});
Router.route('/circle', {
  name: 'circleRoute',
  template: 'sunburstPage',
  yieldTemplates: {
    "bacteriaHeader": {
      to: "header"
    },
    "graphFooter": {
      to: "footer"
    },
    'sidebar': {
      to: 'westPanel'
    }
  },
  onAfterAction: function(){
    Graphs.clear();
    // Graphs.renderSunburst();
    Session.set('selectedGraph', 'sunburst');
    Session.set('graphData', Session.get('activeDataSet'));
  }
});
