from django import forms
from .models import Testimonial


class TestimonialForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
      super().__init__(*args, **kwargs)
      
      self.fields["project"].queryset = (
        self.fields["project"]
          .queryset
          .filter(
            completed=True,
            published=True
          )
          .order_by("-created_at")
      )

    class Meta:
        model = Testimonial

        fields = [
            "client_name",
            "client_role",
            "client_company",
            "client_image",
            "message",
            "rating",
            "project",
        ]

        widgets = {
            "client_name": forms.TextInput(
                attrs={
                    "placeholder": "Your name",
                    "autocomplete": "name",
                }
            ),

            "client_role": forms.TextInput(
                attrs={
                    "placeholder": "Your role",
                }
            ),

            "client_company": forms.TextInput(
                attrs={
                    "placeholder": "Company / Organization",
                }
            ),

            "message": forms.Textarea(
                attrs={
                    "placeholder": "Tell me about your experience...",
                    "rows": 6,
                }
            ),

            "rating": forms.Select(),

            "project": forms.Select(),
        }


class ContactForm(forms.Form):

    name = forms.CharField(
        max_length=100
    )

    email = forms.EmailField()

    subject = forms.CharField(
        max_length=200
    )

    message = forms.CharField(
        widget=forms.Textarea
    )
  