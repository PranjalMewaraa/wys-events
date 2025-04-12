import React, { useState } from 'react';
import { rateEvent } from '../../utils/api';

const ChatReview = ({ onClose, eventId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      alert("Please give a rating and write a review.");
      return;
    }

    try {
      setLoading(true);
      await rateEvent(eventId, { stars: rating, reviewText });
      alert("Thank you for your feedback!");
      onClose();
    } catch (error) {
      alert("You have shared your review already");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent p-4 top-[150px]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-center items-center p-4 relative">
          <h2 className="text-xl poppins-semibold text-black">
            Write a <span className="text-orange-400">review</span>
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Review Text Area */}
        <div className="bg-gray-100 rounded-2xl m-2">
          <textarea
            className="w-full h-40 p-3 rounded bg-[#F0F0F0] text-[#333333] resize-none outline-none abeezee-regular"
            placeholder="Let us know how was your experience"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        
        {/* Rating Section */}
        <div className="p-6">
          <p className="abeezee-regular text-center text-lg mb-4">Rate your experience</p>
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="mx-2 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill={star <= (hoveredRating || rating) ? "orange" : "none"}
                  viewBox="0 0 24 24"
                  stroke="orange"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
          </div>
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 rounded font-medium hover:bg-gray-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatReview;
