import React, { useContext, useCallback } from "react";

import * as ActiveTable from "./ActiveTable";

export const Row = ({ id, children, render }) => {
  const { setActiveRow } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveRow(id);
  }, [setActiveRow, id]);

  return <ActiveTable.Row
    id={id}
    onMouseEnter={onMouseEnter}
    children={children}
    render={render}
  />;
};

export const Cell = ({ columnId, children, render }) => {
  const { setActiveColumn } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveColumn(columnId);
  }, [setActiveColumn, columnId]);

  return <ActiveTable.Cell
    columnId={columnId}
    children={children}
    onMouseEnter={onMouseEnter}
    render={render}
  />;
};

export * from "./ActiveTable";

export default ActiveTable.default;
