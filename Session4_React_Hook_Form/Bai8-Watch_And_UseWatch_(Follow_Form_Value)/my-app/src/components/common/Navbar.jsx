import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { to: "/", label: "Tổng Quan & Kiến Trúc", icon: "🏠" },
    {
      to: "/lab1-watch-conditional",
      label: "Lab 1: watch() & Dynamic UI",
      icon: "👁️",
    },
    {
      to: "/lab2-usewatch-isolation",
      label: "Lab 2: useWatch() & Render Isolation",
      icon: "⚡",
    },
    {
      to: "/lab3-watch-vs-dirty",
      label: "Lab 3: watch() vs dirtyFields",
      icon: "⚖️",
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
