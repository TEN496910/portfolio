from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static
from core.views import database_check, media_check




urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
    path("database-check/", database_check, name="database_check"),
    path("media-check/", media_check, name="media_check"),



  # Serve uploaded media files
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),
]


urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)

  