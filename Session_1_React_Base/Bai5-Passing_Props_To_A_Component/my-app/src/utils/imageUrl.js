// ========================================================================================
// FILE: src/utils/imageUrl.js
// HÀM TIỆN ÍCH CHUẨN CỦA REACT.DEV (CHALLENGE 2):
// Tạo link ảnh thumbnail dựa theo person.imageId và kích thước ảnh 's' (small) hoặc 'b' (big)
// ========================================================================================

/**
 * Tạo URL ảnh chân dung nhà khoa học theo chuẩn CDN của react.dev
 * @param {Object} person - Đối tượng chứa imageId và name
 * @param {string} size - Kích thước ảnh: 's' (small <= 90px) hoặc 'b' (big > 90px)
 * @returns {string} Đường dẫn ảnh trực tiếp
 */
export function getImageUrl(person, size = 's') {
  // Bản chất: CDN của react.dev lưu ảnh với hậu tố 's.jpg' hoặc 'b.jpg'
  return `https://i.imgur.com/${person.imageId}${size}.jpg`;
}
