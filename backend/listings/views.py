from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Listing
from .serializer import ListingSerializer


#----------------------------- API Views for Listings -----------------------------#


# List all listings (GET only)
class ListingListView(generics.ListAPIView):
    """
    API view for listing all housing listings (GET requests only).
    Frontend can call: GET /api/listings/
    """
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

# Create new listing (POST only)
class ListingCreateView(generics.CreateAPIView):
    """
    API view for creating new housing listings (POST requests only).
    Frontend can call: POST /api/listings/create/
    """
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

# Update existing listing (PUT only)
class ListingUpdateView(generics.UpdateAPIView):
    """
    API view for updating existing listings (PUT requests only).
    Frontend can call: PUT /api/listings/1/update/
    """
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

# Delete listing (DELETE only)
class ListingDeleteView(generics.DestroyAPIView):
    """
    API view for deleting listings (DELETE requests only).
    Frontend can call: DELETE /api/listings/1/delete/
    """
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingDetailView(generics.RetrieveAPIView):
    """
    API view for retrieving a single listing by its ID (GET requests only).
    Frontend can call: GET /api/listings/1/
    """
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


#----------------------------- Custom Search API View -----------------------------#


# Custom API view for filtering listings
@api_view(['GET'])  # This decorator specifies that this view only accepts GET requests
def search_listings(request):
    """
    Handles GET requests to search for listings, optionally filtering by city.
    Query Parameters:
        city (str, optional): The city name to filter listings by. Performs a case-insensitive search.
    Returns:
        Response: A JSON response containing a list of serialized listings matching the search criteria.
    
    The response will look like this if listings are found:
    [
        {
            "id": 1,
            "title": "Beautiful Family Home",
            "street_address": "123 Main St",
            "city": "Springfield",
            "province": "IL",
            "description": "A lovely family home with a spacious backyard.",
            "current_price": "250000.00",
            "bedrooms": 4,
            "bathrooms": 3,
            "square_feet": 2500,
            "image_url": "https://example.com/property-image.jpg"
        },
        {
            "id": 2,
            "title": "Modern Apartment",
            "street_address": "456 Elm St",
            "city": "Springfield",
            "province": "IL",
            "description": "A modern apartment in the city center.",
            "current_price": "180000.00",
            "bedrooms": 2,
            "bathrooms": 1,
            "square_feet": 1200,
            "image_url": "https://example.com/apartment-image.jpg"
        }
        ...
    ]    
    """
    city = request.GET.get('city')  # Get the 'city' parameter from the query string, if provided
    
    listings = Listing.objects.all()  # Start with all Listing objects in the database
    
    if city:
        # If a city was provided, filter listings where the city field contains the search term (case insensitive)
        listings = listings.filter(city__icontains=city)
    
    serializer = ListingSerializer(listings, many=True)  # Serialize the queryset to JSON format
    # Return appropriate responses based on different scenarios
    if listings.exists():
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data as an HTTP response
    else:
        return Response(
            {"message": "No listings found matching the search criteria."}, 
            status=status.HTTP_404_NOT_FOUND
        )