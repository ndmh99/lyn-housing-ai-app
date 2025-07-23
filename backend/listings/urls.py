from django.urls import path
from .views import ListingListView, ListingCreateView, ListingUpdateView, ListingDeleteView, ListingDetailView, search_listings, OpenAIProxyAPIView

urlpatterns = [
    path('', ListingListView.as_view(), name='listing-list'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    path('create/', ListingCreateView.as_view(), name='listing-create'),
    path('<int:pk>/update/', ListingUpdateView.as_view(), name='listing-update'),
    path('<int:pk>/delete/', ListingDeleteView.as_view(), name='listing-delete'),

# Format: /api/listings/search/?city=CityName. For example, /api/listings/search/?city=Halifax
    path('search/', search_listings, name='listing-search'),
    path('analyze-housing/', OpenAIProxyAPIView.as_view(), name='analyze-housing'),
]