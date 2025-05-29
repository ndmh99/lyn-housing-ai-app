from django.contrib import admin
from .models import Listing, PriceHistory

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'city', 'province', 'current_price', 'bedrooms', 'bathrooms']
    list_filter = ['city', 'province', 'bedrooms', 'bathrooms']
    search_fields = ['title', 'street_address', 'city', 'description']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'street_address', 'city', 'province', 'description')
        }),
        ('Property Details', {
            'fields': ('current_price', 'bedrooms', 'bathrooms', 'square_feet', 'image_url')
        }),
    )

@admin.register(PriceHistory)
class PriceHistoryAdmin(admin.ModelAdmin):
    list_display = ['listing', 'date_recorded']
    list_filter = ['date_recorded']
    search_fields = ['listing__title']
