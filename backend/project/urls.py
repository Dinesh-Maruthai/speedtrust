from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# SimpleJWT token views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.http import HttpResponse

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('', health_check),
    path('admin/', admin.site.urls),
    path('api/payment/', include('donations.urls', namespace='payment')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)