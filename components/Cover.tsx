import type { Game } from "@/lib/types";

export function Cover({ game, large = false }: { game: Game; large?: boolean }) {
  return (
    <div className={`game-cover ${game.tone} ${large ? "large" : ""}`}>
      <span className="cover-mark">
        {game.name === "Genshin Impact" ? "✦" : game.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="cover-name">{game.name}</span>
    </div>
  );
}
