import classNames from 'classnames';
import { useMemo } from 'react';
import { TreeMosaicElement } from './TreeMosaicElement';
import { TreeItem, TreeViewItem } from './treeTypes';
import { makeDataView } from './treeHelpers';

interface TreeTableProps {
  tree: TreeItem[];
}

export function TreeTable({ tree }: TreeTableProps) {
  const view = useMemo(() => makeDataView({ tree }), [tree]);
  return (
    <div className={''}>
      <table className={'w-full'}>
        <thead>
          <tr className={'h-14 bg-slate-200 '}>
            <td className={'w-px'}>Уровень</td>
            <td>Наименование</td>
            <td>Кол-во</td>
            <td>Сумма</td>
          </tr>
        </thead>
        <tbody>
          {view.map((el, i) => (
            <tr key={el.data.id} className={'shadow-[0_1px_0px_0px_rgba(0,0,0,0.25)]'}>
              <td
                className={classNames(
                  'h-10 py-0 pl-0 pr-5 flex relative',
                  i === 3 && 'h-20',
                  i === 4 && 'h-32',
                  i === 0 && 'h-48',
                )}
              >
                <TreeMosaicElement mosaicList={el.treeMosaic} name={el.data.name} isChild={el.isChild} />
              </td>
              <td className={''}>{el.data.name}</td>
              <td>{el.data.count}</td>
              <td>{el.data.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
