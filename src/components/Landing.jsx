export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="animate-title">🏠 Room Finder</h1>

        <p className="animate-text">
          Find the perfect room for rent or list your property easily.
        </p>

        <button className="animate-btn" onClick={onStart}>
          Get Started
        </button>
      </div>
    </div>
  )
}
