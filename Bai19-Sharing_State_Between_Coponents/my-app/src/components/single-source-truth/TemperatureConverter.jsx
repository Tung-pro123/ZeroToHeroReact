import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Helper quy đổi nhiệt độ
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// Child Input Component
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = {
    c: 'Độ C (Celsius)',
    f: 'Độ F (Fahrenheit)',
  };

  return (
    <div style={{ flex: 1, minWidth: '220px', background: '#0d1527', border: '1px solid #1e293b', borderRadius: '10px', padding: '1.25rem' }}>
      <label style={{ display: 'block', fontWeight: 600, color: scale === 'c' ? '#34d399' : '#38bdf8', marginBottom: '0.5rem' }}>
        {scale === 'c' ? '🌡️' : '❄️'} Nhập nhiệt độ theo {scaleNames[scale]}:
      </label>
      <input
        type="number"
        className="input-control"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        placeholder={`Nhập ${scale.toUpperCase()}...`}
      />
    </div>
  );
}

// Boiling Verdict
function BoilingVerdict({ celsius }) {
  const c = parseFloat(celsius);
  if (Number.isNaN(c)) {
    return <div style={{ color: '#9ca3af' }}>Vui lòng nhập một số hợp lệ...</div>;
  }
  if (c >= 100) {
    return (
      <div style={{ padding: '0.85rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5' }}>
        🔥 <strong>Nhiệt độ này ĐỦ ĐỂ NƯỚC SÔI!</strong> (Từ 100°C trở lên).
      </div>
    );
  }
  if (c <= 0) {
    return (
      <div style={{ padding: '0.85rem 1rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', color: '#bae6fd' }}>
        ❄️ <strong>Nhiệt độ này ĐỦ ĐỂ NƯỚC ĐÓNG BĂNG!</strong> (Từ 0°C trở xuống).
      </div>
    );
  }
  return (
    <div style={{ padding: '0.85rem 1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#a7f3d0' }}>
      💧 <strong>Nước ở trạng thái lỏng bình thường.</strong> (Chưa sôi, chưa đóng băng).
    </div>
  );
}

export default function TemperatureConverter() {
  // ✅ Triết lý: Chỉ lưu 1 nguồn sự thật duy nhất tại Cha!
  const [temperature, setTemperature] = useState('100');
  const [scale, setScale] = useState('c'); // 'c' | 'f'

  const handleCelsiusChange = (temp) => {
    setScale('c');
    setTemperature(temp);
  };

  const handleFahrenheitChange = (temp) => {
    setScale('f');
    setTemperature(temp);
  };

  // Tính toán phái sinh (Derived State) ngay trong lúc render
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  // Gauge bar calculation (0 to 120 C)
  const numC = parseFloat(celsius) || 0;
  const gaugePercent = Math.min(Math.max((numC / 120) * 100, 0), 100);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🌡️ 5. Nghiên Cứu Điển Hình: Nguồn Sự Thật Duy Nhất (Single Source of Truth)</h2>
        <p className="lab-card-desc">
          Case study kinh điển trong tài liệu React.dev: Bộ chuyển đổi nhiệt độ hai chiều Celsius &lt;-&gt; Fahrenheit 
          mà không cần tạo 2 biến state gây xung đột.
        </p>
      </div>

      <InfoBox type="tip" title="Bài Toán Chống Lệch Pha Dữ Liệu:">
        Nếu bạn tạo <code>const [c, setC] = useState()</code> và <code>const [f, setF] = useState()</code> rồi dùng <code>useEffect</code> để cập nhật nhau, 
        bạn sẽ gặp lỗi làm tròn số vô tận và logic cực kỳ rắc rối.<br />
        <strong>Cách giải quyết đúng:</strong> Cha chỉ lưu <code>temperature</code> và <code>scale</code> hiện tại. Giá trị còn lại được tính toán phái sinh tức thì.
      </InfoBox>

      {/* Dual Inputs */}
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}
        />
      </div>

      {/* Thermometer Visual Gauge */}
      <div style={{ background: '#0a0f1d', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
          <span>Thước đo nhiệt kế mô phỏng (0°C - 120°C):</span>
          <span>{celsius}°C / {fahrenheit}°F</span>
        </div>
        <div style={{ width: '100%', height: '14px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${gaugePercent}%`,
              height: '100%',
              background: numC >= 100 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #06b6d4, #10b981)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Boiling Verdict */}
      <BoilingVerdict celsius={celsius} />

      {/* Presets */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Điểm nhiệt độ tiêu biểu:</span>
        <button className="btn btn-secondary btn-sm" onClick={() => handleCelsiusChange('0')}>
          ❄️ Nước đá (0°C)
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleCelsiusChange('37')}>
          🌡️ Thân nhiệt người (37°C)
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleCelsiusChange('100')}>
          🔥 Nước sôi (100°C)
        </button>
      </div>
    </div>
  );
}
