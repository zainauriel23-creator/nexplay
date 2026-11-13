import { ChevronRight, Star } from "lucide-react";
import type { Game } from "@/lib/types";
import { Cover } from "./Cover";

export function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <button className="game-card" onClick={onClick}>
      <Cover game={game} />
      <div className="game-card-info">
        <div>
          <b>{game.name}</b>
          <small>
            {game.genre} • <Star size={11} fill="#F7B84B" /> {game.rating}
          </small>
        </div>
        <span className="card-arrow">
          <ChevronRight size={16} />
        </span>
      </div>
    </button>
  );
}
