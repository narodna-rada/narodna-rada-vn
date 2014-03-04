Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish(null, function () {
  return Meteor.users.find({},{fields:{'services.facebook.email':1,'services.google.email':1,'services.twitter.email':1, emails:1, role:1, permissions:1}});
});

Meteor.publish("Posts", function () {
  return Posts.find();
});

Meteor.publish("S3files", function () {
  return Meteor.s3files.find();
});

Accounts.onCreateUser(function(options, user){
    if (!user.role) user.role='user';
    if (!user.roles) user.roles='';
    if (options.profile)
        user.profile = options.profile;
    return user;
});
