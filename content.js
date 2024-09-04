// Define constants for the regex pattern
const MAX_HEADING_LENGTH = 7;
const MAX_HEADING_CONTENT_LENGTH = 200;
const MAX_HEADING_UNDERLINE_LENGTH = 200;
const MAX_HTML_HEADING_ATTRIBUTES_LENGTH = 100;
const MAX_LIST_ITEM_LENGTH = 200;
const MAX_NESTED_LIST_ITEMS = 6;
const MAX_LIST_INDENT_SPACES = 7;
const MAX_BLOCKQUOTE_LINE_LENGTH = 200;
const MAX_BLOCKQUOTE_LINES = 15;
const MAX_CODE_BLOCK_LENGTH = 1500;
const MAX_CODE_LANGUAGE_LENGTH = 20;
const MAX_INDENTED_CODE_LINES = 20;
const MAX_TABLE_CELL_LENGTH = 200;
const MAX_TABLE_ROWS = 20;
const MAX_HTML_TABLE_LENGTH = 2000;
const MIN_HORIZONTAL_RULE_LENGTH = 3;
const MAX_SENTENCE_LENGTH = 400;
const MAX_QUOTED_TEXT_LENGTH = 300;
const MAX_PARENTHETICAL_CONTENT_LENGTH = 200;
const MAX_NESTED_PARENTHESES = 5;
const MAX_MATH_INLINE_LENGTH = 100;
const MAX_MATH_BLOCK_LENGTH = 500;
const MAX_PARAGRAPH_LENGTH = 1000;
const MAX_STANDALONE_LINE_LENGTH = 800;
const MAX_HTML_TAG_ATTRIBUTES_LENGTH = 100;
const MAX_HTML_TAG_CONTENT_LENGTH = 1000;
const LOOKAHEAD_RANGE = 100;

// Define the regex pattern
const chunkRegex = new RegExp(

    "(" +
    // 1. Headings (Setext-style, Markdown, and HTML-style, with length constraints)
    `(?:^(?:[#*=-]{1,${MAX_HEADING_LENGTH}}|\\w[^\\r\\n]{0,${MAX_HEADING_CONTENT_LENGTH}}\\r?\\n[-=]{2,${MAX_HEADING_UNDERLINE_LENGTH}}|<h[1-6][^>]{0,${MAX_HTML_HEADING_ATTRIBUTES_LENGTH}}>)[^\\r\\n]{1,${MAX_HEADING_CONTENT_LENGTH}}(?:</h[1-6]>)?(?:\\r?\\n|$))` +
    "|" +
    // New pattern for citations
    `(?:\\[[0-9]+\\][^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}})` +
    "|" +
    // 2. List items (bulleted, numbered, lettered, or task lists, including nested, up to three levels, with length constraints)
    `(?:(?:^|\\r?\\n)[ \\t]{0,3}(?:[-*+•]|\\d{1,3}\\.\\w\\.|\\[[ xX]\\])[ \\t]+(?:(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[\\r\\n]|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))` +
    `(?:(?:\\r?\\n[ \\t]{2,5}(?:[-*+•]|\\d{1,3}\\.\\w\\.|\\[[ xX]\\])[ \\t]+(?:(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[\\r\\n]|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?)))` +
    `{0,${MAX_NESTED_LIST_ITEMS}}(?:\\r?\\n[ \\t]{4,${MAX_LIST_INDENT_SPACES}}(?:[-*+•]|\\d{1,3}\\.\\w\\.|\\[[ xX]\\])[ \\t]+(?:(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[\\r\\n]|$))|(?:\\b[^\\r\\n]{1,${MAX_LIST_ITEM_LENGTH}}\\b(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?)))` +
    `{0,${MAX_NESTED_LIST_ITEMS}})?)` +
    "|" +
    // 3. Block quotes (including nested quotes and citations, up to three levels, with length constraints)
    `(?:(?:^>(?:>|\\s{2,}){0,2}(?:(?:\\b[^\\r\\n]{0,${MAX_BLOCKQUOTE_LINE_LENGTH}}\\b(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:\\b[^\\r\\n]{0,${MAX_BLOCKQUOTE_LINE_LENGTH}}\\b(?=[\\r\\n]|$))|(?:\\b[^\\r\\n]{0,${MAX_BLOCKQUOTE_LINE_LENGTH}}\\b(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))\\r?\\n?){1,${MAX_BLOCKQUOTE_LINES}})` +
    "|" +
    // 4. Code blocks (fenced, indented, or HTML pre/code tags, with length constraints)
    `(?:(?:^|\\r?\\n)(?:\`\`\`|~~~)(?:\\w{0,${MAX_CODE_LANGUAGE_LENGTH}})?\\r?\\n[\\s\\S]{0,${MAX_CODE_BLOCK_LENGTH}}?(?:\`\`\`|~~~)\\r?\\n?` +
    `|(?:(?:^|\\r?\\n)(?: {4}|\\t)[^\\r\\n]{0,${MAX_LIST_ITEM_LENGTH}}(?:\\r?\\n(?: {4}|\\t)[^\\r\\n]{0,${MAX_LIST_ITEM_LENGTH}}){0,${MAX_INDENTED_CODE_LINES}}\\r?\\n?)` +
    `|(?:<pre>(?:<code>)?[\\s\\S]{0,${MAX_CODE_BLOCK_LENGTH}}?(?:</code>)?</pre>))` +
    "|" +
    // 5. Tables (Markdown, grid tables, and HTML tables, with length constraints)
    `(?:(?:^|\\r?\\n)(?:\\|[^\\r\\n]{0,${MAX_TABLE_CELL_LENGTH}}\\|(?:\\r?\\n\\|[-:]{1,${MAX_TABLE_CELL_LENGTH}}\\|){0,1}(?:\\r?\\n\\|[^\\r\\n]{0,${MAX_TABLE_CELL_LENGTH}}\\|){0,${MAX_TABLE_ROWS}}` +
    `|<table>[\\s\\S]{0,${MAX_HTML_TABLE_LENGTH}}?</table>))` +
    "|" +
    // 6. Horizontal rules (Markdown and HTML hr tag)
    `(?:^(?:[-*_]){${MIN_HORIZONTAL_RULE_LENGTH},}\\s*$|<hr\\s*/?>)` +
    "|" +
    // 10. Standalone lines or phrases (including single-line blocks and HTML elements, with length constraints)
    `(?:^(?:<[a-zA-Z][^>]{0,${MAX_HTML_TAG_ATTRIBUTES_LENGTH}}>)?(?:(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?:[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?=[\\r\\n]|$))|(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?=[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))(?:</[a-zA-Z]+>)?(?:\\r?\\n|$))` +
    "|" +
    // 7. Sentences or phrases ending with punctuation (including ellipsis and Unicode punctuation)
    `(?:(?:[^\\r\\n]{1,${MAX_SENTENCE_LENGTH}}(?:[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:[^\\r\\n]{1,${MAX_SENTENCE_LENGTH}}(?=[\\r\\n]|$))|(?:[^\\r\\n]{1,${MAX_SENTENCE_LENGTH}}(?=[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.\\.\\.|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))` +
    "|" +
    // 8. Quoted text, parenthetical phrases, or bracketed content (with length constraints)
    "(?:" +
    `(?<!\\w)\"\"\"[^\"]{0,${MAX_QUOTED_TEXT_LENGTH}}\"\"\"(?!\\w)` +
    `|(?<!\\w)(?:['\"\`'"])[^\\r\\n]{0,${MAX_QUOTED_TEXT_LENGTH}}\\1(?!\\w)` +
    `|\\([^\\r\\n()]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}(?:\\([^\\r\\n()]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}\\)[^\\r\\n()]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}){0,${MAX_NESTED_PARENTHESES}}\\)` +
    `|\\[[^\\r\\n\\[\\]]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}(?:\\[[^\\r\\n\\[\\]]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}\\][^\\r\\n\\[\\]]{0,${MAX_PARENTHETICAL_CONTENT_LENGTH}}){0,${MAX_NESTED_PARENTHESES}}\\]` +
    `|\\$[^\\r\\n$]{0,${MAX_MATH_INLINE_LENGTH}}\\$` +
    `|\`[^\`\\r\\n]{0,${MAX_MATH_INLINE_LENGTH}}\`` +
    ")" +
    "|" +
    // 9. Paragraphs (with length constraints)
    `(?:(?:^|\\r?\\n\\r?\\n)(?:<p>)?(?:(?:[^\\r\\n]{1,${MAX_PARAGRAPH_LENGTH}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:[^\\r\\n]{1,${MAX_PARAGRAPH_LENGTH}}(?=[\\r\\n]|$))|(?:[^\\r\\n]{1,${MAX_PARAGRAPH_LENGTH}}(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))(?:</p>)?(?=\\r?\\n\\r?\\n|$))` +
    "|" +
    // 11. HTML-like tags and their content (including self-closing tags and attributes, with length constraints)
    `(?:<[a-zA-Z][^>]{0,${MAX_HTML_TAG_ATTRIBUTES_LENGTH}}(?:>[\\s\\S]{0,${MAX_HTML_TAG_CONTENT_LENGTH}}?</[a-zA-Z]+>|\\s*/>))` +
    "|" +
    // 12. LaTeX-style math expressions (inline and block, with length constraints)
    `(?:(?:\\$\\$[\\s\\S]{0,${MAX_MATH_BLOCK_LENGTH}}?\\$\\$)|(?:\\$[^\\$\\r\\n]{0,${MAX_MATH_INLINE_LENGTH}}\\$))` +
    "|" +
    // 14. Fallback for any remaining content (with length constraints)
    `(?:(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))|(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?=[\\r\\n]|$))|(?:[^\\r\\n]{1,${MAX_STANDALONE_LINE_LENGTH}}(?=[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?:.{1,${LOOKAHEAD_RANGE}}(?:[.!?…]|\\.{3}|[\\u2026\\u2047-\\u2049]|[\\p{Emoji_Presentation}\\p{Extended_Pictographic}])(?=\\s|$))?))` +
  ")",
  "gmu"
);

function chunkText() {
  const bodyText = document.body.innerText;
  const chunks = bodyText.split(chunkRegex).filter(chunk => chunk.trim() !== '');
  
  const processedChunks = chunks.map(chunk => chunk.trim()).join('\n');
  
  return {
    chunksText: processedChunks,
    chunkCount: chunks.length
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "chunkText") {
    sendResponse(chunkText());
  } else if (request.action === "isReady") {
    sendResponse({ ready: true });
  }
});
