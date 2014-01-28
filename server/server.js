Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish(null, function () {
  return Meteor.users.find({},{fields:{'services.facebook.email':1, emails:1, role:1, permissions:1}});
});

Accounts.onCreateUser(function(options, user){
    user.role='user';
    if (options.profile)
        user.profile = options.profile;
    return user;
});

Meteor.methods ({
    updateUsersRoles: function (checkedUsers,newRole) {
	Meteor.users.update({_id:{$in:checkedUsers}},{$set:{role:newRole}},{multi:true});
    }
});
