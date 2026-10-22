// ==========================================================================
// THỬ THÁCH 2 (REACT.DEV): XỬ LÝ DANH SÁCH LỒNG NHAU (NESTED LISTS)
// Vòng lặp ngoài duyệt món ăn, vòng lặp trong duyệt nguyên liệu
// ==========================================================================
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const RECIPES = [
  {
    id: 'greek-salad',
    name: 'Greek Salad (Salad Hy Lạp)',
    ingredients: ['Cà chua bi', 'Dưa chuột baby', 'Hành tây tím', 'Ô liu đen', 'Phô mai Feta'],
  },
  {
    id: 'hawaiian-pizza',
    name: 'Hawaiian Pizza (Pizza Hawaii)',
    ingredients: ['Đế bánh pizza mỏng', 'Sốt cà chua', 'Phô mai Mozzarella', 'Thịt giăm bông', 'Dứa tươi'],
  },
  {
    id: 'hummus',
    name: 'Hummus (Sốt Đậu Gà Trung Đông)',
    ingredients: ['Đậu gà luộc mềm', 'Sốt mè Tahini', 'Tỏi băm', 'Nước cốt chanh tươi', 'Dầu ô liu nguyên chất'],
  },
];

export default function Challenge2NestedRecipes() {
  return (
    <Card
      title="Thử Thách 2: Danh Sách Lồng Nhau (Nested Lists)"
      subtitle="Yêu cầu: Vòng lặp ngoài duyệt qua các công thức món ăn (key=recipe.id), vòng lặp trong duyệt danh sách nguyên liệu"
      icon="🥗"
    >
      <div className="grid-3-cols">
        {/* VÒNG LẶP NGOÀI: Duyệt qua từng công thức món ăn */}
        {RECIPES.map((recipe) => (
          // Thẻ ngoài cùng nhận key={recipe.id}
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <h4 className="recipe-name">{recipe.name}</h4>
            </div>
            <Badge variant="accent">
              🛒 {recipe.ingredients.length} nguyên liệu
            </Badge>

            <ul className="ingredients-list">
              {/* VÒNG LẶP TRONG: Duyệt qua từng nguyên liệu của món đó */}
              {recipe.ingredients.map((ingredient) => (
                // Tên nguyên liệu là duy nhất trong nội bộ món đó -> dùng làm key
                <li key={ingredient} className="ingredient-item">
                  <span className="ingredient-bullet">✔</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="code-preview">
        <div className="code-comment">
          // 💡 QUY TẮC GÁN KEY KHI CÓ DANH SÁCH LỒNG NHAU:
          <br />
          // - Vòng lặp ngoài: Dùng id của đối tượng cha (recipe.id).
          <br />
          // - Vòng lặp trong: Dùng id hoặc chuỗi tự nhiên duy nhất của phần tử con (ingredient).
        </div>
        <code>
          {`{recipes.map(recipe => (
  <div key={recipe.id}>
    <h2>{recipe.name}</h2>
    <ul>
      {recipe.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
      ))}
    </ul>
  </div>
))}`}
        </code>
      </div>
    </Card>
  );
}
