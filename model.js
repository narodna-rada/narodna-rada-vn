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

    this.route('contact',{
	before: function (){
	    Session.set('messageSent', null);
	    Session.set('sentError', null);
	}, 
	path : '/contact'
    });    

    this.route('dashboard');

    this.route('notFound', { path: '*' });
});

var NonEmptyString = Match.Where(function (x) {
    check(x, String);                                                                                                             
    return x.length !== 0;                                                                                     
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
    }

});
