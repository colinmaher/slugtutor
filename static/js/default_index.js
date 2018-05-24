// This is the js for the default/index.html view.

var app = function() {

	
    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

	//This is the random quote generator 

	
		const endpoint = 'https://talaikis.com/api/quotes/random/';
		//const newQuoteButton = document.querySelector('.new-quote');
		//newQuoteButton.addEventListener('click', getQuote);
		function getQuote() {
		  fetch(endpoint)
			 .then(function (response) {
				return response.json();
			 })
			 .then(function (data) {
				console.log(data);
			 })
			 .catch(function () {
				console.log("An error occurred");
			 });
		}

    // Some classes.
    var CMPS109 = {id: 1, title: 'Advanced Programming', 'demand': 0};
    var CMPS121 = {id: 2, title: 'Mobile Applications', 'demand': 0};
    var CMPS183 = {id: 3, title: 'Web Applications', 'demand': 0};
    var class_list = [CMPS109, CMPS121, CMPS183];

    // Compenent testing.

    Vue.component('child', {
      props: ['cla'],
      template: '<p>{{ cla.title }}</p>'
        
    });
	 
	 
	 Vue.component('my-checkbox', {
		template: '#checkbox-template',
		data() {
		  return {
			 checked: false,
			 title: 'Check me'
		  }
		},
		methods: {
		  check() {
			 this.checked = !this.checked;
		  }
		}
	 });
    
    Vue.component('class', {
        data: function () {
            return {
                count: 0
            }
        },
        props: ['title'],
        template: 
            `<div align = "justify">{{ title }}: {{count}}</div>`
    });

    // Vue.component('student_class_search', {
    //     data: function () {
    //         return {
    //             count: 0
    //         }
    //     },
    //     template: '<p>${ title }: ${ demand }</p>'
    // });
    self.get_in_demand_classes = function(){
        // $.getJSON(get_memos_url(0, 10), function (data) {
        //     self.vue.in_demand = data.memos;

        // });
        self.vue.in_demand = self.vue.class_list;

    }

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            class_list: class_list,
            student_search: "",
            tutor_search: "",
            in_demand: [],
        },
        methods: {
            
            //on student class search submit -> match_tutors()
            //on tutor class search -> match_students()
        },
        // created: function(){
        //     self.get_in_demand_classes();
        // }
    }
);


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
