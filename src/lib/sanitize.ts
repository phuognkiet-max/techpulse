/**
 * Server-side preprocessing: convert raw **markdown** and `code` in Sanity
 * Portable Text spans into proper marks. Must run BEFORE rendering.
 */

export function preprocessBlocks(blocks: any[]): any[] {
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
      if (!text.includes("**") && !text.includes("`")) {
        newChildren.push(child);
        continue;
      }

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
