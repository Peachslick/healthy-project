import { useState } from 'react';

// Workout photo with emoji fallback if the image file is missing
export default function WorkoutImage({ workout, className = '', emojiSize = 'text-5xl' }) {
  const [failed, setFailed] = useState(false);
  if (failed || !workout.image) {
    return (
      <div className={`bg-gradient-to-br from-accent to-blue-200 flex items-center justify-center ${emojiSize} ${className}`}>
        {workout.emoji}
      </div>
    );
  }
  return (
    <img
      src={workout.image}
      alt={workout.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

