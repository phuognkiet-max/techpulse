"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import Link from "next/link";
import React from "react";

/** Parse markdown **bold** and `code` inside a text string */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Split by **bold** and `code` patterns
  const regex = /(\*\*.*?\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts
    .filter((p) => p.length > 0)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-sm text-[var(--accent)] font-[var(--font-mono)]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

/** Custom span renderer that handles markdown bold/code */
function RichSpan({ children }: { children?: React.ReactNode }) {
  if (!children) return <>{children}</>;

  // If children is a single text node with markdown, parse it
  if (typeof children === "string") {
    return <>{parseInlineMarkdown(children)}</>;
  }

  // If children is an array, check each element
  if (Array.isArray(children)) {
    const hasMarkdown = children.some(
      (child) =>
        typeof child === "string" &&
        (child.includes("**") || child.includes("`"))
    );

    if (hasMarkdown) {
      const result: React.ReactNode[] = [];
      children.forEach((child, i) => {
        if (typeof child === "string" && (child.includes("**") || child.includes("`"))) {
          result.push(...parseInlineMarkdown(child).map((node, j) =>
            React.cloneElement(node as React.ReactElement, { key: `${i}-${j}` })
          ));
        } else {
          result.push(<React.Fragment key={i}>{child}</React.Fragment>);
        }
      });
      return <>{result}</>;
    }
  }

  return <>{children}</>;
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
      <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-sm text-[var(--accent)] font-[var(--font-mono)]">
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
  // Wrap each span in our RichSpan to parse inline markdown
  span: RichSpan,
};

interface PortableTextProps {
  value: any[];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <PortableTextReact components={components} value={value} />
  );
}
