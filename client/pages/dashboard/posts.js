myDate=(new Date()).toString().split(' ').splice(1,3);
if (myDate[0]==='Jan') myDate[0]='\u0421\u0456\u0447\u0435\u043D\u044C';
if (myDate[0]==='Feb') myDate[0]='\u041B\u044E\u0442\u0438\u0439';
if (myDate[0]==='Mar') myDate[0]='\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C';
if (myDate[0]==='Apr') myDate[0]='\u041A\u0432\u0456\u0442\u0435\u043D\u044C';
if (myDate[0]==='May') myDate[0]='\u0422\u0440\u0430\u0432\u0435\u043D\u044C';
if (myDate[0]==='Jun') myDate[0]='\u0427\u0435\u0440\u0432\u0435\u043D\u044C';
if (myDate[0]==='Jul') myDate[0]='\u041B\u0438\u043F\u0435\u043D\u044C';
if (myDate[0]==='Aug') myDate[0]='\u0421\u0435\u0440\u043F\u0435\u043D\u044C';
if (myDate[0]==='Sep') myDate[0]='\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C';
if (myDate[0]==='Oct') myDate[0]='\u0416\u043E\u0432\u0442\u0435\u043D\u044C';
if (myDate[0]==='Nov') myDate[0]='\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434';
if (myDate[0]==='Dec') myDate[0]='\u0413\u0440\u0443\u0434\u0435\u043D\u044C';
myDate=myDate.join(' ');

Template.postsList.postDate = function(){
    return myDate;
};

Template.postsList.events({
    'click .save':function(event,template){
	event.preventDefault();
	options={};
	options.category=template.find('#category').value;
	options.date=template.find('#date').value;
	options.header=template.find('#header').value;
	options.annotation=template.find('#annotation').value;
	options.newsText=template.find('#newsText').value;
	options.sourceLink=template.find('#sourceLink').value;
	options.picture=template.find('#picture').value;
	options.videoLink=template.find('#videoLink').value;

	if (Session.get('postToEdit')) options.pid=Session.get('postToEdit');

	Meteor.call('createPost',options, function (error, result){
	    if (!error) {
		//show success result

		//reset form
		Session.set('postToEdit',null);
		template.find('#category').value="";
		template.find('#date').value="";
		template.find('#header').value="";
		template.find('#annotation').value="";
		$('#newsText').data("wysihtml5").editor.clear();
		template.find('#sourceLink').value="";
		template.find('#picture').value="";
		template.find('#videoLink').value="";

                Session.set("postSaved", true);
                Session.set("saveError", null);
 	    }
	    else {
		//show error status
                Session.set("postSaved", null);
                Session.set("saveError",error.message);
	    };
	});
    },

    'click .clean':function(event,template){
	event.preventDefault();

	if (Session.get('postToEdit')) Session.set('postToEdit',null);

	//reset form

	template.find('#category').value="";
	template.find('#date').value="";
	template.find('#header').value="";
	template.find('#annotation').value="";
	template.find('#newsText').value="";
	$('#newsText').data("wysihtml5").editor.clear();
	template.find('#sourceLink').value="";
	template.find('#picture').value="";
	template.find('#videoLink').value="";
        Session.set("postSaved", null);
        Session.set("saveError", null);
    }
});

Template.postsList.allPosts = function (){
    if ((Meteor.user().role==='admin') || (Meteor.user().role==='superEditor'))
	return Posts.find().fetch();
    if (Meteor.user().role==='editor')
	return Posts.find({owner:Meteor.userId()},{sort: {date:-1}}).fetch();
};

categories = {
    newsVinnytsya: "Новини - Вінниця",
    newsUkraine: "Новини - Україна та світ",
    narodnaRada: "Народна Рада",
    lustratio: "Лист люстрації",
    dopomogaVolunteers:"Допомога - волонтери",
    dopomogaFood:"Допомога - кухня",
    dopomogaDrugs:"Допомога - медпункт",
    dopomogaClothes:"Допомога - одяг",
    dopomogaTech:"Допомога - побут",
    dopomogaPayForPhone:"Допомога - поповнення телефоні",
    dopomogaMoney:"Допомога - фінанси",
    dopomogaOverInternet:"Допомога - через Інтернет",
    dopomogaSurvivals:"Допомога - постраждалим"

};

Template.postsList.postCategory = function (category) {
    return categories[category];
};

Handlebars.registerHelper("getCategoryPosts", function (categoryCurrent) {
    return Posts.find({category:categoryCurrent},{sort: {date:-1}}).fetch();
});

Handlebars.registerHelper("get10CategoryPosts", function (categoryCurrent) {
    return Posts.find({category:categoryCurrent},{sort: {date:-1}},{limit:10}).fetch();
});

categoryLinks = {
    newsVinnytsya: "/news/vinNews/",
    newsUkraine: "/news/ukrNews/",
    narodnaRada: "/narodna-rada/",
    lustratio: "/lustratio/",
    dopomogaVolunteers:"/dopomoga/volunteers/",
    dopomogaFood:"/dopomoga/food/",
    dopomogaDrugs:"/dopomoga/drugs/",
    dopomogaClothes:"/dopomoga/clothes/",
    dopomogaTech:"/dopomoga/tech/",
    dopomogaPayForPhone:"/dopomoga/payForPhone/",
    dopomogaMoney:"/dopomoga/money/",
    dopomogaOverInternet:"/dopomoga/overInternet/",
    dopomogaSurvivals:"/dopomoga/survivals/"

};


Template.postSmallPanel.directLinkToPost = function (postId) {
    linkToPost=categoryLinks[this.category]+postId;

    return linkToPost;
};

Template.buttonsEditDelete.events({
    'click .edit':function(event,template){
	Session.set('postToEdit',event.currentTarget.id);
	if (location.pathname==='/dashboard/postsEdit') {
	    if (Session.get('postToEdit')) {
		postToEdit=Posts.findOne({_id:Session.get('postToEdit')});
		$("#category").val(postToEdit.category);
		$("#date").val(postToEdit.date);
		$("#header").val(postToEdit.header);
		$("#annotation").val(postToEdit.annotation);
		$('#newsText').data("wysihtml5").editor.setValue(postToEdit.newsText);
		$("#sourceLink").val(postToEdit.sourceLink);
		//        $("#picture").val(postToEdit.picture);
		$("#videoLink").val(postToEdit.videoLink);
	    };
	}
	else {
	    Router.go('/dashboard/postsEdit');
	};
    },

    'click .delete':function(event,template){
	if (Meteor.user().role==='admin') Meteor.call('deletePost',event.currentTarget.id,function(){});
    }
});
    
Template.postsList.rendered = function () {
//    $('#newsText').wysihtml5({locale:"ua-UA"});
    $('#newsText').wysihtml5();
    $("#date").val(myDate);

    if (Session.get('postToEdit')) {
	postToEdit=Posts.findOne({_id:Session.get('postToEdit')});
        $("#category").val(postToEdit.category);
        $("#date").val(postToEdit.date);
        $("#header").val(postToEdit.header);
        $("#annotation").val(postToEdit.annotation);
	$('#newsText').data("wysihtml5").editor.setValue(postToEdit.newsText)
        $("#sourceLink").val(postToEdit.sourceLink);
//        $("#picture").val(postToEdit.picture);
        $("#videoLink").val(postToEdit.videoLink);
     };
};

Template.buttonsEditDelete.textOwner = function (pid){
    return Posts.findOne({_id:pid}).owner===Meteor.userId();
};

Template.postsList.formError = function (){
    return Session.get("saveError");
};

Template.postsList.formResult = function (){
    return Session.get("postSaved");
};

Template.fullPost.hasVideo = function () {
    if (this.videoLink) return true;
};

Template.fullPost.hasPic = function () {
    if (this.picture) return true;
};

Template.fullPost.hasSource = function () {
    if (this.sourceLink) return true;
};
