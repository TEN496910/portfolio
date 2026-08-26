from django.contrib import admin
from .models import Project, Testimonial

# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "completed",
        "published",
        "created_at",
    )

    list_filter = (
        "category",
        "completed",
        "published",
    )

    search_fields = (
        "title",
        "description",
        "technologies",
    )

    ordering = (
        "-created_at",
    )

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = (
        "client_name",
        "rating",
        "project",
        "approved",
        "created_at",
    )

    list_filter = (
        "rating",
        "approved",
        "created_at",
    )

    search_fields = (
        "client_name",
        "client_company",
        "message",
    )

    ordering = (
        "-created_at",
    )

    list_editable = (
        "approved",
    )

    list_per_page = 20

    def has_add_permission(self, request):
        return False

