import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="breadcrumb-separator" aria-hidden="true">/</li>
              {isLast ? (
                <li className="breadcrumb-item active" aria-current="page">
                  {item.label}
                </li>
              ) : (
                <li className="breadcrumb-item">
                  <Link to={item.to}>{item.label}</Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
