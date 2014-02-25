Router.configure ({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound'
});

Router.map (function ()
{	    
    this.route('home',{
	template : 'home',
	path : '/'
    });

    this.route('narodna-rada',{
	path : '/narodna-rada'
    });

    this.route('lustratio',{
	path : '/lustratio'
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/lustratio/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });



    this.route('contact',{
	before: function (){
	    Session.set('messageSent', null);
	    Session.set('sentError', null);
	}, 
	path : '/contact'
    });    

    this.route('vinNews',{
	template : 'vinNews',
	path : '/news/vinNews'
    });

    this.route('ukrNews',{
	template : 'ukrNews',
	path : '/news/ukrNews'
    });

    this.route('volunteers',{
	template : 'volunteers',
	path : '/dopomoga/volunteers'
    });

    this.route('food',{
	template : 'food',
	path : '/dopomoga/food'
    });

    this.route('drugs',{
	template : 'drugs',
	path : '/dopomoga/drugs'
    });

    this.route('clothes',{
	template : 'clothes',
	path : '/dopomoga/clothes'
    });

    this.route('tech',{
	template : 'tech',
	path : '/dopomoga/tech'
    });

    this.route('payForPhone',{
	template : 'payForPhone',
	path : '/dopomoga/payForPhone'
    });

    this.route('money',{
	template : 'money',
	path : '/dopomoga/money'
    });

    this.route('overInternet',{
	template : 'overInternet',
	path : '/dopomoga/overInternet'
    });

    this.route('survivals',{
	template : 'survivals',
	path : '/dopomoga/survivals'
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/narodna-rada/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/news/vinNews/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/news/ukrNews/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/volunteers/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/food/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/drugs/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/clothes/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/tech/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/payForPhone/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/money/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/overInternet/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });

    this.route('fullPost',{
	template : 'fullPost',
	path : '/dopomoga/survivals/:_id',
        data : function () {
                var pid = decodeURIComponent(this.params._id);
                return Posts.find({_id:pid}).fetch()[0];
            },
        waitOn: function (){return Meteor.subscribe('Posts');}
 
    });


    this.route('dashboard');

    this.route('usersEdit',{
	template : 'usersEdit',
	path : '/dashboard/usersEdit'
    });

    this.route('postsEdit',{
	template : 'postsEdit',
	path : '/dashboard/postsEdit'
    });


    this.route('notFound', { path: '*' });
});

var NonEmptyString = Match.Where(function (x) {
    check(x, String);                                                                                                             
    return x.length !== 0;                                                                                     
});

Meteor.users.allow({

    insert: function () {
	return false; 
    },

    update: function () {
	if ((Meteor.user().role!='admin') && (Meteor.user().role!='superEditor')) return false;
    },

    remove: function () {
	return false; 
  }
});


Meteor.methods({
    // Declaring a method
    sendEmail: function (to, from, subject, text) {

	check([to, from, subject, text], [NonEmptyString]);
	
	this.unblock();

	if (Meteor.isServer)
	    return Email.send({
		to: to,
		from: from,
		subject: subject,
		text: text
	    });
    },

    sendVerEmail: function (){
	this.unblock();
	if (Meteor.isServer) {
	    Accounts.emailTemplates.siteName = "Maidan Vinnytsya";
	    Accounts.emailTemplates.from = "Maidan Vinnytsya <narodna.rada.vn.ua@gmail.com>";
	    Accounts.sendVerificationEmail(Meteor.userId());
	    return true;
	};
    },

    updateUsersRoles: function (checkedUsers,newRole) {
        Meteor.users.update({_id:{$in:checkedUsers}},{$set:{role:newRole}},{multi:true});
    },

    deleteUser: function (uid) {
	if (Meteor.user().role==='admin') Meteor.users.remove({_id:uid});
 
    }, 

    deletePost: function (pid) {
	if (Meteor.user().role==='admin') Posts.remove({_id:pid});
 
    }, 

    createPost: function (options) {

        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in to submit a post");

	check(options, {
	    pid:Match.Optional(String),
            category: NonEmptyString,
            date: NonEmptyString,
            header: NonEmptyString,
            annotation: NonEmptyString,
            newsText: NonEmptyString,
	    sourceLink:Match.Optional(String),
	    picture:Match.Optional(String),
	    videoLink:Match.Optional(String)
	});

	options.owner=this.userId;
	options.status='active';

	if (!options.picture) options.picture='';
	if (!options.videoLink) options.videoLink='';
	if (!options.sourceLink) options.sourceLink='';

	if (options.pid) {
	    return Posts.update(options.pid, {
		category: options.category,
		header: options.header,
		annotation: options.annotation,
		newsText: options.newsText,
		date: options.date,
		picture: options.picture,
		videoLink: options.videoLink,
		sourceLink: options.sourceLink,
		owner: options.owner,
		status: options.status
	    });
	}
	else {
	    return Posts.insert({
		category: options.category,
		header: options.header,
		annotation: options.annotation,
		newsText: options.newsText,
		date: options.date,
		picture: options.picture,
		videoLink: options.videoLink,
		sourceLink: options.sourceLink,
		owner: options.owner,
		status: options.status
	    });
	};
    }
});
