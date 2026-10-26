import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ConcertCityPage() {
  const { city } = useParams();
  const [loading, setLoading] = useState(true);
  const [concerts, setConcerts] = useState([]);

  // Mock concert database
  const database = {
    hanoi: [
      { id: 1, title: 'Hà Nội Rock Symphony 2026', venue: 'Sân vận động Mỹ Đình', date: '15/11/2026', price: '850.000đ' },
      { id: 2, title: 'Acoustic Autumn in Hanoi', venue: 'Nhà Hát Lớn Hà Nội', date: '22/11/2026', price: '500.000đ' }
    ],
    saigon: [
      { id: 3, title: 'Saigon Sunset Jazz Festival', venue: 'Bến Bạch Đằng, Q1', date: '05/12/2026', price: '1.200.000đ' },
      { id: 4, title: 'EDM Revolution Saigon', venue: 'SECC Q7', date: '31/12/2026', price: '950.000đ' }
    ],
    danang: [
      { id: 5, title: 'Đà Nẵng Coastal Indie Night', venue: 'Công viên Biển Đông', date: '18/11/2026', price: '350.000đ' }
    ],
    tokyo: [
      { id: 6, title: 'Tokyo Dome Neo-Tokyo Beats', venue: 'Tokyo Dome, Bunkyo', date: '20/12/2026', price: '12.000 JPY' }
    ],
    london: [
      { id: 7, title: 'The Royal Albert Rock Revival', venue: 'Royal Albert Hall', date: '10/01/2027', price: '£75' }
    ]
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const cityKey = (city || '').toLowerCase();
      setConcerts(database[cityKey] || [
        { id: 99, title: `Lễ Hội Âm Nhạc Tại ${city?.toUpperCase()}`, venue: 'Trung tâm Triển lãm', date: 'Sắp công bố', price: '400.000đ' }
      ]);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/params-lab" className="btn btn-secondary btn-sm">
          ← Quay lại Dynamic Params Lab
        </Link>
      </div>

      <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Dynamic Segment :city</span>
            <h2 className="card-title" style={{ fontSize: '1.75rem', textTransform: 'capitalize' }}>
              🎵 Hòa Nhạc Tại: <span style={{ color: '#38bdf8' }}>{city}</span>
            </h2>
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
            useParams().city = <strong style={{ color: '#38bdf8' }}>"{city}"</strong>
          </div>
        </div>

        {/* API Pipeline Simulation */}
        <div style={{ background: '#030712', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
            🛰️ Giả lập luồng API tương tác
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>
            <span style={{ color: '#34d399', fontWeight: 700 }}>GET</span>{' '}
            <span style={{ color: '#e2e8f0' }}>/api/v1/concerts?city={city}</span>{' '}
            <span style={{ color: '#38bdf8' }}>[HTTP 200 OK]</span>
          </div>
        </div>

        {/* Concert List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            <span>⏳ Đang lấy dữ liệu sự kiện cho {city}...</span>
          </div>
        ) : (
          <div className="grid-2">
            {concerts.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h4>
                  <span className="badge badge-emerald">{item.price}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  📍 {item.venue}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
                  📅 {item.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
