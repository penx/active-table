import React, { useContext, useMemo, useCallback } from "react";

import * as ActiveTable from "./ActiveTable";

function useSetOnEnter(value, set) {
  const handleMouseEnter = useCallback(() => {
    set(value);
  }, [set, value]);

  return {
    onMouseEnter: handleMouseEnter
  };
}

export const Row = ({ id, children, render }) => {
  const { setActiveRow } = useContext(ActiveTable.SetTableContext);
  const { onMouseEnter } = useSetOnEnter(id, setActiveRow);

  return useMemo(
    () => (
      <ActiveTable.Row
        id={id}
        onMouseEnter={onMouseEnter}
        children={children}
        render={render}
      />
    ),
    [id, children, onMouseEnter, render]
  );
};

export const Cell = ({ columnId, children, render }) => {
  const { setActiveColumn } = useContext(ActiveTable.SetTableContext);
  const { onMouseEnter } = useSetOnEnter(columnId, setActiveColumn);

  return useMemo(
    () => (
      <ActiveTable.Cell
        columnId={columnId}
        children={children}
        onMouseEnter={onMouseEnter}
        render={render}
      />
    ),
    [columnId, children, onMouseEnter, render]
  );
};

export * from "./ActiveTable";

export default ActiveTable.default;
