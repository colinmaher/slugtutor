
var app = function () {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    self.get_profile = function () {


    };

    self.vue = new Vue({
        el: "#edit-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        router,
        data: {},
        methods: {
            getQuote: self.getQuote,
            search_for_tutors: self.search_for_tutors,
            create_session: self.create_session,
            go_home: self.go_home
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

    return self;
};