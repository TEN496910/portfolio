from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("testimonial/", views.submit_testimonial, name="submit_testimonial"),
    path("testimonial/success", views.testimonial_success, name="testimonial_success"),
]