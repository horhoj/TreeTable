import { tree_mock } from './treeHelpers';
import { TreeTable } from './TreeTable';

export function Tree() {
  return <TreeTable tree={tree_mock} />;
}
