Template.dashboard.helpers({
    gotohome : function (){
        return Router.go('/');
    }
});

Template.dashboardMenu.helpers({
    gotohome : function (){
        return Router.go('/');
    }
});

Handlebars.registerHelper("checkRole", function (role) {
    if (Meteor.user()){
	if (Meteor.user().role) return role === Meteor.user().role;
    };
});
