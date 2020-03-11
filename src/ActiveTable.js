import React, { useContext, createContext, useState, useMemo } from "react";

export const TableContext = createContext({
  activeRow: null,
  activeColumn: null
});

export const SetTableContext = createContext(() => {});

export const RowIdContext = createContext(null);
export const IsActiveCellContext = createContext({
  isActiveColumn: false,
  isActive: false
});

const SetTableProvider = React.memo(
  ({ setActiveRow, setActiveColumn, children }) => (
    <SetTableContext.Provider
      value={{ setActiveColumn, setActiveRow }} //setActiveRow
      children={children}
    />
  )
);

const TableProvider = React.memo(
  ({ activeRow, activeColumn, setActiveRow, setActiveColumn, children }) => (
    <TableContext.Provider value={{ activeRow, activeColumn }}>
      <SetTableProvider
        setActiveRow={setActiveRow}
        setActiveColumn={setActiveColumn}
        children={children}
      />
    </TableContext.Provider>
  )
);

export const Table = ({ children }) => {
  const [activeRow, setActiveRow] = useState();
  const [activeColumn, setActiveColumn] = useState();
  return (
    <TableProvider
      activeRow={activeRow}
      activeColumn={activeColumn}
      setActiveRow={setActiveRow}
      setActiveColumn={setActiveColumn}
      children={children}
    />
  );
};

export const Row = React.memo(
  ({
    id,
    onMouseEnter,
    children,
    render = ({ onMouseEnter, children }) => (
      <tr onMouseEnter={onMouseEnter} children={children} />
    )
  }) => {
    return (
      <RowIdContext.Provider value={id}>
        {render({ onMouseEnter, children, id })}
      </RowIdContext.Provider>
    );
  }
);

export const Cell = ({
  columnId,
  children,
  onMouseEnter,
  render = ({ children, onMouseEnter }) => (
    <td children={children} onMouseEnter={onMouseEnter} />
  )
}) => {
  const rowId = useContext(RowIdContext);
  const { activeRow, activeColumn } = useContext(TableContext);
  const isActiveColumn = columnId === activeColumn;
  const isActive = rowId === activeRow && columnId === activeColumn;
  return useMemo(
    () => (
      <IsActiveCellContext.Provider
        value={{
          isActiveColumn,
          isActive
        }}
      >
        {render({ children, onMouseEnter })}
      </IsActiveCellContext.Provider>
    ),
    [isActiveColumn, isActive, children, onMouseEnter, render]
  );
};

export default Table;
