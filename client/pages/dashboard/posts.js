myDate=moment().format("MM/DD/YYYY hh:mm A");

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
console.log(options);
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
		$('.imgForPost').html="";
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
	$('.imgForPost').html="";
	template.find('#videoLink').value="";
        Session.set("postSaved", null);
        Session.set("saveError", null);
    },

    'click .img-upload':function(event,template){
	event.preventDefault();
    },

    'click .savePostImage':function(event,template){
	event.preventDefault();
	url=template.find('input[name=imagesRadios]:checked').value;
	$('.imgForPost').html('<img src="'+url+'" class="img-rounded" width="150"><input type="hidden" id="picture" value="'+url+'">');
    }
});

Template.postsList.allPosts = function (){
    if ((Meteor.user().role==='admin') || (Meteor.user().role==='superEditor'))
	return Posts.find().fetch();
    if (Meteor.user().role==='editor')
	return Posts.find({owner:Meteor.userId()},{sort: {date:-1}}).fetch();
};

Template.postsList.uploadedImages = function (){
    if ((Meteor.user().role==='admin') || (Meteor.user().role==='superEditor') || (Meteor.user().role==='editor'))
	return S3files.find().fetch();
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

Handlebars.registerHelper("currentPath", function () {
    return location.href;
});

Handlebars.registerHelper("dateToUkrainian", function (date) {
	var myDate=moment(date).format("MMM DD YYYY").split(' ');
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
	return myDate;
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
	if ((Meteor.user().role==='admin') || (Meteor.user().role==='superEditor')) Meteor.call('deletePost',event.currentTarget.id,function(){});
    }
});
    
Template.postsList.rendered = function () {

//    $('#newsText').wysihtml5({locale:"ua-UA"});
	$('#newsText').wysihtml5();
    	$('#annotation').wysihtml5();
    $('.datetimepicker').datetimepicker();
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

Template.fullPost.rendered = function () {

	$(".VKlike").html('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "button"});</script>');
	$(".GPlusLike").html('<script type="text/javascript">  window.___gcfg = {lang: "uk"};  (function() {    var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/platform.js";     var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);   })(); </script>');
	$(".twitterButton").html('<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>');

};


