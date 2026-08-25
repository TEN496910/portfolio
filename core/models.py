from django.db import models

# Create your models here.

class Project(models.Model):
    CATEGORY_CHOICES = [
        ("web", "Web Development"),
        ("python", "Python"),
        ("django", "Django"),
        ("gis", "GIS / Spatial Analysis"),
        ("design", "Graphic Design"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)

    description = models.TextField()

    image = models.ImageField(
        upload_to="projects/"
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="web"
    )

    technologies = models.CharField(
        max_length=300,
        blank=True,
        help_text="Example: HTML, CSS, JavaScript, Django"
    )

    project_url = models.URLField(
        blank=True
    )

    github_url = models.URLField(
        blank=True
    )

    completed = models.BooleanField(
        default=True
    )

    published = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

  
    def technology_list(self):
      return [
        technology.strip()
        for technology in self.technologies.split(",")
        if technology.strip()
      ]

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title




class Testimonial(models.Model):
    RATING_CHOICES = [
        (1.0, "1 Star"),
        (1.5, "1.5 Stars"),
        (2.0, "2 Stars"),
        (2.5, "2.5 Stars"),
        (3.0, "3 Stars"),
        (3.5, "3.5 Stars"),
        (4.0, "4 Stars"),
        (4.5, "4.5 Stars"),
        (5.0, "5 Stars"),
    ]

    client_name = models.CharField(
        max_length=150
    )

    client_role = models.CharField(
        max_length=150,
        blank=True
    )

    client_company = models.CharField(
        max_length=150,
        blank=True
    )

    client_image = models.ImageField(
        upload_to="testimonials/",
        blank=True,
        null=True
    )

    message = models.TextField()

    rating = models.FloatField(
        choices=RATING_CHOICES
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="testimonials"
    )

    approved = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
  
    def full_stars(self):
      return int(self.rating)
      
    def has_half_star(self):
      return self.rating % 1 == 0.5

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_name} - {self.rating} Stars"
