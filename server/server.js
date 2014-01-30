Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish(null, function () {
  return Meteor.users.find({},{fields:{'services.facebook.email':1, emails:1, role:1, permissions:1}});
});

Meteor.publish("Posts", function () {
  return Posts.find();
});

Accounts.onCreateUser(function(options, user){
    user.role='user';
    if (options.profile)
        user.profile = options.profile;
    return user;
});
/*
Meteor.methods ({
    updateUsersRoles: function (checkedUsers,newRole) {
	Meteor.users.update({_id:{$in:checkedUsers}},{$set:{role:newRole}},{multi:true});
    },
    createPost: function (options) {

        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in to submit a post");

        check(options, {
            category: NonEmptyString,
            header: NonEmptyString,
            annotation: NonEmptyString,
            newsText: NonEmptyString
        });

	options.date=(new Date()).toString().split(' ').splice(1,3).join(' ');
	options.owner=this.userId;
	options.status='active';

	console.log(options);

        return Posts.insert({
	    category: options.category,
	    header: options.header,
	    annotation: options.annotation,
	    newsText: options.newsText,
	    date: options.date,
	    picture:options.picture,
	    videoLink: options.videoLink,
	    owner: options.owner,
	    status: options.status
        });
 
    }
});
*/
