from django.urls import path
from .views import ListingListView, ListingCreateView, ListingUpdateView, ListingDeleteView, ListingDetailView, search_listings

urlpatterns = [
    path('', ListingListView.as_view(), name='listing-list'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    path('create/', ListingCreateView.as_view(), name='listing-create'),
    path('<int:pk>/update/', ListingUpdateView.as_view(), name='listing-update'),
    path('<int:pk>/delete/', ListingDeleteView.as_view(), name='listing-delete'),
    path('search/', search_listings, name='listing-search'),
]