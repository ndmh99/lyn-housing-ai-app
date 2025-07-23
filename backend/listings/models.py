from django.db import models

# Create your models here.

class Listing(models.Model):
    """
    Django model representing a real estate property listing.
    This model stores comprehensive information about residential properties
    including location details, pricing, physical characteristics, and media.
    Attributes:
        title (CharField): The listing title or property name (max 255 characters)
        street_address (CharField): Full street address of the property (max 255 characters)
        city (CharField): City where the property is located (max 100 characters)
        province (CharField): Province/state of the property location (max 100 characters)
        description (TextField): Detailed description of the property features and amenities
        current_price (DecimalField): Current listing price with up to 12 digits and 2 decimal places
        bedrooms (IntegerField): Number of bedrooms in the property
        bathrooms (IntegerField): Number of bathrooms in the property
        square_feet (IntegerField): Total square footage of the property
        image_url (URLField): URL link to the main property image (max 500 characters)
    Methods:
        __str__(): Returns the listing title as the string representation of the object
    Example:
        >>> listing = Listing(
        ...     title="Beautiful Family Home",
        ...     street_address="123 Main Street",
        ...     city="Vancouver",
        ...     province="British Columbia",
        ...     description="Spacious family home with modern amenities",
        ...     current_price=750000.00,
        ...     bedrooms=4,
        ...     bathrooms=3,
        ...     square_feet=2500,
        ...     image_url="https://example.com/property-image.jpg"
        ... )
        >>> print(listing)
        Beautiful Family Home
    """
    title = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    description = models.TextField()
    current_price = models.DecimalField(max_digits=12, decimal_places=2)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    square_feet = models.IntegerField()
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.title} - {self.city} - ${self.current_price}"

class PriceHistory(models.Model):
    """
    Model to track price changes over time for property listings.
    This model stores historical price data for listings, allowing tracking of 
    price fluctuations and trends. Each record contains a list of price values
    and the timestamp when the record was created.
    Attributes:
        listing (ForeignKey): Reference to the associated Listing object.
                             Cascade delete ensures price history is removed 
                             when the listing is deleted.
        price_values (JSONField): List of numerical price values representing
                                 the price progression over time. Defaults to
                                 an empty list.
        date_recorded (DateTimeField): Timestamp when this price history record
                                      was created. Automatically set on creation.
    Returns:
        str: String representation showing the listing title and "Price History".
    Example:
        >>> history = PriceHistory.objects.create(
        ...     listing=some_listing,
        ...     price_values=[450000, 460000, 470000]
        ... )
        >>> str(history)
        'Beautiful Home - Price History'
    """
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    price_values = models.JSONField(default=list)  # e.g., [450000, 460000, 470000]
    date_recorded = models.DateField(blank=True, null=True)  # Removed auto_now_add=True

    def save(self, *args, **kwargs):
        # Auto-populate date_recorded if not set
        if not self.date_recorded:
            from django.utils import timezone
            self.date_recorded = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Return a string representation of the price history object.

        Returns:
            str: A formatted string showing the listing title followed by "- Price History".
        """
        return f"{self.listing.title} - Price History"

class AnalysisCache(models.Model):
    """
    Model to cache AI analysis requests and results.
    Fields:
        timestamp: When the request was made (auto_now_add)
        listing: ForeignKey to Listing (indexed)
        input_data: The input data sent to the AI (JSONField)
        analysis_result: The AI's response (TextField)
    """
    timestamp = models.DateTimeField(auto_now_add=True)
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE, related_name='analysis_caches')
    price_history = models.ForeignKey('PriceHistory', on_delete=models.SET_NULL, null=True, blank=True, related_name='analysis_caches')
    analysis_result = models.TextField()

    def __str__(self):
        return f"AnalysisCache for listing {self.listing_id} at {self.timestamp}"
