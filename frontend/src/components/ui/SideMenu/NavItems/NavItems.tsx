import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
} from '@minoru/react-dnd-treeview';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classes from './NavItems.module.scss';
import { Link } from 'react-router-dom';
import { generateMenu } from '../../../../utils/menuList';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import { fetchOffices } from '../../../../store/actions/officeActions';
import { defaultNavigation } from '../nav_data';

const NavItems = () => {
  const dispatch = useAppDispatch();
  const [treeData, setTreeData] = useState<NodeModel[]>(defaultNavigation);
  const { offices, currentOffice } = useAppSelector((state) => state.office);

  useEffect(() => {
    dispatch(fetchOffices());
  }, [dispatch]);

  useEffect(() => {
    setTreeData(generateMenu(offices));
  }, [offices]);

  return (
    <div className={classes.Container}>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginInlineStart: depth * 10 }}>
              {node.data ? (
                <div className={classes.Link}>
                  <Link
                    to={node.data as unknown as string}
                    state={node.text}
                    key={node.id}
                  >
                    {currentOffice?.name === node.text ? (
                      <div className={classes.Active}>{node.text}</div>
                    ) : (
                      node.text
                    )}
                  </Link>
                </div>
              ) : (
                node.text
              )}
              {node.droppable && (
                <span onClick={onToggle}>
                  {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </span>
              )}
            </div>
          )}
          onDrop={() => void 0}
        />
      </DndProvider>
    </div>
  );
};

export default NavItems;
