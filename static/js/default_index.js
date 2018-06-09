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
			console.log(data);
			console.log("getQuote called");
			self.vue.quoteText = data.contents.quotes[0].quote;
			console.log(data.contents.quotes[0].quote);
			self.vue.quoteAuthor = data.contents.quotes[0].author;
		});
	}


	// Vue.component('student_class_search', {
	//     data: function () {
	//         return {
	//             count: 0
	//         }
	//     },
	//     template: '<p>${ title }: ${ demand }</p>'
	// });
	self.get_in_demand_classes = function () {
		// $.getJSON(get_memos_url(0, 10), function (data) {
		//     self.vue.in_demand = data.memos;

		// });
		self.vue.in_demand = self.vue.class_list;

	}

	self.search_for_tutors = function (search) {
		console.log(search);
		//console.log(self.vue.student_search);
		if (search != "") {
			self.get_search(search);
		} else {
			self.get_classes;
		}
		self.vue.tutor_result_page = true;
		self.vue.main_page = false;
		
		self.append_in_demand(search);
        
	}

	Vue.component('demo-grid', {
	  template: ` 
	    <table>
	    <thead>
	      <tr>
	        <th v-for="key in columns"
	          @click="sortBy(key)"
	          :class="{ active: sortKey == key }">
	          {{ key | capitalize }}
	          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
	          </span>
	        </th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr v-for="entry in filteredData">
	        <td v-for="key in columns">
	          {{entry[key]}}
	        </td>
	      </tr>
	    </tbody>
	  </table>
	  `,
	  props: {
	    data: Array,
	    columns: Array,
	    filterKey: String
	  },
	  data: function () {
	    var sortOrders = {}
	    this.columns.forEach(function (key) {
	      sortOrders[key] = 1
	    })
	    return {
	      sortKey: '',
	      sortOrders: sortOrders
	    }
	  },
	  computed: {
	    filteredData: function () {
	      var sortKey = this.sortKey
	      var filterKey = this.filterKey && this.filterKey.toLowerCase()
	      var order = this.sortOrders[sortKey] || 1
	      var data = this.data
	      if (filterKey) {
	        data = data.filter(function (row) {
	          return Object.keys(row).some(function (key) {
	            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
	          })
	        })
	      }
	      if (sortKey) {
	        data = data.slice().sort(function (a, b) {
	          a = a[sortKey]
	          b = b[sortKey]
	          return (a === b ? 0 : a > b ? 1 : -1) * order
	        })
	      }
	      return data
	    }
	  },
	  filters: {
	    capitalize: function (str) {
	      return str.charAt(0).toUpperCase() + str.slice(1)
	    }
	  },
	  methods: {
	    sortBy: function (key) {
	      this.sortKey = key
	      this.sortOrders[key] = this.sortOrders[key] * -1
	    }
	  }
	})


	self.create_session = function () {
		console.log("create session");
	}

	Vue.component('tutor-card', {
		props: ['tutor'],
		template: `<div class="container-fluid">
		  <div class="col-sm-5">
			  <div class="border">
			  <div class="row">
				  
				  <div class="col-sm-4">
					  <img src="https://cdn3.iconfinder.com/data/icons/sympletts-part-3/128/circle-user-2-128.png">
					  <p>five star rating</p>
					  <p>Classname</p>
				  </div>
				  <div class="col-sm-8">
				  <p>Firstname Lastname</p>
					<p>email@ucsc.edu</p>
					  <p>(123)456-7890</p>
					  <div class="row">

					  </div>
				  </div>
			  </div>
			</div>
		  </div>
	  </div>`
	})


	self.go_home = function () {
		self.vue.tutor_result_page = false;
		self.vue.main_page = true;
	}

	self.get_classes = function () {
		$.get(api_get_classes_url,
			function (data) {
				self.vue.class_list = data.classes
			});
	};

	self.get_search = function (search) {
		$.get(api_get_search_url, {
				search: search
			},
			function (data) {
				self.vue.class_list = data.results
			}

		);
	};

	self.append_in_demand = function (search) {
		// $get(api_get_search_url,) {
		// 	search: search
		// },
		// function (data) {
		// 	title = data.results[title]
		// }
		if (self.vue.in_demand.includes(search)) return
	    if (self.vue.in_demand.length < 5) {
			self.vue.in_demand.push(search);
			// self.vue.in_demand.enumerate()
		} else {
			self.vue.in_demand.shift();
			self.vue.in_demand.push(search);
		}
	};

    // self.get_gridData = function() {

    // }

    // self.get_gridColumns = function() {
    // 	$.get
    // }


	// Complete as needed.
	self.vue = new Vue({
		el: "#vue-div",
		delimiters: ['${', '}'],
		unsafeDelimiters: ['!{', '}'],

		data: {
			student_search: "",
			tutor_search: "",
			in_demand: [],
			quoteText: "",
			quoteAuthor: "",
			main_page: true,
			tutor_result_page: false,
			class_list: [],
			searchQuery: '',
		    gridColumns: ['name', 'power'],
		    gridData: [
		      { name: 'Chuck Norris', power: Infinity },
		      { name: 'Bruce Lee', power: 9000 },
		      { name: 'Jackie Chan', power: 7000 },
		      { name: 'Jet Li', power: 8000 }
		    ]
			},
		methods: {
			getQuote: self.getQuote,
			search_for_tutors: self.search_for_tutors,
			create_session: self.create_session,
			go_home: self.go_home,
			get_classes: self.get_classes,
			get_search: self.get_search,
			get_gridData: self.get_gridData,
			get_gridColumns: self.get_gridColumns
			//on student class search submit -> match_tutors()
			//on tutor class search -> match_students()
		},
		created: function () {

			console.log(this.quoteText);
			if (this.quoteText == "") {
				this.getQuote();
			}
		}
	});

	self.get_classes();

	// var demo = new Vue({
	//   el: '#demo',
	//   data: {
	//     searchQuery: '',
	//     gridColumns: ['name', 'power'],
	//     gridData: [
	//       { name: 'Chuck Norris', power: Infinity },
	//       { name: 'Bruce Lee', power: 9000 },
	//       { name: 'Jackie Chan', power: 7000 },
	//       { name: 'Jet Li', power: 8000 }
	//     ]
	//   }
	// });

	return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
	APP = app();
});
