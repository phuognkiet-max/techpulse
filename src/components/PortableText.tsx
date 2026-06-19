"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import Link from "next/link";
import React from "react";

const components = {
  types: {
    image: ({ value }: { value?: { asset?: { url: string }; alt?: string } }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.asset.url}
            alt={value.alt || ""}
            className="w-full rounded-lg object-cover"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-sm text-center text-[var(--text-muted)]">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-sm text-[var(--accent)] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || "#";
      if (href.startsWith("http")) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors">
          {children}
        </Link>
      );
    },
  },
};

interface PortableTextProps {
  value: any[];
}

/**
 * PortableText renderer.
 * NOTE: Blocks should be preprocessed server-side with preprocessBlocks()
 * before passing to this component, to convert raw **markdown** spans
 * into proper Portable Text marks.
 */
export function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;
  return <PortableTextReact components={components} value={value} />;
}
