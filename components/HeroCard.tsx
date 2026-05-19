import type { HeroProfile } from "@/types/hero";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteHeroProfile } from "@/lib/heroes/delete-hero-profile";

type HeroCardProps = {
  hero: HeroProfile;
  canDelete?: boolean;
};

const typeLabels: Record<HeroProfile["type"], string> = {
  user: "用户英雄",
  guest: "非用户英雄",
};

export function HeroCard({ hero, canDelete = false }: HeroCardProps) {
  const typeStyles =
    hero.type === "user"
      ? "bg-emerald-100/90 text-emerald-800 ring-emerald-200/80"
      : "bg-stone-200/80 text-stone-700 ring-stone-300/80";

  return (
    <article className="card-surface flex flex-col gap-3 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-serif text-xl font-semibold text-stone-800 sm:text-2xl">
          {hero.name}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${typeStyles}`}
          >
            {typeLabels[hero.type]}
          </span>
          {canDelete && (
            <DeleteButton
              label="删除英雄"
              onDelete={() => deleteHeroProfile(hero.id)}
            />
          )}
        </div>
      </div>
      <p className="text-sm text-stone-600">
        <span className="font-medium text-stone-700">常出现的馆 · </span>
        {hero.library}
      </p>
      {hero.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="标签">
          {hero.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-700 ring-1 ring-stone-200/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-sm leading-relaxed text-stone-600">{hero.bio}</p>
    </article>
  );
}
