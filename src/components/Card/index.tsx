import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export interface CardProps {
  rank: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
  latestDate?: string;
  rated: string;
}

export const AnimeCard = ({
  rank,
  title,
  imageUrl,
  releaseDate,
  latestDate = "Now",
  rated,
}: CardProps) => {
  const [mouseDown, setMouseDown] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardAnimationOptions: KeyframeAnimationOptions = {
    duration: 800,
    fill: "forwards",
  };

  useEffect(() => {
    if (cardRef && cardRef.current) {
      cardRef.current.addEventListener("mousedown", () => {
        cardRef.current?.animate(
          {
            height: "420px",
            width: "300px",
            boxShadow: "0 8px 10px 2px #0007",
          },
          cardAnimationOptions
        );
      });
      cardRef.current.addEventListener("mouseup", () => {
        cardRef.current?.animate(
          {
            height: "300px",
            width: "200px",
            boxShadow: "none",
          },
          cardAnimationOptions
        );
      });
    }
  }, []);
  return (
    <div className="anime-card-container">
      <div ref={cardRef} className="anime-card-main">
        <img src={imageUrl} alt={rank + title} />
        <h3>{rank}</h3>
        <span>
          <h4>{title}</h4>
          <h5>
            <span>Release:</span> {releaseDate ?? "Unknown"}
          </h5>
          <h5>
            <span>Latest:</span> {latestDate ?? "Now"}
          </h5>
          <h5>
            <span>Rating:</span> {rated ?? "No ratings yet"}
          </h5>
        </span>
      </div>
    </div>
  );
};
