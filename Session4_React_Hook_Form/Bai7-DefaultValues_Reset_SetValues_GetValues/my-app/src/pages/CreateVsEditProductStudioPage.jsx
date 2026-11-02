import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

// Component 1: Create Product Form
function CreateProductComponent() {
  const [createdItems, setCreatedItems] = useState([]);
  const [simulateServerError, setSimulateServerError] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      category: 'ELECTRONICS',
    },
  });

  const onSubmitCreate = async (data) => {
    setStatusMessage(null);
    // Giả lập trễ mạng 1s
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (simulateServerError) {
      // API THẤT BẠI: Giữ nguyên dữ liệu trên form, KHÔNG reset!
      setStatusMessage({ type: 'error', text: 'HTTP 500: Lỗi máy chủ! Dữ liệu của bạn được bảo toàn trên form để nhập lại.' });
      return;
    }

    // API THÀNH CÔNG: Gọi reset() để dọn sạch form cho lần tạo tiếp theo
    setCreatedItems((prev) => [{ id: Date.now(), ...data }, ...prev]);
    reset();
    setStatusMessage({ type: 'success', text: `Đã tạo thành công sản phẩm "${data.name}" và reset form về rỗng!` });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-light)' }}>
          ➕ Màn Hình Tạo Sản Phẩm Mới (Create Form)
        </h3>

        {/* Server Fail Toggle to show don't reset early principle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8rem', cursor: 'pointer', background: 'rgba(244, 63, 94, 0.08)', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(244,63,94,0.2)' }}>
          <input
            type="checkbox"
            checked={simulateServerError}
            onChange={(e) => setSimulateServerError(e.target.checked)}
            style={{ accentColor: 'var(--accent-rose)' }}
          />
          <span style={{ color: 'var(--accent-rose)' }}>Giả lập API gặp lỗi 500 (Thử nghiệm nguyên tắc không reset quá sớm)</span>
        </label>

        {statusMessage && (
          <div style={{ padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.85rem', background: statusMessage.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', color: statusMessage.type === 'success' ? '#34d399' : '#fb7185', border: `1px solid ${statusMessage.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}` }}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitCreate)}>
          <div className="form-group">
            <label className="form-label">Tên Sản Phẩm <span className="required">*</span></label>
            <input
              className={`form-input ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Tên sản phẩm không được để trống' })}
              placeholder="ví dụ: Bàn phím cơ Bluetooth"
            />
            {errors.name && <div className="error-feedback">⚠️ {errors.name.message}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Giá Bán (VNĐ) <span className="required">*</span></label>
            <input
              type="number"
              className={`form-input ${errors.price ? 'is-invalid' : ''}`}
              {...register('price', {
                valueAsNumber: true,
                min: { value: 1000, message: 'Giá sản phẩm tối thiểu là 1.000đ' },
              })}
            />
            {errors.price && <div className="error-feedback">⚠️ {errors.price.message}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Danh Mục</label>
            <select className="form-select" {...register('category')}>
              <option value="ELECTRONICS">Thiết Bị Điện Tử</option>
              <option value="ACCESSORIES">Phụ Kiện Máy Tính</option>
              <option value="OFFICE">Văn Phòng Phẩm</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? '⏳ Đang Tạo Sản Phẩm...' : '🚀 Tạo Sản Phẩm (Tự Động reset() khi thành công)'}
          </button>
        </form>
      </div>

      {/* Created Items List */}
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          📋 Danh Sách Sản Phẩm Vừa Tạo (Database Cache):
        </h4>
        <div className="inspector-panel" style={{ minHeight: '260px' }}>
          {createdItems.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
              Chưa có sản phẩm nào được tạo. Hãy điền form và bấm "Tạo Sản Phẩm"...
            </div>
          ) : (
            createdItems.map((item) => (
              <div key={item.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: 'var(--primary-light)' }}>{item.name}</strong> -{' '}
                <span style={{ color: 'var(--accent-emerald)' }}>{Number(item.price).toLocaleString()}đ</span>{' '}
                <span className="badge badge-indigo" style={{ marginLeft: '0.5rem' }}>{item.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Component 2: Edit Product Form (Server sync via useEffect)
function EditProductComponent() {
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [serverProduct, setServerProduct] = useState(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      description: '',
    },
  });

  // Giả lập fetching server data khi chọn Product ID khác nhau
  useEffect(() => {
    setIsLoadingApi(true);
    setSaveSuccessMsg('');

    const timer = setTimeout(() => {
      let mockItem;
      if (selectedProductId === 1) {
        mockItem = { id: 1, name: 'MacBook Pro 16 inch M3', price: 65000000, description: 'Chip M3 Max, 36GB RAM, 1TB SSD Space Gray' };
      } else {
        mockItem = { id: 2, name: 'Dell UltraSharp 27 4K', price: 14500000, description: 'Màn hình chuyên đồ họa IPS Black 98% DCI-P3' };
      }

      setServerProduct(mockItem);
      // ĐỒNG BỘ FORM BẰNG reset(mockItem)
      reset({
        name: mockItem.name,
        price: mockItem.price,
        description: mockItem.description,
      });
      setIsLoadingApi(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedProductId, reset]);

  const onUpdateProduct = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setServerProduct((prev) => ({ ...prev, ...formData }));
    // Cập nhật baseline mới: isDirty sẽ trở về false!
    reset(formData);
    setSaveSuccessMsg('Đã cập nhật sản phẩm thành công lên server!');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
            ✏️ Màn Hình Chỉnh Sửa (Edit Form)
          </h3>
          <span className={`status-pill ${isDirty ? 'status-pill-true' : 'status-pill-false'}`}>
            isDirty: {isDirty ? 'MODIFIED' : 'SYNCED'}
          </span>
        </div>

        {/* Server Product Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            className={`btn ${selectedProductId === 1 ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setSelectedProductId(1)}
          >
            Tải Sản Phẩm #1 (MacBook)
          </button>
          <button
            type="button"
            className={`btn ${selectedProductId === 2 ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setSelectedProductId(2)}
          >
            Tải Sản Phẩm #2 (Màn Hình Dell)
          </button>
        </div>

        {isLoadingApi ? (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            ⏳ Đang tải dữ liệu từ máy chủ (GET /api/products/{selectedProductId})...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onUpdateProduct)}>
            {saveSuccessMsg && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-emerald)', color: '#34d399', padding: '0.5rem 0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                ✓ {saveSuccessMsg}
              </div>
            )}

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Tên Sản Phẩm</label>
                {dirtyFields.name && <span className="status-pill status-pill-true">✏️ Sửa</span>}
              </div>
              <input
                className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                {...register('name', { required: 'Tên không được để trống' })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Giá Bán (VNĐ)</label>
                {dirtyFields.price && <span className="status-pill status-pill-true">✏️ Sửa</span>}
              </div>
              <input
                type="number"
                className={`form-input ${errors.price ? 'is-invalid' : ''}`}
                {...register('price', { valueAsNumber: true })}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Mô Tả Chi Tiết</label>
                {dirtyFields.description && <span className="status-pill status-pill-true">✏️ Sửa</span>}
              </div>
              <textarea rows={2} className="form-textarea" {...register('description')} />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? '⏳ Đang Lưu Thay Đổi...' : '💾 Cập Nhật Sản Phẩm (PUT /api/products)'}
            </button>
          </form>
        )}
      </div>

      {/* Database State Display */}
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          🗄️ Trạng Thái Dữ Liệu Thực Tế Trên Database Server:
        </h4>
        <div className="code-block" style={{ minHeight: '260px' }}>
          {serverProduct ? (
            <pre>{JSON.stringify(serverProduct, null, 2)}</pre>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>Đang đợi tải...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreateVsEditProductStudioPage() {
  const [activeTab, setActiveTab] = useState('CREATE'); // 'CREATE' | 'EDIT'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-blue">STUDIO DUAL-MODE</span>
              <span className="badge badge-emerald">CREATE VS EDIT FORMS</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Studio Thực Chiến: Create Form vs Edit Form
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Hai bài toán kinh điển trong mọi ứng dụng web: Tạo mới (xóa rỗng form an toàn bằng <code>reset()</code>) 
              và Chỉnh sửa (đồng bộ dữ liệu bất đồng bộ từ server bằng <code>reset(product)</code> trong <code>useEffect</code>).
            </p>
          </div>
          <RenderCounter name="CreateVsEditProductStudioPage" />
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="button"
          className={`btn ${activeTab === 'CREATE' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('CREATE')}
        >
          ➕ 1. Create Form (Reset sau Submit)
        </button>
        <button
          type="button"
          className={`btn ${activeTab === 'EDIT' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('EDIT')}
        >
          ✏️ 2. Edit Form (Sync Server Data via useEffect)
        </button>
      </div>

      {/* Render Active Component */}
      <div className="card">
        {activeTab === 'CREATE' ? <CreateProductComponent /> : <EditProductComponent />}
      </div>
    </div>
  );
}

