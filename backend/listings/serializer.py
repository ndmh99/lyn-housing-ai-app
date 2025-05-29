from rest_framework import serializers
from .models import Listing, PriceHistory

class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['price_values', 'date_recorded']

class ListingSerializer(serializers.ModelSerializer):
    # The price_histories field is read-only because price history data is managed automatically
    # and should not be updated directly through the ListingSerializer.
    price_histories = PriceHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = [
            # Basic information
            'id', 'title', 'street_address', 'city', 'province', 
            'description', 'current_price', 'bedrooms', 'bathrooms', 
            'square_feet', 'image_url', 'price_histories'
        ]