import React, { useContext, createContext, useState, useMemo } from "react";

const TableContext = createContext();
const SetTableContext = createContext();
const RowIdContext = createContext();
const IsActiveRowContext = createContext();
const IsActiveCellContext = createContext();

// Optional memo - used as a direct child of another provider
const SetTableProvider = React.memo(
  ({ setActiveRow, setActiveColumn, children }) => (
    <SetTableContext.Provider
      value={{ setActiveColumn, setActiveRow }}
      children={children}
    />
  )
);

const TableProvider = React.memo(
  ({ activeRow, activeColumn, setActiveRow, setActiveColumn, children }) => {
    // Required memo - we want to store a key-value pair in state
    const context = useMemo(() => ({ activeRow, activeColumn }), [activeRow, activeColumn]);
    return <TableContext.Provider value={context}>
      <SetTableProvider
        setActiveRow={setActiveRow}
        setActiveColumn={setActiveColumn}
        children={children}
      />
    </TableContext.Provider>
  }
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

// Optional memo - used as a direct child of another provider
const IsActiveRowProvider = React.memo(({ id, children }) => {
  const { activeRow } = useContext(TableContext);
  const isActiveRow = id === activeRow;
  // Optional memo - state change is on string but we only need to update the provider on boolean
  return useMemo(
    () => (
      <IsActiveRowContext.Provider value={isActiveRow} children={children} />
    ),
    [isActiveRow, children]
  );
});

const Row = ({ id, render = props => <tr {...props} />, ...props }) => {
    return (
      <RowIdContext.Provider value={id}>
        <IsActiveRowProvider id={id}>
          {render({ id, ...props })}
        </IsActiveRowProvider>
      </RowIdContext.Provider>
    );
  }

const IsActiveCellProvider = ({ children, columnId }) => {
  const rowId = useContext(RowIdContext);
  const { activeRow, activeColumn } = useContext(TableContext);
  const isActiveColumn = columnId === activeColumn;
  const isActive = rowId === activeRow && columnId === activeColumn;
  // Required memo - we want to store a key-value pair in state
  const context = useMemo(() => ({ isActiveColumn, isActive }), [isActiveColumn, isActive]);
  return (
    <IsActiveCellContext.Provider
      value={context}
    >
      {children}
    </IsActiveCellContext.Provider>
  );
};

const Cell = ({ columnId, render = props => <td {...props} />, ...props }) => (
  <IsActiveCellProvider columnId={columnId}>
    {render(props)}
  </IsActiveCellProvider>
);

export {
  IsActiveCellContext,
  IsActiveRowContext,
  SetTableContext,
  Cell,
  Row,
  TableContext
};
export default Table;
