$(function() {
	window.muzik = new Muzik;
});

var Song = Backbone.Model.extend({
	initialize: function() {

	},
	defaults: function(){
		return {
			playing: false
		}
	},
	play: function() {
		alert('play');
	},
	pause: function() {
		alert('pause');
	},
	replay: function() {
		alert('replay');
	}
});

var Songs = Backbone.Collection.extend({
	model: Song,
	
	initialize: function() {
		this.current = -1;
		this.repeat = true;
		this.shuffle = false;
		this.yetToShuffle = [];	
	},
	url: function() {
		return 'res/tmpdata.js';
	},
	next: function() {
		var n;
		if(!this.shuffle) {
			 n = this.current + 1;
		} else {
			if(!this.yetToShuffle.length) {
				this.yetToShuffle = this.models;
			}
			n = getRandomSong(this.yetToShuffle.length);
			//this.yetToShuffle.remove(n);
		}
		
		function getRandomSong(length) {
			return Math.random()*length;
		}
		return n;
	},
	isRepeating: function() {
		return repeat;
	},
	play: function() {
		this.current = next();
		//get model and call play on model
	}
});

var SongView = Backbone.View.extend({
	tagName : 'li',
	
	initialize: function() {
		$(this.el).addClass('song');
	},
	render: function() {
		//TODO: use mosutache templating engine to do this
		$(this.el).html('<span class="playBtn"></span><span class="replayBtn"></span><span class="title"></span>');
		this.$('.title').text(this.model.get('title'));
		return this;
	}, 
	events: {
		'click' : 'play',
		'click .playBtn': 'play',
		'click .replayBtn': 'replay'
	},
	play: function() {
		this.model.play();
	},
	replay: function() {
		this.model.replay();
	}
});

var Muzik = Backbone.View.extend({
	initialize: function() {
		var songs = new Songs;
		songs.fetch({dataType: 'json', success: function() {
			songs.each(muzik.addSongView);			
		}
		});	
	},
	addSongView: function(song) {
		var s = new SongView({model: song});
		$('.songs .list').append(s.render().el);
	}
});
