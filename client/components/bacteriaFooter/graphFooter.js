

Template.graphFooter.events({
  "click #parseData": function (event, template){
    console.log('parseCsvFile');
    Meteor.call("parseCsvFile");
  },
  "click #exportCsv": function (event, template){
    var csvContent = CSV.unparse(Taxonomy.find().fetch());
    window.open('data:text/csv;charset=utf-8,' + escape(csvContent), '_self');
  },
  'click #scanUp': function(){
    console.log('Parsing bacteria...');
    Meteor.call('parseBacteriaUp');
  },
  'click #scanDown': function(){
    console.log('Parsing bacteria...');
    Meteor.call('parseBacteriaDown');
  },
  'click #clearAll': function(){
    console.log('Clearing generated taxa...');
    Meteor.call('clearGeneratedTaxa');
  },
  'click #zoomIn': function(){
    Session.set('zoom', Session.get('zoom') + 10);
    console.log('zoom', Session.get('zoom') + "%");
  },
  'click #zoomOut': function(){
    Session.set('zoom', Session.get('zoom') - 10);
    console.log('zoom', Session.get('zoom') + "%");
  }
});
