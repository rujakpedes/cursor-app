import React from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

interface RatingProps {
  value: number;
  count: number;
}

export const Rating: React.FC<RatingProps> = ({ value, count }) => (
  <span className="rating">
    <Star size={14} fill="#facc15" stroke="#facc15" />
    <span className="rating__value">{value}</span>
    <span className="rating__count">({count})</span>
  </span>
);
