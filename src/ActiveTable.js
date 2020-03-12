import React, { useContext, createContext, useState, useMemo } from "react";

const TableContext = createContext();
const SetTableContext = createContext();
const RowIdContext = createContext();
const IsActiveRowContext = createContext();
const IsActiveCellContext = createContext();

const SetTableProvider = React.memo(
  ({ setActiveRow, setActiveColumn, children }) => (
    <SetTableContext.Provider
      value={{ setActiveColumn, setActiveRow }}
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

const Table = ({ children }) => {
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

const IsActiveRowProvider = React.memo(({ id, children }) => {
  const { activeRow } = useContext(TableContext);
  const isActiveRow = id === activeRow;
  return useMemo(
    () => (
      <IsActiveRowContext.Provider value={isActiveRow} children={children} />
    ),
    [isActiveRow, children]
  );
});

const Row = React.memo(
  ({ id, render = props => <tr {...props} />, ...props }) => {
    return (
      <RowIdContext.Provider value={id}>
        <IsActiveRowProvider id={id}>
          {render({ id, ...props })}
        </IsActiveRowProvider>
      </RowIdContext.Provider>
    );
  }
);

const IsActiveCellProvider = React.memo(({ children, columnId }) => {
  const rowId = useContext(RowIdContext);
  const { activeRow, activeColumn } = useContext(TableContext);
  const isActiveColumn = columnId === activeColumn;
  const isActive = rowId === activeRow && columnId === activeColumn;
  const context = useMemo(() => ({ isActiveColumn, isActive }), [isActiveColumn, isActive]);
  return (
    <IsActiveCellContext.Provider
      value={context}
    >
      {children}
    </IsActiveCellContext.Provider>
  );
});

const Cell = React.memo(({ columnId, render = props => <td {...props} />, ...props }) => (
  <IsActiveCellProvider columnId={columnId}>
    {render(props)}
  </IsActiveCellProvider>
));

export {
  IsActiveCellContext,
  IsActiveRowContext,
  SetTableContext,
  Cell,
  Row,
  TableContext
};
export default Table;
