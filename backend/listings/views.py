import os
from django.conf import settings  # Add this import
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AnalysisCache
from .models import Listing
from .serializer import ListingSerializer
from openai import OpenAI



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

class OpenAIProxyAPIView(APIView):
    def post(self, request):
        listing_id = request.data.get('listing_id')
        try:
            listing = Listing.objects.get(id=listing_id)
        except Listing.DoesNotExist:
            return Response({"error": "Listing not found."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the latest price history for the listing (if any)
        price_history = listing.pricehistory_set.order_by('-date_recorded').first()
        
        # Check cache
        cached = AnalysisCache.objects.filter(listing=listing, price_history=price_history).first()
        if cached:
            return Response({"analysis": cached.analysis_result, "cached": True})
        
        # Generate prompt using listing and price_history
        prompt = self._generate_prompt(listing, price_history)
        
        # Call OpenAI - Updated to use Django settings
        try:
            # Use settings.OPENAI_API_KEY instead of os.getenv directly
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a real estate market analyst."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=256,
                temperature=0.7,
            )
            analysis = response.choices[0].message.content.strip()
            
            # Cache the result
            AnalysisCache.objects.create(
                listing=listing,
                price_history=price_history,
                analysis_result=analysis
            )
            return Response({"analysis": analysis, "cached": False})
        except Exception as e:
            print("OpenAI Exception:", str(e))
            return Response({"error": "AI analysis failed.", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def _generate_prompt(listing, price_history):
        """
        Helper to generate the prompt for OpenAI based on Listing and PriceHistory.
        """
        return (
            f"Analyze the future price trend for this property and provide a structured, professional real estate analysis report:\n\n"
            f"**Property Details:**\n"
            f"• Listing: {listing.title}\n"
            f"• Location: {listing.city}, {listing.province}\n"
            f"• Current Price: {listing.current_price}\n"
            f"• Specifications: {listing.bedrooms} bedrooms, {listing.bathrooms} bathrooms, {listing.square_feet} sqft\n"
            f"• Description: {listing.description}\n\n"
            f"**Price History Data:**\n"
            f"• Price Values: {price_history.price_values if price_history else 'N/A'}\n"
            f"• Date Recorded: {price_history.date_recorded if price_history else 'N/A'}\n\n"
            f"Please provide your analysis in the following structured format with clear headings and bullet points:\n\n"
            f"**MARKET ANALYSIS SUMMARY**\n"
            f"[Brief overview of current market position]\n\n"
            f"**PRICE TREND ANALYSIS**\n"
            f"[Detailed analysis of price movements and patterns]\n\n"
            f"**FUTURE PRICE PREDICTION**\n"
            f"[Specific predictions with reasoning]\n\n"
            f"**KEY FACTORS & RECOMMENDATIONS**\n"
            f"[Important factors affecting price and actionable recommendations]\n\n"
            f"Use professional real estate terminology and provide specific, actionable insights."
        )