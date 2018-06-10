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


def get_search():
	results = []
	row_info = {}
	search = request.vars.search.split()
	print("Here are Searches: 1: %r, 2: %r", search[0], search[1])
	query = (db.classes.class_id==search[1]) & (db.classes.department_id==search[0])
	for row in db(query).select():
		row_info = {'title' : row.title, 'department' : row.department, 'class_id' : row.class_id}
		results.append(row_info)
		
	print(results)
	return response.json(dict(results=results))