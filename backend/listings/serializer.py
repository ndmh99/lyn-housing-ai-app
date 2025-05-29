from rest_framework import serializers
from .models import Listing, PriceHistory

class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['id', 'price_values', 'date_recorded']
        read_only_fields = ['id', 'date_recorded']
        
class ListingSerializer(serializers.ModelSerializer):

    price_histories = PriceHistorySerializer(source='pricehistory_set', many=True, read_only=True)
    class Meta:
        model = Listing
        fields = [
            # Basic information
            'id', 'title', 'street_address', 'city', 'province', 
            'description', 'current_price', 'bedrooms', 'bathrooms', 
            'square_feet', 'image_url', 'price_histories'
        ]