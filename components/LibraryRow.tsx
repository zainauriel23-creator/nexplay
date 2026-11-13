import { X } from "lucide-react";
import type { Game } from "@/lib/types";
import { Cover } from "./Cover";

export function LibraryRow({
  game,
  action,
  onClick,
  onRemove,
}: {
  game: Game;
  action: string;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="library-row">
      <div className="row-cover">
        <Cover game={game} />
      </div>
      <div className="library-meta">
        <b>{game.name}</b>
        <small>{game.genre} • ★ {game.rating}</small>
      </div>
      <button className="secondary small" onClick={onClick}>
        {action}
      </button>
      <button className="icon-button subtle" onClick={onRemove} aria-label="Hapus">
        <X size={16} />
      </button>
    </div>
  );
}
