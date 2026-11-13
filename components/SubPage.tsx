import { ArrowLeft } from "lucide-react";
import { PageHeading } from "./PageHeading";

export function SubPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={17} /> Kembali
      </button>
      <PageHeading
        eyebrow="SETTINGS"
        title={title}
        subtitle="Atur preferensi NexPlay sesuai kebutuhanmu."
      />
    </>
  );
}
