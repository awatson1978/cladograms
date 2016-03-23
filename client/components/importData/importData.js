Router.route("/import", function () {
  this.layout("appLayout");
  this.render("bacteriaHeader", {
    to: "header"
  });
  this.render("sidebar", {
    to: "westPanel"
  });
  this.render("importData");
  this.render("editorFooter", {
    to: "footer"
  });
  this.render("treePage", {
    to: "secondPage"
  });
});



var editor;
Template.importData.onRendered(function () {
  editor = ace.edit("editor");
  editor.getSession().setMode("ace/mode/json");
  //editor.setTheme("ace/theme/clouds");

  Tracker.autorun(function (){
    if (Session.get('activeDataSet')) {
      editor.setValue(EJSON.stringify(Session.get('activeDataSet'), {indent: 2}));
    }
  });
});





Template.editorFooter.events({
  'click #saveLink': function(){
    console.log('editor', EJSON.parse(editor.getValue()));
    Session.set('activeDataSet', EJSON.parse(editor.getValue()));
    Session.set('graphData', EJSON.parse(editor.getValue()));
  },
  "click #graphDataLnk": function (event, template){
     console.log('download json');

    window.open('data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(Session.get('graphData'))), '_self');
    //window.open('data:text/csv;charset=utf-8,' + editor.getValue(), '_self');
  },
  "click #downloadJsonLnk": function (event, template){
     console.log('download json');

    window.open('data:application/json;charset=utf-8,' + encodeURIComponent(editor.getValue()), '_self');
    //window.open('data:text/csv;charset=utf-8,' + editor.getValue(), '_self');
  }
});
