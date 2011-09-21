$(function() {
	//var muzik = new Muzik();
	window.s = new Songs;
	s.url = 'http://local.yahooapis.com/LocalSearchService/V3/localSearch?appid=YahooDemo&query=pizza&zip=10504&results=2&output=json&callback=?';
	s.fetch({success: function(collection, data) {
		console.log(arguments);
	}, 
	error: function() {
		console.log(arguments);
	}});
});

var Song = Backbone.Model.extend({
	initialize: function() {

	},
	defaults: function(){
		return {
			playing: false
		}
	}
});

var Songs = Backbone.Collection.extend({
	model: Song,
	initialize: function() {
		
	}
});


