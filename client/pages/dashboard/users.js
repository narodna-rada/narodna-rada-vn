Template.usersList.allUsers = function () {
    return Meteor.users.find({_id:{$exists:true}},{fields:{_id:1,emails:1,'services.facebook.email':1, 'services.google.email':1, 'services.twitter.email':1, role:1, permissions:1}}).fetch();
}; 

Template.usersList.equals = function (a,b) {
    if (a === b) return "checked";
    return '';
};

Template.usersList.adminRole = function () {
    return Meteor.user().role==='admin';
};

Template.usersList.showToAdmin = function (role) {
    if (Meteor.user().role==='admin') return true;
    if (Meteor.user().role==='superEditor') {
	if ((role!='superEditor') && (role!='admin')) return true;
    };
    return false;
};

Template.usersList.events({
    'click .save': function (event, template){
	checkedUsers = [];
	$('input[name=users]:checked').each(function() {
	    checkedUsers.push($(this).val());
	});
	newRole = template.find('input[name=roleRadios]:checked').value;
	if (Meteor.user().role==='admin') {
	    Meteor.call('updateUsersRoles',checkedUsers,newRole,function(error,result){
		if (!error) {
		    //show success result
		    Session.set("changeSaved", true);
		    Session.set("saveError", null);
		    }
		else {
		    //show error status
		    Session.set("changeSaved", null);
		    Session.set("saveError",error.message);
		};
 	    }); 
	}
	else {
	    if ((Meteor.user().role==='superEditor') && (newRole!='superEditor') && (newRole!='admin')) {
		Meteor.call('updateUsersRoles',checkedUsers,newRole,function(error,result){
		    if (!error) {
			//show success result
			Session.set("changeSaved", true);
			Session.set("saveError", null);
		    }
		    else {
			//show error status
			Session.set("changeSaved", null);
			Session.set("saveError",error.message);
		    };
		}); 
	    };
	};
    },

    'click .delete': function (event, template) {
        if (Meteor.user().role==='admin') Meteor.call('deleteUser',event.currentTarget.id,function(){});
    }
});

Template.usersList.roleUrk = function (role) {
    if (role==='editor') return 'Кореспондент';
    if (role==='user') return 'Користувач';
    if (role==='superEditor') return 'Редактор';
    if (role==='admin') return 'Адміністратор';
};

Template.usersList.formError = function (){
    return Session.get("saveError");
};

Template.usersList.formResult = function (){
    return Session.get("changeSaved");
};

Template.usersList.destroyed = function () {
    Session.set("changeSaved", null);
    Session.set("saveError",null);
};

