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

	// Checks equivalency of objects given an array and an object
	self.contains = function(a, b) {
		b_Object = JSON.stringify(b);
		for (var i = 0; i <a.length; i++) {
			if (JSON.stringify(a[i]) == b_Object) return true;
			return false;
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

	self.get_in_demand_classes = function () {
		self.vue.in_demand = self.vue.class_list;

	}

	self.search_for_tutors = function (search) {
		console.log(search);
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
		self.vue.get_gridData();
	}

	self.get_classes = function () {
		$.get(api_get_classes_url,
			function (data) {
				if (data.results == null) return;
				self.vue.class_list = data.classes
			});
	};

	self.get_search = function (search) {
		$.get(api_get_search_url, {
				search: search
			},
			function (data) {
				if (data.results == null) return;
				self.vue.class_list = data.results
			}

		);
	};

	self.append_in_demand = function (search) {
		$.get(api_get_search_url, {
				search: search 
		    },
			function (data) {
				if (data.results == null) return;
				if (self.contains(self.vue.in_demand, data.results[0])) return;
				if (self.vue.in_demand.length < 5) {
					self.vue.in_demand.push(data.results[0]);
				} else {
					self.vue.in_demand.shift();
					self.vue.in_demand.push(data.results[0]);
				}
			}
		);
	};

    self.get_gridData = function() {
       for (var i = 0; i<self.vue.in_demand.length; i++) {
       	   if (self.vue.gridData.includes(self.vue.in_demand[i])) continue;
           else self.vue.gridData[i] = self.vue.in_demand[i];
       }
    }

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
		    gridColumns: [ 'department', 'class_id', 'title'],
		    gridData: []
			},
		methods: {
			getQuote: self.getQuote,
			search_for_tutors: self.search_for_tutors,
			create_session: self.create_session,
			go_home: self.go_home,
			get_classes: self.get_classes,
			get_search: self.get_search,
			get_gridData: self.get_gridData,
		},
		created: function () {

			console.log(this.quoteText);
			if (this.quoteText == "") {
				this.getQuote();
			}
		}
	});

	self.get_classes();

	return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
	APP = app();
});
