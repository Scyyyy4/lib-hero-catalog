import type { Encounter } from "@/types/encounter";

type EncounterCardProps = {
  encounter: Encounter;
};

function ratingStars(n: number) {
  const filled = Math.min(5, Math.max(1, Math.round(n)));
  return {
    stars: "★".repeat(filled) + "☆".repeat(5 - filled),
    label: `${filled}/5`,
  };
}

function hasDisplayRating(
  rating: number | null | undefined,
): rating is number {
  return (
    rating != null &&
    rating > 0 &&
    rating <= 5 &&
    Number.isInteger(rating)
  );
}

export function EncounterCard({ encounter }: EncounterCardProps) {
  const showRating = hasDisplayRating(encounter.rating);
  const ratingDisplay = showRating ? ratingStars(encounter.rating) : null;

  return (
    <article className="card-surface flex flex-col gap-3 p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          遇见了谁
        </p>
        <p className="mt-1 font-serif text-xl font-semibold text-stone-800 sm:text-2xl">
          {encounter.heroName}
        </p>
      </div>
      <p className="text-sm font-medium text-stone-800">
        <span className="text-stone-500">library · </span>
        {encounter.library}
      </p>
      <time
        dateTime={encounter.date}
        className="font-mono text-sm font-medium text-stone-700"
      >
        {encounter.date}
      </time>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          印象
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-700">
          {encounter.impression}
        </p>
      </div>
      {showRating && ratingDisplay ? (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            评级
          </p>
          <p
            className="mt-1 text-sm text-stone-700"
            aria-label={`评级 ${ratingDisplay.label}`}
          >
            <span className="text-amber-700/90" aria-hidden>
              {ratingDisplay.stars}
            </span>
            <span className="ml-1.5 font-medium">{ratingDisplay.label}</span>
          </p>
        </div>
      ) : null}
      {encounter.note ? (
        <p className="text-xs leading-relaxed text-stone-500 italic">
          {encounter.note}
        </p>
      ) : null}
    </article>
  );
}
