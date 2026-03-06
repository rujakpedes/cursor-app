import './Rating.css';

export default function Rating({ score, count }) {
  return (
    <span className="rating">
      <span className="rating__star">★</span>
      <span className="rating__score">{score}</span>
      {count && <span className="rating__count">({count})</span>}
    </span>
  );
}
