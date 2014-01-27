Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish(null, function () {
  return Meteor.users.find({},{fields:{services:1, balance:1, profile:1}});
});
