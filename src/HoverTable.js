import React, { useContext, useCallback } from "react";

import * as ActiveTable from "./ActiveTable";

const useSetOnMouseEnter = (value, set) => {
  const handleMouseEnter = useCallback(() => {
    set(value);
  }, [set, value]);

  return {
    onMouseEnter: handleMouseEnter
  };
}

export const Row = ({ id, children, render }) => {
  const { setActiveRow } = useContext(ActiveTable.SetTableContext);
  const { onMouseEnter } = useSetOnMouseEnter(id, setActiveRow);

  return <ActiveTable.Row
    id={id}
    onMouseEnter={onMouseEnter}
    children={children}
    render={render}
  />;
};

export const Cell = ({ columnId, children, render }) => {
  const { setActiveColumn } = useContext(ActiveTable.SetTableContext);
  const { onMouseEnter } = useSetOnMouseEnter(columnId, setActiveColumn);

  return <ActiveTable.Cell
    columnId={columnId}
    children={children}
    onMouseEnter={onMouseEnter}
    render={render}
  />;
};

export * from "./ActiveTable";

export default ActiveTable.default;
