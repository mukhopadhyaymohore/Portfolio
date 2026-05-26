from django.urls import path
from . import views

urlpatterns = [
    path('',                        views.home,                  name='home'),
    path('experience/',             views.experience,            name='experience'),
    path('projects/',               views.projects_hub,          name='projects'),
    path('projects/fullstack/',     views.projects_fullstack,    name='projects_fullstack'),
    path('projects/ml/',            views.projects_ml,           name='projects_ml'),
    path('projects/quantum/',       views.projects_quantum,      name='projects_quantum'),
    path('projects/hardware/',      views.projects_hardware,     name='projects_hardware'),
    path('projects/python/',        views.projects_python,       name='projects_python'),
    path('projects/java/',          views.projects_java,         name='projects_java'),
    path('projects/frontend/',      views.projects_frontend,     name='projects_frontend'),
    path('research/',               views.research,              name='research'),
    path('skills/',                 views.skills,                name='skills'),
    path('achievements/',           views.achievements,          name='achievements'),
    path('contact/',                views.contact,               name='contact'),
]