from django.core.management.base import BaseCommand
from listings.models import Listing, PriceHistory
import json
from datetime import date, timedelta
import random
from django.db import connection

# Import listings from your new data file
from ._sample_data import sample_listings


class Command(BaseCommand):
    help = 'Create sample listings with price history data'

    def handle(self, *args, **options):
        # Clear existing data
        Listing.objects.all().delete()
        PriceHistory.objects.all().delete()
        self.reset_auto_increment()
        
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
