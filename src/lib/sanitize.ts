/**
 * Server-side preprocessing: convert raw **markdown** and `code` in Sanity
 * Portable Text spans into proper marks. Also detects markdown table syntax
 * and paragraph-level lists, converting them to renderable structures.
 * Must run BEFORE rendering.
 */

export function preprocessBlocks(blocks: any[]): any[] {
  if (!blocks) return blocks;

  // First pass: convert markdown spans in existing blocks
  const preprocessed = blocks.map((block) => {
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

  // Second pass: detect markdown tables and convert to custom type
  const withTables = convertMarkdownTables(preprocessed);

  // Third pass: detect paragraph-level lists and convert to proper list blocks
  const withLists = convertParagraphLists(withTables);

  return withLists;
}

/**
 * Detect consecutive blocks that form a markdown table and convert to
 * a custom "markdownTable" type that the renderer can pick up.
 */
function convertMarkdownTables(blocks: any[]): any[] {
  const result: any[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Check if this block contains a markdown table row
    if (isMarkdownTableRow(block)) {
      const tableRows: any[][] = [];
      let j = i;

      // Collect all consecutive table rows
      while (j < blocks.length && isMarkdownTableRow(blocks[j])) {
        const text = getBlockText(blocks[j]);
        const cells = parseTableRow(text);
        tableRows.push(cells);
        j++;
      }

      // Need at least header + separator + 1 data row
      if (tableRows.length >= 3) {
        const header = tableRows[0];
        // Skip separator row (index 1, the |---|---| row)
        const dataRows = tableRows.slice(2);

        result.push({
          _type: "markdownTable",
          _key: `table-${i}`,
          headers: header,
          rows: dataRows,
        });
        i = j;
        continue;
      }
    }

    result.push(block);
    i++;
  }

  return result;
}

function isMarkdownTableRow(block: any): boolean {
  if (block._type !== "block" || !block.children) return false;
  const text = getBlockText(block);
  // Match: "| cell | cell |" pattern
  return /^\|(.+)\|$/.test(text.trim());
}

function getBlockText(block: any): string {
  if (!block.children) return "";
  return block.children
    .filter((c: any) => c._type === "span")
    .map((c: any) => c.text)
    .join("");
}

function parseTableRow(text: string): string[] {
  const trimmed = text.trim();
  // Remove leading and trailing |
  const inner = trimmed.replace(/^\|/, "").replace(/\|$/, "");
  return inner.split("|").map((cell) => cell.trim());
}

/**
 * Detect paragraphs where list items are concatenated into a single block
 * and split them into proper list blocks.
 *
 * Pattern detection: text contains repeated phrases like "Bạn cần XBạn cần Y"
 * or "Bạn làm XBạn làm Y" where items run together without punctuation.
 */
function convertParagraphLists(blocks: any[]): any[] {
  const result: any[] = [];

  for (const block of blocks) {
    if (block._type !== "block" || !block.children) {
      result.push(block);
      continue;
    }

    const text = getBlockText(block);
    if (!text) {
      result.push(block);
      continue;
    }

    // Detect concatenated list patterns
    const splitItems = splitConcatenatedList(text);

    if (splitItems && splitItems.length > 1) {
      // Convert to proper list block
      const listItems = splitItems.map((item, idx) => ({
        _type: "block",
        _key: `list-item-${idx}`,
        style: "normal",
        listItem: "bullet",
        children: [
          {
            _type: "span",
            _key: `span-${idx}`,
            text: item,
            marks: [],
          },
        ],
        markDefs: [],
      }));

      // First item gets the original block's key
      listItems[0]._key = block._key || listItems[0]._key;
      result.push(...listItems);
    } else {
      result.push(block);
    }
  }

  return result;
}

/**
 * Try to split concatenated list items from a single paragraph.
 * Returns null if the text doesn't match list patterns.
 */
function splitConcatenatedList(text: string): string[] | null {
  // Pattern 1: Vietnamese list items starting with "Bạn" + verb
  // e.g., "Bạn cần XBạn cần YBạn làm Z"
  const vietPatterns = [
    /Bạn\s+(?:cần|nên|muốn|đang|làm|thích|có|thực|giải|viết|dùng|chọn|tìm|sử dụng)/g,
  ];

  // Pattern 2: items starting with common prefixes
  const generalPatterns = [
    /(?:^|\s)(?:[\-\•]?\s*(?:Bạn|Nó|Điều|Vấn đề|Lợi thế|Nhược điểm|Ưu|Khuyết))/g,
  ];

  const allPatterns = [...vietPatterns, ...generalPatterns];

  for (const pattern of allPatterns) {
    const matches = [...text.matchAll(pattern)];
    if (matches.length >= 2) {
      // Split at each match position
      const items: string[] = [];
      let lastEnd = 0;

      for (let k = 0; k < matches.length; k++) {
        const matchStart = matches[k].index!;
        if (matchStart > lastEnd) {
          const segment = text.slice(lastEnd, matchStart).trim();
          if (segment) items.push(segment);
        }
        lastEnd = matchStart;
      }
      // Add the last segment
      const lastSegment = text.slice(lastEnd).trim();
      if (lastSegment) items.push(lastSegment);

      if (items.length >= 2) {
        return items;
      }
    }
  }

  return null;
}
