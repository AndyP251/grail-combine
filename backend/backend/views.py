import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def post_item(request):
    """
    API endpoint to post an item to eBay.
    For now, this mocks the eBay AddItem API call.
    """
    try:
        # Parse JSON data from request
        data = json.loads(request.body)
        
        # Extract required fields
        title = data.get('title', '').strip()
        description = data.get('description', '').strip()
        price = data.get('price', '')
        image_url = data.get('image_url', '').strip()
        
        # Basic validation
        if not title:
            return JsonResponse({'error': 'Title is required'}, status=400)
        
        if not description:
            return JsonResponse({'error': 'Description is required'}, status=400)
        
        if not price:
            return JsonResponse({'error': 'Price is required'}, status=400)
        
        try:
            price_float = float(price)
            if price_float <= 0:
                return JsonResponse({'error': 'Price must be greater than 0'}, status=400)
        except ValueError:
            return JsonResponse({'error': 'Price must be a valid number'}, status=400)
        
        # Mock eBay API call
        # In the future, this will be replaced with actual eBay AddItem API integration
        mock_ebay_response = {
            'success': True,
            'item_id': f"mock_item_{hash(title + description)}"[-10:],
            'listing_url': f"https://www.ebay.com/itm/mock_item_{hash(title)}"[-10:],
            'fees': {
                'insertion_fee': 0.35,
                'final_value_fee': price_float * 0.13
            },
            'message': 'Item successfully posted to eBay (mocked)'
        }
        
        logger.info(f"Mock eBay listing created: {title} - ${price}")
        
        # Return successful response
        return JsonResponse({
            'success': True,
            'message': 'Item posted successfully',
            'ebay_response': mock_ebay_response,
            'submitted_data': {
                'title': title,
                'description': description,
                'price': price_float,
                'image_url': image_url
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    
    except Exception as e:
        logger.error(f"Error posting item: {str(e)}")
        return JsonResponse({'error': 'Internal server error'}, status=500) 