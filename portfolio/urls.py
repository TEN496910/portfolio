from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from core.views import database_check, media_check




urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
    path("database-check/", database_check, name="database_check"),
    path("media-check/", media_check, name="media_check"),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

  