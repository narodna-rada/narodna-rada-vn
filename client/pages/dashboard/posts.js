myDate=(new Date()).toString().split(' ').splice(1,3);
if (myDate[0]==='Jan') myDate[0]='Січень';
if (myDate[0]==='Feb') myDate[0]='Лютий';
if (myDate[0]==='Mar') myDate[0]='Березень';
if (myDate[0]==='Apr') myDate[0]='Квітень';
if (myDate[0]==='May') myDate[0]='Травень';
if (myDate[0]==='Jun') myDate[0]='Червень';
if (myDate[0]==='Jul') myDate[0]='Липень';
if (myDate[0]==='Aug') myDate[0]='Серпень';
if (myDate[0]==='Sep') myDate[0]='Вересень';
if (myDate[0]==='Oct') myDate[0]='Жовтень';
if (myDate[0]==='Nov') myDate[0]='Листопад';
if (myDate[0]==='Dec') myDate[0]='Грудень';
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
		$('#annotation').data("wysihtml5").editor.clear();
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
	$('#annotation').data("wysihtml5").editor.clear();
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
		$('#annotation').data("wysihtml5").editor.setValue(postToEdit.annotation);
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
    $('#annotation').wysihtml5();
    $("#date").val(myDate);

    if (Session.get('postToEdit')) {
	postToEdit=Posts.findOne({_id:Session.get('postToEdit')});
        $("#category").val(postToEdit.category);
        $("#date").val(postToEdit.date);
        $("#header").val(postToEdit.header);
	$('#annotation').data("wysihtml5").editor.setValue(postToEdit.annotation)
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

var addthis_config = {"data_track_addressbar": true, "url": location.href};

Template.fullPost.rendered = function () {
	$("#addThisButtons").html('<div class="addthis_toolbox addthis_default_style"><a class="addthis_button_facebook_share" fb:share:layout="button_count"></a><a class="addthis_button_google_plusone" g:plusone:size="medium"></a><a class="addthis_button_tweet"></a><a class="addthis_counter addthis_pill_style"></a></div>');
addthis.toolbox(".addthis_toolbox");
};




