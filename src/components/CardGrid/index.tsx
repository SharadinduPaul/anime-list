import React from "react";
import "./style.css";
import { AnimeCard, CardProps } from "../Card";

interface CardGridProps {
  data: CardProps[];
  maxLimit?: number;
}
export const CardGrid = ({ data, maxLimit }: CardGridProps) => {
  return (
    <div className="card-grid-main">
      {data?.map((item, index) =>
        maxLimit ? (
          index < maxLimit ? (
            <AnimeCard key={index} {...item} />
          ) : null
        ) : (
          <AnimeCard key={index} {...item} />
        )
      )}
    </div>
  );
};
