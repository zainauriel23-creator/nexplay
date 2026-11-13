import { Gamepad2 } from "lucide-react";

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Gamepad2 size={26} />
      </div>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}
