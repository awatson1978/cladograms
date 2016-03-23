Observations = new Mongo.Collection("observations");

Observations.allow({
  insert: function (){
    return true;
  },
  update: function (){
    return true;
  },
  remove: function (){
    return true;
  }
});
