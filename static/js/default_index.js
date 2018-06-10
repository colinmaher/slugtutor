// This is the js for the default/index.html view.


var app = function () {


	var self = {};

	Vue.config.silent = false; // show all warnings

	// Extends an array
	self.extend = function (a, b) {
		for (var i = 0; i < b.length; i++) {
			a.push(b[i]);
		}
	};

	//This is the random quote generator endpoint

	const quote_endpoint = 'https://quotes.rest/qod?category=students';

	self.getQuote = function () {
		$.getJSON(quote_endpoint, function (data) {
			//console.log(data);
			//console.log("asdadasdsad called");
			self.vue.quoteText = data.contents.quotes[0].quote;
			//console.log(data.contents.quotes[0].quote);
			self.vue.quoteAuthor = data.contents.quotes[0].author;
		});
	}

	self.get_initial_user_info = function () {
		$.get(api_get_initial_user_info_url,
			function (data) {
				self.vue.post_array = data.posts

			});

		//if(self.vue.post_array.length>0)

	};

	self.get_in_demand_classes = function () {
		// $.getJSON(get_memos_url(0, 10), function (data) {
		//     self.vue.in_demand = data.memos;

		// });
		self.vue.in_demand = self.vue.class_list;

	}

	// Vue.component('post-card', {
	// 	props: ['post'],
	// 	data: function() {
	// 		return{
	//
	// 			star_indices: [1, 2, 3, 4, 5]
	// 		}
	// 	},
	// 	methods: {
	// 		test: function() {
	// 			console.log('hi');
	// 		}
	// 	},
	// 	template: `<div id="post-card" style="color:blue;padding:20px" class="container-fluid">
	// 	  <div class="col-sm-5">
	// 		  <div class="border">
	// 		  <div class="row">
	// 			  <div class="col-sm-4">
	// 				  <p>{{post.classname}}</p>
	// 			  </div>
	// 			  <div class="col-sm-8">
	// 				<p>Contact Info</p>
	// 			  <p>Name: {{post.first_name}}</p>
	// 				<p> Rating:
	//
	// 					<i v-on:click="this.test()" class="fa fa-star"></i>
	// 					<i v-on:click="this.test(2)" class="fa fa-star"></i>
	// 					<i v-on:click="this.test(3)" class="fa fa-star"></i>
	// 					<i v-on:click="this.test(4)" class="fa fa-star"></i>
	// 					<i v-on:click="this.test(5)" class="fa fa-star"></i>
	// 					</p>
	// 				Email: {{post.leader_email}}</p>
	// 				<p>Date: {{post.day_of}}</p>
	// 				<p>Start time: {{post.start_time}}</p>
	// 				<p>End time: {{post.end_time}}</p>
	// 				  <p>(123)456-7890</p>
	// 			  </div>
	// 		  </div>
	// 		</div>
	// 	  </div>
	//   </div>`
	// })
	Vue.component('post-card', {
		props: {
			post: Object,
		},
		data: function () {
			return {
				classname: this.post.classname,
				dept: this.post.department,
				type: ''
			}
		},
		events: {

		},
		methods: {
			join: function () {
				//console.log(this.post.id);
				console.log(self.vue.user_list[0].email + ' wants to join')

			},
			start1: function () {
				 // console.log(1);
				 self.vue.set_stars(get_email,1);
			},
			start2: function () {
				self.vue.set_stars(get_email,2);
			},
			start3: function () {
				self.vue.set_stars(get_email,3);
			},
			start4: function () {
				self.vue.set_stars(get_email,4);
			},
			start5: function () {
				self.vue.set_stars(get_email,5);
			},
			get_email: function() {
				return this.post.leader_email;
			},
		},
		template: `<div class="card" style="width: 18rem;">
		<img v-if="this.post.department=='CMPS'" class="card-img-top" src="https://comps.canstockphoto.com/happy-computer-drawing_csp1651204.jpg" alt="Card image cap">
		<img v-if="this.post.department=='CMPE'" class="card-img-top" src="http://www.clipartquery.com/images/39/gallery-for-computer-engineering-clipart-IARWQW.jpg" alt="Card image cap">
		<img v-if="this.post.department=='EE'" class="card-img-top" src="http://fscomps.fotosearch.com/compc/CSP/CSP500/dangerous-work-with-electricity-clipart__k40115174.jpg" alt="Card image cap">

		<div class="card-body">
			<h5 class="card-title">{{post.classname}}</h5>
			<h6>{{post.department}}{{post.classnum}}</h6>
			<p class="card-text">Tutor: {{post.leader_name}}<br>Email: {{post.leader_email}}<br>{{post.num_students_joined}}/5 students joined</p>
			<a v-on:click="this.join" class="btn btn-primary">Join</a>

			<i class="fa fa-star" v-on:click="this.start1"></i>
			<i class="fa fa-star" v-on:click="this.start2"></i>
			<i class="fa fa-star" v-on:click="this.start3"></i>
			<i class="fa fa-star" v-on:click="this.start4"></i>
			<i class="fa fa-star" v-on:click="this.start5"></i>

		</div>
		</div>`
	})

self.test = function(num) {
	console.log(num);
}
	self.update_posting = function () {

		console.log("update posting");

	}

	self.goto = function (page) {
		// console.log(page);
		self.vue.page = page;
	}

	self.search_for_tutors = function (dept, class_num) {
		console.log(class_num);

	  if (class_num != "") {
	    $.getJSON(search_tutors_url,
	      {
	        class_department: dept,
	        class_number: class_num
	      }, function(data){
	        // Here you return back the available postings for that query

	          self.vue.post_array = data.posts;
	        })
	  // self.get_search(search);
	   } else {
	    self.get_classes;
	   }
		 self.goto('tutor_result_page');
	 };

	self.get_search = function (search) {
		$.get(api_get_search_url, {
				search: parseInt(search)
			},
			function (data) {
				console.log("in get search")
				console.log(data.posts)
				self.vue.post_array = data.posts
			}

		);
	};


	self.get_initial_user_info = function () {
		//console.log("get initial user info");
		$.get(api_get_initial_user_info_url,
			function (data) {
				self.vue.post_array = data.posts
				self.vue.current_user = data.curr_user
				console.log(self.vue.current_user)
			});

	};
	//rating stuff going Here
	self.mouse_over = function (img_idx, star_idx) {
		self.vue.post_array[img_idx].num_stars_display = star_idx;
	};

	self.mouse_out = function(img_idx) {
		self.vue.post_array[img_idx].num_stars_display = self.vue.post_array[img_idx].num_stars;
	};

	self.set_stars = function (tutor,star_idx) {

		// img._pending = true;
		// self.vue.$set(self.vue.image_list, img_idx, img);
		$.post(api_vote_url,
			{
				t_email: tutor,
				t_rating: star_idx
			},
			function () {
				// img = self.vue.image_list[img_idx];
				// img._pending = false;
				// self.vue.$set(self.vue.image_list, img_idx, img);
			}
		)
	};


	// Complete as needed.
	self.vue = new Vue({
		el: "#vue-div",
		delimiters: ['${', '}'],
		unsafeDelimiters: ['!{', '}'],

		data: {
			current_user: "",
			student_search: "",
			class_dept: "",
			class_num: "",
			in_demand: [],
			quoteText: "",
			quoteAuthor: "",
			main_page: true,
			tutor_result_page: false,
			class_list: [],
			page: 'main',
			picked: "",
			post_array: [],
			// Rating stuff going here

		},
		methods: {
			getQuote: self.getQuote,
			search_for_tutors: self.search_for_tutors,
			add_post: self.add_post,
			go_home: self.go_home,
			get_search: self.get_search,
			goto: self.goto,
			get_initial_user_info: self.get_initial_user_info,
			update_posting: self.update_posting,
			//on student class search submit -> match_tutors()
			//on tutor class search -> match_students()
			mouse_over: self.mouse_over,
      mouse_out: self.mouse_out,
      set_stars: self.set_stars
		},
		created: function () {

			this.get_initial_user_info();
			console.log(this.post_array);
			if (this.quoteText == "") {
				this.getQuote();
			}
		}
	});

	self.get_initial_user_info();

	return self;
};


var APP = null;


// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
	APP = app();
});
