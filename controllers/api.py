# These code snippets use an open-source library. http://unirest.io/python
# response = unirest.get("https://healthruwords.p.mashape.com/v1/quotes/?id=731&maxR=1&size=medium&t=Wisdom",
#   headers={
#     "X-Mashape-Key": "NN569DEEiWmshBASQyyNkfCW1ybEp1Saa5Djsndgm5A62xkHEY",
#     "Accept": "application/json"
#   }
# )

@auth.requires_signature()
def get_initial_user_info():
	print(auth.user.id)
	posts = []
	for row in db(db.post.created_by==auth.user.id).select(orderby=~db.post.day_of):
		print(auth.user.first_name)
		#print(row.image_url)
		posts.append(row)

	return response.json(dict(posts=posts,curr_user=auth.user.id))

def get_classes():
	posts = []
	for row in db(db.post).select(db.post.classnum==request.vars.search):
		#print(row)
		posts.append(row)
	return response.json(dict(posts=posts))


def search_posts():
	posts = []
	c_dept = request.vars.class_department
	c_num = request.vars.class_number

	for row in db((db.post.classnum==c_num) & (db.post.department==c_dept)).select(orderby=db.post.created_by):

		post = dict(
			created_on=row.created_on,
			classname=row.classname,

			leader_email=row.leader_email,
			day_of=row.day_of,
			start_time=row.start_time,
			end_time=row.end_time
		)
		posts.append(post)
	print("-------------------------------------------------------")
	print(posts)
	return response.json(dict(posts=posts))

def add_post():
    """Adds a tutoring post."""
    form = SQLFORM(db.post)
    if form.process().accepted:
        session.flash = T("Session posted.")
        redirect(URL('default','index'))
    elif form.errors:
        session.flash = T('Please correct the info')
    return dict(form=form)
# ratings going Here

def get_info():
    def get_num_stars(img_idx):
        if not auth.user_id:
            return None
        r = db((db.rating.user_id == auth.user_id) & (db.rating.image_id == img_idx)).select().first()
        return 0 if r is None else r.num_stars

    image_list = []
    for i, img_url in enumerate(IMAGE_URLS):
        n = get_num_stars(i)
        image_list.append(dict(
            url=img_url,
            num_stars = n,
            num_stars_display = n, # To facilitate vue
            id=i,
        ))
    return response.json(dict(image_list=image_list))



def vote():
	new_rating = request.vars.t_rating
    t_email = request.vars.t_email

	db.tutor.update_or_insert(
        (db.tutor.email == t_email),
        rating = new_rating
    )
    time.sleep(0.5) # To make testing easier.
    return "ok"
