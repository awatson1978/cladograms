Meteor.startup(function (){
  Theme.configure({
    background: {
      color: "gradient"
    },
    page: {
      background: "#ffffff"
    },
    palette: {
      colorA: "#000000",
      colorB: "#000000",
      colorC: "#f3f3f3",
      colorD: "#52565f",
      colorE: "#e7e7e7"
    },
    brand: {
      primary: "#01b9af",
      success: "#00938b",
      info: "#f3f3f3",
      warning: "#52565f",
      danger: "#40434E"
    }
  });

});
