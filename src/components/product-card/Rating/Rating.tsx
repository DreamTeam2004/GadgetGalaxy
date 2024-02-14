import "./Rating.scss";

interface RatingProps {
  rating: number;
  reviewsCount: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewsCount }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
        &#9733;
      </span>
    );
  }

  return (
    <div className="rating">
      <div className="rating__stars">{stars}</div>
      <div className="rating__reviews">({reviewsCount})</div>
    </div>
  );
};

export default Rating;
