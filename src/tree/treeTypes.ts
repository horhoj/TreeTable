export enum treeMosaicType {
  line = '|',
  start = '+',
  end = '_',
  space = '.',
}

export interface TreeItem {
  id: string;
  name: string;
  count: number;
  sum: number;
  children?: TreeItem[];
}

export interface TreeViewItem {
  treeMosaic: treeMosaicType[];
  isChild: boolean;
  data: Omit<TreeItem, 'children'>;
}
