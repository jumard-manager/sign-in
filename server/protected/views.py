from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .mapping import MyModelSerializer
from .models import MyModel

class AdminPage(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        myModel = MyModel.objects.all()
        serializer = MyModelSerializer(myModel, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print (request.data)
        print ('id : ' + request.data['id'])
        print ('name : ' + request.data['name'])
        print ('param1 : ' + request.data['param1'])
        print ('param2 : ' + request.data['param2'])
        serializer = MyModelSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"msg":"Admin Page Protected-Post!"}, status=status.HTTP_400_BAD_REQUEST)


class UsersPage(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        return Response({"msg":"User Page Requeset-Get!"})

    def post(self, request, format=None):
        return Response({"msg":"User Page Protected-Post!"})

