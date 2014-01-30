Template.contact.events({
    'click .send': function(event,template){
//	event.preventDefault();
	name = template.find(".inputName").value;
	if (name.length===0) {
            Session.set("messageSent", null);
	    Session.set("sentError","Будь-ласка, вкажіть як до Вас можна звертатися");
	} else {
	    from = template.find(".inputEmail").value;
	    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from))) {
		Session.set("messageSent", null);
		Session.set("sentError","Будь-ласка, введить правильний e-mail");
	    } else {
		subject = template.find(".inputSubject").value;
		if (subject.length===0) {
		    Session.set("messageSent", null);
		    Session.set("sentError","Має бути зазначена тема листа");
		} else {
		    message = template.find(".inputMessage").value;
		    if (message.length===0) {
			Session.set("messageSent", null);
			Session.set("sentError","Лист має містити текст");
		    } else {
			Meteor.call('sendEmail', "narodna.rada.vn.ua@gmail.com", name+'<'+from+'>', subject, message, function (error, result){
			    if (! error) {
				Session.set("messageSent", true);
				Session.set("sentError", null);

				//clean the form
				template.find(".inputMessage").value="";
				template.find(".inputSubject").value="";
				template.find(".inputEmail").value="";
				template.find(".inputName").value="";
			    } else {
				Session.set("messageSent", null);
				Session.set("sentError",error.message);
			    };
 			});
		    };
		};
	    };
	};
    }
});

Template.contact.formError = function (){
    return Session.get("sentError");
};

Template.contact.formResult = function (){
    return Session.get("messageSent");
};
