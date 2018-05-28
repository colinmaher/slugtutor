# These code snippets use an open-source library. http://unirest.io/python
# response = unirest.get("https://healthruwords.p.mashape.com/v1/quotes/?id=731&maxR=1&size=medium&t=Wisdom",
#   headers={
#     "X-Mashape-Key": "NN569DEEiWmshBASQyyNkfCW1ybEp1Saa5Djsndgm5A62xkHEY",
#     "Accept": "application/json"
#   }
# )

def getProfile():
    # profile = d



    def display_form():
        record = db.person(request.args(0))
        form = SQLFORM(db.person, record, deletable=True,
                       upload=URL('download'))
        if form.process().accepted:
            response.flash = 'form accepted'
        elif form.errors:
            response.flash = 'form has errors'
        return dict(form=form)

def search_tutors():
    # query available tutors corresponding to the class picked.