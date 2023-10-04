"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.views.generic import TemplateView

def return_static(request, path, insecure=True, **kwargs):
    return serve(request, path, insecure, **kwargs)

admin.site.site_title = '管理' 
admin.site.site_header = '管理画面' 
admin.site.index_title = 'メニュー'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include('vue.urls'), name='vue_urls'),
    path('protected/', include('protected.urls'), name='protected_urls'),
    path('public', include('public.urls'), name='public_urls'),
    re_path(r'^templates/static/(?P<path>.*)$', return_static, name='static'),
    #re_path(r'^/*', TemplateView.as_view(template_name='index.html')),
]
