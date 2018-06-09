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
	search = request.vars.search
	for row in db(db.classes.class_id==search).select(orderby=db.classes.title):

		results.append(row.title)
		
	print(results)
	return response.json(dict(results=results))