// ==========================================================================
// THỬ THÁCH 1 (REACT.DEV): PHÂN TÁCH DANH SÁCH THÀNH 2 NHÓM
// Chemists vs Everyone Else
// ==========================================================================
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const PEOPLE = [
  { id: 0, name: 'Creola Katherine Johnson', profession: 'mathematician' },
  { id: 1, name: 'Mario José Molina-Pasquel Henríquez', profession: 'chemist' },
  { id: 2, name: 'Mohammad Abdus Salam', profession: 'physicist' },
  { id: 3, name: 'Percy Lavon Julian', profession: 'chemist' },
  { id: 4, name: 'Subrahmanyan Chandrasekhar', profession: 'astronomer' },
];

export default function Challenge1SplitChemists() {
  // Lọc nhóm 1: Các nhà hóa học (Chemists)
  const chemists = PEOPLE.filter((p) => p.profession === 'chemist');

  // Lọc nhóm 2: Tất cả những người còn lại (Everyone Else)
  const everyoneElse = PEOPLE.filter((p) => p.profession !== 'chemist');

  return (
    <Card
      title="Thử Thách 1: Tách Danh Sách Thành 2 Nhóm Độc Lập"
      subtitle="Yêu cầu: Dùng filter() để tách thành Chemists và Everyone Else, hiển thị ra 2 khối riêng biệt"
      icon="🧪"
    >
      <div className="grid-2-cols">
        {/* KHỐI 1: CHEMISTS */}
        <div style={{ backgroundColor: 'var(--color-bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ color: 'var(--color-success)', fontSize: '1.1rem' }}>
              🧪 Các Nhà Hóa Học (Chemists)
            </h4>
            <Badge variant="success">{chemists.length} người</Badge>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {chemists.map((person) => (
              <li
                key={person.id}
                className="todo-item-row"
                style={{ borderLeft: '3px solid var(--color-success)' }}
              >
                <span>👤 {person.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* KHỐI 2: EVERYONE ELSE */}
        <div style={{ backgroundColor: 'var(--color-bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>
              🌍 Các Lĩnh Vực Khác (Everyone Else)
            </h4>
            <Badge variant="primary">{everyoneElse.length} người</Badge>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {everyoneElse.map((person) => (
              <li
                key={person.id}
                className="todo-item-row"
                style={{ borderLeft: '3px solid var(--color-primary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>👤 {person.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    ({person.profession})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="code-preview">
        <div className="code-comment">
          // 💡 LỜI GIẢI THỬ THÁCH 1:
          <br />
          // Dùng 2 lần filter() để phân nhóm dữ liệu trước khi map() hiển thị vào 2 thẻ &lt;ul&gt;:
        </div>
        <code>
          {`const chemists = people.filter(p => p.profession === 'chemist');
const everyoneElse = people.filter(p => p.profession !== 'chemist');

return (
  <article>
    <h2>Chemists</h2>
    <ul>{chemists.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    <h2>Everyone Else</h2>
    <ul>{everyoneElse.map(p => <li key={p.id}>{p.name}</li>)}</ul>
  </article>
);`}
        </code>
      </div>
    </Card>
  );
}
