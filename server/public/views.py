import json
from django.http.response import JsonResponse
#from django.contrib.auth.decorators import login_required

#@login_required
def index(request) :
    if request.method == 'GET':
        return JsonResponse({"msg":"Welcome public!"})