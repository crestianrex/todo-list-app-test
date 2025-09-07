from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Todo
from .serializers import TodoSerializer, UserSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        return self.request.user.todo_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]