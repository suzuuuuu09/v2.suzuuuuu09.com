import { visit } from 'unist-util-visit';

export default function rehypeCaption() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      // <em>[!image]text</em> か <em>[!table]text</em> を探す
      if (node.tagName !== 'em' || !node.children || node.children.length === 0) {
        return;
      }

      // emタグの中身がテキストノードのみかチェックする
      const textNode = node.children[0];
      if (textNode.type !== 'text' || !textNode.value) {
        return;
      }

      const captionRegex = /\[!(image|table)\]\s*(.*)$/;
      const match = captionRegex.exec(textNode.value.trim());

      if (!match) {
        return;
      }

      const type = match[1] as "image" | "table"; // image か table
      const text = match[2].trim();

      // mdiあいこん
      const iconSvg = mdiIcon(type);

      // <div class="caption"><svg>...</svg><span>text</span></div> に置き換え
      const captionNode = {
        type: 'element',
        tagName: 'div',
        properties: { className: [`caption caption-${type}`], },
        children: [
          {
            type: 'raw',
            value: iconSvg
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {},
            children: [{ type: 'text', value: text }]
          }
        ]
      };

      if (index !== undefined && parent) {
        parent.children[index] = captionNode;
      }
    });
  };
}

export function mdiIcon(type: "image" | "table"): string {
  return type === 'image'
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 13.5l2.5 3l3.5-4.5l4.5 6H5m16 1V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"></path></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 4v4h6V8zm8 0v4h6V8zM5 14v4h6v-4zm8 0v4h6v-4z"></path></svg>';
}