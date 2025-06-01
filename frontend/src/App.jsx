import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch('http://localhost:8000/api/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data)
        // Reset form on success
        setFormData({
          title: '',
          description: '',
          price: '',
          image_url: ''
        })
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the Django backend is running.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Grail - Combine</h1>
          <p>Post your items to eBay quickly and easily</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Item Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter item title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting to eBay...' : 'Post to eBay'}
          </button>
        </form>

        {error && (
          <div className="message error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="message success">
            <h3>Success!</h3>
            <p>{response.message}</p>
            {response.ebay_response && (
              <div className="ebay-details">
                <h4>eBay Response:</h4>
                <p><strong>Item ID:</strong> {response.ebay_response.item_id}</p>
                <p><strong>Listing URL:</strong> <a href={response.ebay_response.listing_url} target="_blank" rel="noopener noreferrer">{response.ebay_response.listing_url}</a></p>
                <p><strong>Insertion Fee:</strong> ${response.ebay_response.fees.insertion_fee}</p>
                <p><strong>Final Value Fee:</strong> ${response.ebay_response.fees.final_value_fee.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
