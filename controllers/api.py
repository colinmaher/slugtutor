# These code snippets use an open-source library. http://unirest.io/python
# response = unirest.get("https://healthruwords.p.mashape.com/v1/quotes/?id=731&maxR=1&size=medium&t=Wisdom",
#   headers={
#     "X-Mashape-Key": "NN569DEEiWmshBASQyyNkfCW1ybEp1Saa5Djsndgm5A62xkHEY",
#     "Accept": "application/json"
#   }
# )



def get_classes():
	classes = []
	for row in db(db.classes).select(db.classes.ALL):
		#print(row)
		classes.append(row.title)
	return response.json(dict(classes=classes))

def save_recent_post():
	print('klean kanteen')
	
	tutorlist = []
	for row in db(db.tutor).select(db.tutor.ALL):
		
		t = dict(
            email = row.email,
			ratingform = ' ',
			rating = 32,
                
         )
		tutorlist.append(t)
		
	return  response.json(dict(tutorlist=tutorlist))
	
def get_search():
	results = []
	search = request.vars.search
	print(search)
	for row in db(db.classes.class_id==search).select(orderby=db.classes.title):

		results.append(row.title)

	print(results)
	return response.json(dict(results=results))

def add_post():
    """Adds a tutoring post."""
    form = SQLFORM(db.post)
    if form.process(onvalidation=no_swearing).accepted:
        session.flash = T("Session posted.")
        redirect(URL('default','index'))
    elif form.errors:
        session.flash = T('Please correct the info')
    return dict(form=form)


def get_tutorlist():
	print('black and yellow')
  	tutorlist = []
	for row in db(db.tutor).select(db.tutor.ALL):
		#print(row)
		#tutorlist.append(row.email)
		t = dict(
                email = row.email,
				ratingform = ' ',
				rating = row.rating,
                
            )
		tutorlist.append(t)
	return response.json(dict(tutorlist=tutorlist))

def submitrating():
	print(request.vars.ratingcopy)
	print(request.vars.emailcopy)
	print('hydroflask')
	print('fuck')
	db(db.tutorlist.email == request.vars.emailcopy).update_record(rating = request.vars.ratingcopy)
	return 'h'
def search_tutors():
 	postings = []
	# search = request.vars.search
	# print(search)
	c_dept = request.vars.class_department
	c_number = request.vars.class_number

	for row in db((db.post.class_department==c_dept) and (db.post.class_number==c_number)).select(orderby=db.post.classname):
		post = dict(
			classname=row.classname,
			leader=row.leader,
			day_of=row.day_of,
			start_time=row.start_time,
			end_time=row.end_time

		)
		# postings.append(row.classname)
		postings.append(post)
	print(post)

	return response.json(dict(postings=post))
