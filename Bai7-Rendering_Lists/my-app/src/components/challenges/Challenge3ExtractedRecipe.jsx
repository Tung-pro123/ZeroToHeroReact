// ==========================================================================
// THỬ THÁCH 3 (REACT.DEV): BÓC TÁCH COMPONENT VÀ BẢO TOÀN VỊ TRÍ CỦA KEY
// Quy tắc vàng: Cứ thẻ nào đứng ngay đầu sau dấu => của map() thì thẻ đó giữ key!
// ==========================================================================
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const RECIPES_DATA = [
  {
    id: 'pho-bo',
    name: 'Phở Bò Truyền Thống Hà Nội',
    origin: 'Việt Nam',
    ingredients: ['Bánh phở tươi', 'Bắp bò hoa & gầu giòn', 'Xương ống hầm 12h', 'Gừng nướng & hoa hồi', 'Hành lá & ngò gai'],
  },
  {
    id: 'ramen',
    name: 'Tonkotsu Ramen Hakata',
    origin: 'Nhật Bản',
    ingredients: ['Sợi mì Ramen tươi', 'Nước dùng xương heo đậm đà', 'Thịt xá xíu Chashu', 'Trứng lòng đào Ajitsuke', 'Rong biển Nori'],
  },
];

/**
 * Component con đã được bóc tách riêng
 * ⚠️ LƯU Ý QUAN TRỌNG:
 * - Bên trong Recipe: KHÔNG CẦN và KHÔNG ĐƯỢC gán key={id} nữa!
 * - React không truyền thuộc tính `key` vào props của component con!
 */
function RecipeCardItem({ name, origin, ingredients }) {
  return (
    <div className="recipe-card" style={{ borderLeft: '4px solid var(--color-cyan)' }}>
      <div className="recipe-header">
        <div>
          <h4 className="recipe-name">{name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Xuất xứ: {origin}</span>
        </div>
        <Badge variant="primary">{ingredients.length} món</Badge>
      </div>

      <ul className="ingredients-list">
        {ingredients.map((item) => (
          <li key={item} className="ingredient-item">
            <span className="ingredient-bullet" style={{ color: 'var(--color-cyan)' }}>★</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Challenge3ExtractedRecipe() {
  return (
    <Card
      title="Thử Thách 3: Bóc Tách Component Con & Vị Trí Của Key"
      subtitle="Yêu cầu: Tách khung hiển thị món ăn thành component <Recipe/>, bảo đảm key={recipe.id} nằm ở <Recipe/>"
      icon="📦"
    >
      <div className="grid-2-cols">
        {RECIPES_DATA.map((recipe) => (
          // ⚠️ QUY TẮC CỐT LÕI:
          // Thẻ <RecipeCardItem> đứng ngay đầu sau dấu => của map(), nên thuộc tính key={recipe.id} PHẢI ĐẶT Ở ĐÂY!
          // Truyền tiếp toàn bộ props bằng cú pháp Spread {...recipe}
          <RecipeCardItem
            key={recipe.id}
            {...recipe}
          />
        ))}
      </div>

      <div className="code-preview">
        <div className="code-comment">
          // 💡 TỔNG KẾT VỊ TRÍ ĐẶT KEY KHI TÁCH COMPONENT:
          <br />
          // 1. Ở component cha (bên trong hàm map):
          <br />
          //    {'{recipes.map(recipe => <Recipe key={recipe.id} {...recipe} />)}'}
          <br />
          // 2. Ở component con (Recipe.jsx):
          <br />
          //    function Recipe({'{ name, ingredients }'}) {'{'} return &lt;div className="card"&gt;...&lt;/div&gt;; {'}'} (KHÔNG GÁN KEY NỮA!)
        </div>
        <code>
          {`// Trong file cha:
{recipes.map(recipe => (
  <Recipe
    key={recipe.id}
    {...recipe}
  />
))}

// Trong file con Recipe.jsx:
export default function Recipe({ name, ingredients }) {
  return (
    <div className="recipe">
      <h2>{name}</h2>
      ...
    </div>
  );
}`}
        </code>
      </div>
    </Card>
  );
}
