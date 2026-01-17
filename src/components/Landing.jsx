import "./landing.css"

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <h1 className="title">🏠 Room Finder</h1>

      <p className="subtitle">
        Find rooms easily. List your rooms quickly.
      </p>

      <div className="house" aria-label="animated house">
        🏡
      </div>

      <button
        className="start-btn"
        type="button"
        onClick={() => onStart && onStart()}
      >
        Get Started
      </button>
    </div>
  )
}



