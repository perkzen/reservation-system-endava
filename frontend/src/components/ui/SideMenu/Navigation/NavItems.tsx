import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
} from '@minoru/react-dnd-treeview';
import { NavigationData } from '../nav_data';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classes from '../NavItems/NavItems.module.scss';
import { Link } from 'react-router-dom';

const NavItems = () => {
  const [treeData, setTreeData] = useState<NodeModel[]>(NavigationData);

  return (
    <div className={classes.Container}>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginInlineStart: depth * 10 }}>
              {node.data ? (
                <Link to={node.data as unknown as string} key={node.id}>
                  {node.text}
                </Link>
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
