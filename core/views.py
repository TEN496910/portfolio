from django.shortcuts import render, redirect
from .models import Project, Testimonial
from .forms import ContactForm, TestimonialForm
from django.conf import settings
from django.core.mail import EmailMessage
 

#VIEWS HERE.
def home(request):

    projects = Project.objects.filter(
        published=True,
        completed=True
    )

    project_count = Project.objects.filter(
        published=True,
        completed=True
    ).count()

    testimonials = Testimonial.objects.filter(
        approved=True,
        rating__gte=4.5
    )

    contact_form = ContactForm()
    contact_success = request.session.pop(
        "contact_success",
        False
    )

    if request.method == "POST":

        contact_form = ContactForm(request.POST)

        if contact_form.is_valid():

            name = contact_form.cleaned_data["name"]
            email = contact_form.cleaned_data["email"]
            subject = contact_form.cleaned_data["subject"]
            message = contact_form.cleaned_data["message"]

            email_message = EmailMessage(
                subject=f"Portfolio Contact: {subject}",

                body=(
                    f"Name: {name}\n"
                    f"Email: {email}\n\n"
                    f"Message:\n"
                    f"{message}"
                ),

                from_email=settings.DEFAULT_FROM_EMAIL,

                to=[
                    settings.CONTACT_EMAIL
                ],

                reply_to=[
                    email
                ],
            )

            try:

                email_message.send(
                    fail_silently=False
                )

                request.session["contact_success"] = True

                return redirect("home")

            except Exception:

                contact_form.add_error(
                    None,
                    "Sorry, your message could not be sent. Please try again."
                )

    return render(
        request,
        "home.html",
        {
            "projects": projects,
            "project_count": project_count,
            "testimonials": testimonials,
            "contact_form": contact_form,
            "contact_success": contact_success,
        }
    )


def submit_testimonial(request):

    if request.method == "POST":

        form = TestimonialForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            testimonial = form.save(
                commit=False
            )

            # Never allow public approval
            # from the client form.
            testimonial.approved = False

            testimonial.save()

            return redirect(
                "testimonial_success"
            )

    else:

        form = TestimonialForm()


    return render(
        request,
        "testimonial_form.html",
        {
            "form": form,
        }
    )

def testimonial_success(request):
  return render(
    request,
    "testimonial_success.html"
  )




from django.http import JsonResponse
from django.db import connection
from .models import Project, Testimonial


def database_check(request):
    with connection.cursor() as cursor:
        tables = connection.introspection.table_names()

    return JsonResponse({
        "database": connection.vendor,
        "project_table_exists": Project._meta.db_table in tables,
        "testimonial_table_exists": Testimonial._meta.db_table in tables,
    })