import type { Author } from "@/types";

export function ArticleAuthor({ author }: { author: Author }) {
  if (!author) return null;

  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
      <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-lg font-bold text-[var(--text-muted)]">
        {author.name?.charAt(0) || "T"}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-bold text-[var(--text-primary)]">{author.name}</p>
          {author.role && (
            <span className="text-[11px] font-medium text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-full">
              {author.role}
            </span>
          )}
        </div>
        {author.bio && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">{author.bio}</p>
        )}
        {author.social && (
          <div className="flex items-center gap-3 mt-3">
            {author.social.twitter && (
              <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                Twitter
              </a>
            )}
            {author.social.github && (
              <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                GitHub
              </a>
            )}
            {author.social.linkedin && (
              <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
