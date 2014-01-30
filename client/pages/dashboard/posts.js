Template.postsList.events({
    'click .save':function(event,template){
	event.preventDefault();
	options={};
	options.category=template.find('#category').value;
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
		template.find('#category').value="";
		template.find('#header').value="";
		template.find('#annotation').value="";
		$('#newsText').data("wysihtml5").editor.clear();
		template.find('#sourceLink').value="";
		template.find('#picture').value="";
		template.find('#videoLink').value="";
		Session.set('postToEdit',null);
 	    }
	    else {
		//show error status
	    };
	});
    },

    'click .clean':function(event,template){
	event.preventDefault();

	if (Session.get('postToEdit')) Session.set('postToEdit',null);

	//reset form

	template.find('#category').value="";
	template.find('#header').value="";
	template.find('#annotation').value="";
	template.find('#newsText').value="";
	$('#newsText').data("wysihtml5").editor.clear();
	template.find('#sourceLink').value="";
	template.find('#picture').value="";
	template.find('#videoLink').value="";

    }
});

Template.postsList.allPosts = function (){
    if ((Meteor.user().role==='admin') || (Meteor.user().role==='superEditor'))
	return Posts.find().fetch();
    if (Meteor.user().role==='editor')
	return Posts.find({owner:Meteor.userId()}).fetch();
};

categories = {
    newsVinnytsya: "Новини - Вінниця",
    newsUkraine: "Новини - Україна та світ",
    narodnaRada: "Народна Рада",
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
    return Posts.find({category:categoryCurrent}).fetch();
});

Handlebars.registerHelper("get10CategoryPosts", function (categoryCurrent) {
    return Posts.find({category:categoryCurrent},{limit:10}).fetch();
});

categoryLinks = {
    newsVinnytsya: "/news/vinNews/",
    newsUkraine: "/news/ukrNews/",
    narodnaRada: "/narodna-rada/",
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
		$("#header").val(postToEdit.header);
		$("#annotation").val(postToEdit.annotation);
		$('#newsText').data("wysihtml5").editor.setValue(postToEdit.newsText)
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
	Session.set('postToDelete',event.currentTarget.id);
    }
});
    
Template.postsList.rendered = function () {
//    $('#newsText').wysihtml5({locale:"ua-UA"});
    $('#newsText').wysihtml5();

    if (Session.get('postToEdit')) {
	postToEdit=Posts.findOne({_id:Session.get('postToEdit')});
        $("#category").val(postToEdit.category);
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
