import React, { useContext, useCallback } from "react";

import * as ActiveTable from "./ActiveTable";

export const Row = ({ id, ...props }) => {
  const { setActiveRow } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveRow(id);
  }, [setActiveRow, id]);

  return <ActiveTable.Row
    id={id}
    onMouseEnter={onMouseEnter}
    {...props}
  />;
};

export const Cell = ({ columnId, ...props }) => {
  const { setActiveColumn } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveColumn(columnId);
  }, [setActiveColumn, columnId]);

  return <ActiveTable.Cell
    columnId={columnId}
    onMouseEnter={onMouseEnter}
    {...props}
  />;
};

export * from "./ActiveTable";

export default ActiveTable.default;
