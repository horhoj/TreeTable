import { useMemo } from 'react';
import classNames from 'classnames';
import { treeMosaicType } from './treeTypes';
import { getUUID } from '~/utils/getUUID';

interface TreeMosaicElementProps {
  mosaicList: treeMosaicType[];
  name: string;
  isChild: boolean;
}

export function TreeMosaicElement({ mosaicList, name, isChild }: TreeMosaicElementProps) {
  const mosaicListData = useMemo(() => mosaicList.map((value) => ({ id: getUUID(), value })), [mosaicList]);

  return (
    <>
      <span className={'flex relative h-full'}>
        {mosaicListData.map((el) => (
          <span className={classNames('h-full w-10 p-0 flex justify-center relative')} key={el.id}>
            {el.value === treeMosaicType.line && <span className={'w-0.5 h-full bg-slate-700 flex'} />}

            {el.value === treeMosaicType.start && (
              <>
                <span className={'w-0.5 h-full bg-slate-700 flex absolute'} />
                <span className={'h-0.5 w-1/2 bg-slate-700 flex absolute bottom-1/2 left-1/2'} />
              </>
            )}

            {el.value === treeMosaicType.end && (
              <>
                <span className={'w-0.5 h-1/2 bg-slate-700 flex absolute'} />
                <span className={'h-0.5 w-1/2 bg-slate-700 flex absolute bottom-1/2 left-1/2'} />
              </>
            )}
          </span>
        ))}
      </span>
      <span className={'flex relative h-full w-10 justify-center'}>
        <span className={'h-0.5 w-1/2 bg-slate-700 flex absolute bottom-1/2 left-0'} />
        {isChild && (
          <>
            <span className={'w-0.5 h-1/2 bg-slate-700 bottom-0 flex absolute'} />
          </>
        )}
        <span className={'relative text-white bg-slate-700 h-fit text-nowrap px-2 py-1 text-xs rounded-md my-auto'}>
          {name}
        </span>
      </span>
    </>
  );
}
