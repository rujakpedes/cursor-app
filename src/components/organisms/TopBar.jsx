import IconButton from '../atoms/IconButton';
import './TopBar.css';

export default function TopBar({ onBack, title, subtitle }) {
  if (title) {
    return (
      <div className="top-bar top-bar--titled">
        <button className="top-bar__back" onClick={onBack}>←</button>
        <div className="top-bar__title-wrap">
          <h2 className="top-bar__title">{title}</h2>
          {subtitle && <p className="top-bar__subtitle">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="top-bar">
      <IconButton onClick={onBack} label="Go back">←</IconButton>
      <div className="top-bar__actions">
        <IconButton label="Favorite">♡</IconButton>
        <div className="top-bar__delivery">
          <span>🚴</span>
          <span>Delivery</span>
          <span>▾</span>
        </div>
      </div>
    </div>
  );
}
