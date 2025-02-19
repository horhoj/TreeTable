import { TreeItem, treeMosaicType, TreeViewItem } from './treeTypes';
import { getUUID } from '~/utils/getUUID';

// export const DATA_VIEW_MOCK: TreeViewItem[] = [
//   {
//     treeMosaic: [treeMosaicType.start],
//     isChild: true,
//     data: { id: getUUID(), name: 'name 1', count: 1, sum: 2 },
//   },

//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.start],
//     isChild: true,
//     data: { id: getUUID(), name: 'name 11', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.line, treeMosaicType.start],
//     isChild: false,
//     data: { id: getUUID(), name: 'name 111', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.line, treeMosaicType.end],
//     isChild: false,

//     data: { id: getUUID(), name: 'name 112', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.start],
//     isChild: false,
//     data: { id: getUUID(), name: 'name 12', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.end],
//     isChild: true,
//     data: { id: getUUID(), name: 'name 13', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.space, treeMosaicType.start],
//     isChild: false,
//     data: { id: getUUID(), name: 'name 131', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.line, treeMosaicType.space, treeMosaicType.end],
//     isChild: false,
//     data: { id: getUUID(), name: 'name 132', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.end],
//     isChild: true,

//     data: { id: getUUID(), name: 'name 2', count: 1, sum: 2 },
//   },
//   {
//     treeMosaic: [treeMosaicType.space, treeMosaicType.end],
//     isChild: false,
//     data: { id: getUUID(), name: 'name 21', count: 1, sum: 2 },
//   },
// ];

const makeTreeNode = (n: number, children?: TreeItem[]): TreeItem => ({
  id: `id_${n}___${getUUID()}`,
  name: `name_${n}`,
  count: n * 10,
  sum: n * 100,
  children,
});

export const tree_mock: TreeItem[] = [
  makeTreeNode(1, [
    makeTreeNode(2, [
      makeTreeNode(777),
      makeTreeNode(3, [makeTreeNode(16, [makeTreeNode(17, [makeTreeNode(18)])])]),
      makeTreeNode(555),
    ]),
    makeTreeNode(15),
    makeTreeNode(26),
  ]),
  makeTreeNode(5, [
    makeTreeNode(15, [makeTreeNode(3, [makeTreeNode(16, [makeTreeNode(17, [makeTreeNode(18)])])])]),
    makeTreeNode(3, [makeTreeNode(16, [makeTreeNode(17, [makeTreeNode(18)])])]),
  ]),
  makeTreeNode(5, [makeTreeNode(15)]),
];

interface StackItem {
  treeNode: TreeItem;
  level: number;
  treeMosaic: treeMosaicType[];
  listIdx: number;
  listLength: number;
  isParentClose: boolean;
}

export const makeDataView = ({ tree }: { tree: TreeItem[] }): TreeViewItem[] => {
  const result: TreeViewItem[] = [];

  // const

  // Используем стек (LIFO) вместо очереди (FIFO)
  const stack: StackItem[] = tree
    .map((treeNode, i) => ({
      level: 0,
      treeNode,
      treeMosaic: [],
      listIdx: i,
      listLength: tree.length,
      isParentClose: false,
    }))
    .reverse(); // Разворачиваем для использования с pop()

  while (stack.length > 0) {
    const stackItem = stack.pop(); // Берем элемент с конца (O(1))
    if (stackItem) {
      const { children, ...data } = stackItem.treeNode;
      let currentTreeMosaicItem = treeMosaicType.start;

      if (stackItem.listIdx === stackItem.listLength - 1) {
        currentTreeMosaicItem = treeMosaicType.end;
      }

      // Избегаем лишнего копирования массива, изменяем его на месте
      const treeMosaic = stackItem.treeMosaic.slice();
      if (treeMosaic.length > 0) {
        treeMosaic[treeMosaic.length - 1] = stackItem.isParentClose ? treeMosaicType.space : treeMosaicType.line;
      }
      treeMosaic.push(currentTreeMosaicItem);

      const viewItem: TreeViewItem = {
        data,
        isChild: Boolean(children),
        treeMosaic,
      };
      result.push(viewItem);

      if (children) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push({
            treeNode: children[i],
            level: stackItem.level + 1,
            treeMosaic,
            listIdx: i,
            listLength: children.length,
            isParentClose: stackItem.listIdx === stackItem.listLength - 1,
          });
        }
      }
    }
  }

  return result;
};
