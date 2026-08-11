import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reviews.css';

// Додай імпорт Firebase Auth (припускаємо, що firebase вже ініціалізований десь у проекті)
import { getAuth } from 'firebase/auth';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [images, setImages] = useState([]); // масив файлів
  const [selectedImages, setSelectedImages] = useState([]); // для прев'ю (URL-адреси)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const auth = getAuth();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/reviews');
      setReviews(res.data);
      setError('');
    } catch {
      setError('Помилка при завантаженні відгуків');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    const formData = new FormData();
    formData.append('text', text);
    formData.append('author', author);
    images.forEach(img => {
      formData.append('images', img);
    });

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Ви не авторизовані. Будь ласка, увійдіть в систему.');
        return;
      }
      const token = await user.getIdToken();

      const res = await axios.post('http://localhost:5000/reviews', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(prev => [res.data, ...prev]);
      setText('');
      setAuthor('');
      setImages([]);
      setSelectedImages([]);
      setError('');
      e.target.reset();
    } catch {
      setError('Помилка при додаванні відгуку');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей відгук?')) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Ви не авторизовані. Будь ласка, увійдіть в систему.');
        return;
      }
      const token = await user.getIdToken();

      await axios.delete(`http://localhost:5000/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch {
      setError('Не вдалося видалити відгук');
    }
  };

  const toggleExpand = (id) => {
    setExpandedReviewId(prev => (prev === id ? null : id));
  };

  return (
    <section className="reviews">
      <h2>Відгуки клієнтів</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Ваш відгук"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ім’я, місто"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          {selectedImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Попередній перегляд ${idx + 1}`}
              style={{ maxWidth: '120px', borderRadius: '8px', objectFit: 'contain' }}
            />
          ))}
        </div>

        <button type="submit" style={{ marginTop: 10 }}>Додати відгук</button>
      </form>

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="review-list">
        {reviews.length === 0 && !loading && <p>Відгуків ще немає.</p>}

        {reviews.map((rev) => (
          <div
            className={`review-card ${expandedReviewId === rev.id ? 'expanded' : ''}`}
            key={rev.id}
            onClick={() => toggleExpand(rev.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              boxShadow: expandedReviewId === rev.id ? '0 0 10px rgba(0,0,0,0.2)' : 'none',
              transition: 'box-shadow 0.3s',
            }}
          >
            <p className="review-text">
              “
              {expandedReviewId === rev.id
                ? rev.text
                : rev.text.length > 100
                ? rev.text.slice(0, 100) + '...'
                : rev.text}
              ”
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
              {(rev.images || []).map((imgName, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/uploads_reviews/${imgName}`}
                  alt={`Фото відгуку ${idx + 1}`}
                  style={{ maxWidth: '150px', borderRadius: '8px', objectFit: 'contain' }}
                />
              ))}
            </div>

            <div
              className="review-footer"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}
            >
              <span className="review-author">– {rev.author}</span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(rev.id);
                }}
                style={{
                  background: '#ff4d4f',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
