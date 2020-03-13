import React, { useContext, useCallback } from "react";

import * as ActiveTable from "./ActiveTable";

export const Row = ({ id, children }) => {
  const { setActiveRow } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveRow(id);
  }, [setActiveRow, id]);

  return (
    <ActiveTable.Row id={id}>
      {children({onMouseEnter})}
    </ActiveTable.Row>
  );
};

export const Cell = ({ columnId, children }) => {
  const { setActiveColumn } = useContext(ActiveTable.SetTableContext);
  const onMouseEnter = useCallback(() => {
    setActiveColumn(columnId);
  }, [setActiveColumn, columnId]);

  return (
    <ActiveTable.Cell columnId={columnId} >
      {children({onMouseEnter})}
    </ActiveTable.Cell>
  );
};

export * from "./ActiveTable";

export default ActiveTable.default;
