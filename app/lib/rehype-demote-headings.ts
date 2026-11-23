type HastNode = {
  tagName?: string;
  children?: HastNode[];
};

// ページの h1 は作品名なので、本文の見出しは 1 段下げて出力する
const demoteHeadings = (node: HastNode) => {
  const level = /^h([1-5])$/.exec(node.tagName ?? "")?.[1];
  if (level) node.tagName = `h${Number(level) + 1}`;
  node.children?.forEach(demoteHeadings);
};

const rehypeDemoteHeadings = () => demoteHeadings;

export default rehypeDemoteHeadings;
