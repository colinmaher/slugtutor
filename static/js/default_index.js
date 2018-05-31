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

    const quote_endpoint = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    // Some classes.
    var CMPS109 = {
        id: 1,
        title: 'Advanced Programming',
        'demand': 0
    };
    var CMPS121 = {
        id: 2,
        title: 'Mobile Applications',
        'demand': 0
    };
    var CMPS183 = {
        id: 3,
        title: 'Web Applications',
        'demand': 0
    };
    var class_list = [CMPS109, CMPS121, CMPS183];

    // Compenent testing.

    Vue.component('child', {
        props: ['cla'],
        template: '<p>{{ cla.title }}</p>'

    });


    const mycheckbox = Vue.component('my-checkbox', {
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
        template: `<div align = "justify">{{ title }}: {{count}}</div>`
    });

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

    self.search_for_tutors = function(){
                // $.getJSON(get_memos_url(0, 10), function (data) {
        //     self.vue.in_demand = data.memos;

        // });
    }

    // Testing routing for app

    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }
    const Results = {template:  ''}
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
    const routes = [
      { path: '/foo', component: Foo},
      { path: '/bar', component: Bar },
      { path: '/results', component: Results},
        { path: '/edit', redirect: 'profile.html'}
    ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
    const router = new VueRouter({
     routes // short for `routes: routes`
    })


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        router,
        data: {
            class_list: class_list,
            student_search: "",
            tutor_search: "",
            in_demand: [],
            quoteText: "",
            quoteAuthor: ""
        },
        methods: {
            getQuote: function (){
                $.getJSON(quote_endpoint, function (data) {
                    console.log(data);
                    console.log("getQuote called");
                    self.vue.quoteText = data.quote;
                    self.vue.quoteAuthor = data.author;
                });
            },
            search_for_tutors: self.search_for_tutors
            //on student class search submit -> match_tutors()
            //on tutor class search -> match_students()
        },
        created: function(){
            this.getQuote();
        }
    });


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
    APP = app();
});