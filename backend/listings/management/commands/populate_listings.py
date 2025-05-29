from django.core.management.base import BaseCommand
from listings.models import Listing, PriceHistory
from decimal import Decimal
import json
from datetime import date, timedelta
import random
from django.db import connection


class Command(BaseCommand):
    help = 'Create sample listings with price history data'

    def handle(self, *args, **options):
        # Clear existing data
        Listing.objects.all().delete()
        PriceHistory.objects.all().delete()
        self.reset_auto_increment()

        # Sample data for listings
        sample_listings = [
            {
                'title': 'Modern Downtown Condo',
                'street_address': '123 King Street W',
                'city': 'Toronto',
                'province': 'ON',
                'description': 'Stunning modern condo in the heart of downtown with floor-to-ceiling windows, stainless steel appliances, and building amenities including gym and rooftop terrace.',
                'current_price': Decimal('850000.00'),
                'bedrooms': 2,
                'bathrooms': 2,
                'square_feet': 1200,
                'image_url': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
            },
            {
                'title': 'Luxury Waterfront Villa',
                'street_address': '456 Lakeshore Blvd',
                'city': 'Vancouver',
                'province': 'BC',
                'description': 'Spectacular waterfront villa with panoramic ocean views, private beach access, gourmet kitchen, and luxurious master suite with spa-like ensuite.',
                'current_price': Decimal('2500000.00'),
                'bedrooms': 4,
                'bathrooms': 3,
                'square_feet': 3500,
                'image_url': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800'
            },
            {
                'title': 'Cozy Suburban Home',
                'street_address': '789 Maple Avenue',
                'city': 'Calgary',
                'province': 'AB',
                'description': 'Perfect family home in quiet neighborhood with updated kitchen, finished basement, large backyard, and double garage. Close to schools and parks.',
                'current_price': Decimal('485000.00'),
                'bedrooms': 3,
                'bathrooms': 2,
                'square_feet': 1800,
                'image_url': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
            },
            {
                'title': 'Historic Heritage House',
                'street_address': '321 Queen Street',
                'city': 'Montreal',
                'province': 'QC',
                'description': 'Charming heritage home with original hardwood floors, exposed brick walls, modern updates while maintaining historic character. Walking distance to downtown.',
                'current_price': Decimal('675000.00'),
                'bedrooms': 3,
                'bathrooms': 1,
                'square_feet': 2200,
                'image_url': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800'
            },
            {
                'title': 'Modern Penthouse Suite',
                'street_address': '555 Bay Street',
                'city': 'Toronto',
                'province': 'ON',
                'description': 'Luxurious penthouse with breathtaking city views, private terrace, high-end finishes, and concierge service. Premium location in financial district.',
                'current_price': Decimal('1250000.00'),
                'bedrooms': 2,
                'bathrooms': 2,
                'square_feet': 1600,
                'image_url': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
            },
            {
                'title': 'Family Home with Garden',
                'street_address': '888 Oak Drive',
                'city': 'Ottawa',
                'province': 'ON',
                'description': 'Spacious family home with beautiful landscaped gardens, updated kitchen, master bedroom with walk-in closet, and recreation room. Great for entertaining.',
                'current_price': Decimal('625000.00'),
                'bedrooms': 4,
                'bathrooms': 3,
                'square_feet': 2400,
                'image_url': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
            },
            {
                'title': 'Studio Loft Downtown',
                'street_address': '777 Granville Street',
                'city': 'Vancouver',
                'province': 'BC',
                'description': 'Trendy studio loft in vibrant downtown area with exposed concrete, high ceilings, modern appliances, and building amenities. Perfect for young professionals.',
                'current_price': Decimal('425000.00'),
                'bedrooms': 1,
                'bathrooms': 1,
                'square_feet': 650,
                'image_url': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
            },
            {
                'title': 'Spacious Ranch Style',
                'street_address': '999 Prairie Road',
                'city': 'Winnipeg',
                'province': 'MB',
                'description': 'Single-level ranch home with open concept living, vaulted ceilings, fireplace, and large lot. Recent renovations include new flooring and paint throughout.',
                'current_price': Decimal('395000.00'),
                'bedrooms': 3,
                'bathrooms': 2,
                'square_feet': 2000,
                'image_url': 'https://images.unsplash.com/photo-1566908829077-38227b70c31b?w=800'
            },
            {
                'title': 'Beachfront Cottage',
                'street_address': '111 Coastal Highway',
                'city': 'Halifax',
                'province': 'NS',
                'description': 'Charming beachfront cottage with stunning ocean views, stone fireplace, wraparound deck, and private beach access. Perfect weekend retreat or year-round home.',
                'current_price': Decimal('550000.00'),
                'bedrooms': 2,
                'bathrooms': 1,
                'square_feet': 1100,
                'image_url': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800'
            },
            {
                'title': 'Executive Townhouse',
                'street_address': '222 Executive Drive',
                'city': 'Edmonton',
                'province': 'AB',
                'description': 'Elegant three-story townhouse with premium finishes, gourmet kitchen with granite counters, master suite with luxury ensuite, and attached garage.',
                'current_price': Decimal('725000.00'),
                'bedrooms': 3,
                'bathrooms': 3,
                'square_feet': 2100,
                'image_url': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
            }
        ]
        
        created_listings = []
        
        # Create listings
        for listing_data in sample_listings:
            listing = Listing.objects.create(**listing_data)
            created_listings.append(listing)
            self.stdout.write(
                self.style.SUCCESS(f'Created listing: {listing.title}')
            )
        
        # Create price history for each listing
        for listing in created_listings:
            # Generate 3-6 historical price points over the past year
            num_entries = random.randint(3, 6)
            # Start with current price and work backwards
            current_price = float(listing.current_price)
            price_history = []
            
            for i in range(num_entries):
                # Generate dates going back in time (30-90 days apart)
                days_back = random.randint(30, 90) * (i + 1)
                entry_date = date.today() - timedelta(days=days_back)
                
                # Vary price by -5% to +10% from current price
                if i == 0:
                    # First entry is current price
                    price = current_price
                else:
                    # Historical prices with some variation
                    variation = random.uniform(0.95, 1.1)
                    price = current_price * variation
                
                price_history.append({
                    'date': entry_date.isoformat(),
                    'price': round(price, 2)
                })
            
            # Sort by date (oldest first)
            price_history.sort(key=lambda x: x['date'])
            
            # Create PriceHistory entry
            PriceHistory.objects.create(
                listing=listing,
                price_values=json.dumps(price_history),
                date_recorded=date.today()
            )
            
            self.stdout.write(
                self.style.SUCCESS(f'Created price history for: {listing.title}')
            )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {len(created_listings)} listings with price history'
            )
        )

    def reset_auto_increment(self):
        """Reset auto-increment counters for SQLite database"""
        with connection.cursor() as cursor:
            # Reset auto-increment counters
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='listings_listing';")
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='listings_pricehistory';")
            
        self.stdout.write(
            self.style.SUCCESS('Reset auto-increment counters')
        )
