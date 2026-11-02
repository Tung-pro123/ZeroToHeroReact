import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { to: "/", label: "Tổng Quan & Adapter Model", icon: "🏠" },
    { to: "/lab1-adapter", label: "Lab 1: Custom Rating & Switch", icon: "🎛️" },
    {
      to: "/lab2-hybrid",
      label: "Lab 2: Hybrid Form (register + Controller)",
      icon: "🚀",
    },
    {
      to: "/lab3-transform",
      label: "Lab 3: Data Transform & Complex Objects",
      icon: "🔄",
    },
    { to: "/quiz", label: "Senior Architect Quiz", icon: "🎓" },
  ];

  return (
    <nav className="app-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end={item.to === "/"}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
