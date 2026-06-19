"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import Link from "next/link";
import React from "react";

/**
 * Parse inline markdown (**bold**, `code`) into React nodes.
 * Used when Sanity spans contain raw markdown instead of proper marks.
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text || (!text.includes("**") && !text.includes("`"))) {
    return [text];
  }

  // Split by **bold** and `code` patterns
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts
    .filter((p) => p.length > 0)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return React.createElement("strong", { key: i, className: "font-bold" }, part.slice(2, -2));
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return React.createElement("code", {
          key: i,
          className: "bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-sm text-[var(--accent)] font-mono",
        }, part.slice(1, -1));
      }
      return React.createElement(React.Fragment, { key: i }, part);
    });
}

/** Custom text node renderer — intercepts raw text before display */
function CustomText({ text, marks }: { text: string; marks?: string[] }) {
  // If text has markdown patterns, parse them
  if (text && (text.includes("**") || text.includes("`"))) {
    return <>{parseInlineMarkdown(text)}</>;
  }
  // Default: just render the text
  return <>{text}</>;
}

// Custom components for Portable Text
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
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
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
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-sm text-[var(--accent)] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
        >
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
 * Pre-process blocks: parse **bold** and `code` in span text into proper marks.
 * This is the most reliable approach — fix data before rendering.
 */
function preprocessBlocks(blocks: any[]): any[] {
  if (!blocks) return blocks;

  return blocks.map((block) => {
    if (block._type !== "block" || !block.children) return block;

    const newChildren: any[] = [];

    for (const child of block.children) {
      if (child._type !== "span" || !child.text) {
        newChildren.push(child);
        continue;
      }

      const text = child.text;

      // If no markdown, keep as-is
      if (!text.includes("**") && !text.includes("`")) {
        newChildren.push(child);
        continue;
      }

      // Parse markdown patterns: **bold** and `code`
      const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
      const parts = text.split(regex);

      for (const part of parts) {
        if (!part) continue;

        if (part.startsWith("**") && part.endsWith("**")) {
          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).slice(2),
            text: part.slice(2, -2),
            marks: [...(child.marks || []), "strong"],
          });
        } else if (part.startsWith("`") && part.endsWith("`")) {
          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).slice(2),
            text: part.slice(1, -1),
            marks: [...(child.marks || []), "code"],
          });
        } else {
          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).slice(2),
            text: part,
            marks: child.marks || [],
          });
        }
      }
    }

    return { ...block, children: newChildren };
  });
}

export function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;

  // Pre-process to fix raw markdown in spans
  const processed = preprocessBlocks(value);

  return (
    <PortableTextReact components={components} value={processed} />
  );
}
