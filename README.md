# Grail - Combine

A fullstack MVP application that allows users to submit items to eBay through a clean React frontend and Django backend.

## 🏗️ Project Structure

```
grail-combine/
├── backend/           # Django API backend
│   ├── backend/       # Django project settings
│   ├── manage.py      # Django management script
│   └── requirements.txt
└── frontend/          # React frontend
    ├── src/
    ├── package.json
    └── vite.config.js
```

## 🚀 Features

- **Clean, modern React frontend** with responsive design
- **Django REST API backend** with CORS support
- **Form validation** on both frontend and backend
- **Mock eBay API integration** (ready for real eBay credentials)
- **Real-time feedback** with success/error messages
- **Responsive design** that works on all devices

## 🛠️ Setup Instructions

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend will be running at `http://localhost:8000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running at `http://localhost:5173`

## 🎯 Usage

1. **Start both servers** (backend on port 8000, frontend on port 5173)
2. **Open your browser** to `http://localhost:5173`
3. **Fill out the form** with:
   - **Title**: Name of your item
   - **Description**: Detailed description
   - **Price**: Item price in USD
   - **Image URL**: Optional image link
4. **Click "Post to eBay"** to submit the item
5. **View the response** with mock eBay details

## 🔧 API Endpoints

### POST `/api/post/`

Submit an item to eBay (currently mocked).

**Request Body:**
```json
{
  "title": "iPhone 13 Pro",
  "description": "Excellent condition iPhone 13 Pro",
  "price": "799.99",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item posted successfully",
  "ebay_response": {
    "success": true,
    "item_id": "mock_item_123456789",
    "listing_url": "https://www.ebay.com/itm/mock_item_123456789",
    "fees": {
      "insertion_fee": 0.35,
      "final_value_fee": 103.99
    },
    "message": "Item successfully posted to eBay (mocked)"
  },
  "submitted_data": {
    "title": "iPhone 13 Pro",
    "description": "Excellent condition iPhone 13 Pro",
    "price": 799.99,
    "image_url": "https://example.com/image.jpg"
  }
}
```

## 🔮 Future Enhancements

- **Real eBay API Integration**: Replace mock calls with actual eBay AddItem API
- **Multiple Marketplace Support**: Add support for other platforms (Amazon, Mercari, etc.)
- **User Authentication**: Add user accounts and listing management
- **Image Upload**: Allow users to upload images directly
- **Listing Templates**: Save and reuse item templates
- **Analytics Dashboard**: Track listing performance across platforms

## 🛡️ Tech Stack

**Frontend:**
- React 19
- Vite
- Modern CSS with Flexbox/Grid

**Backend:**
- Django 5.0.4
- django-cors-headers
- JSON REST API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
