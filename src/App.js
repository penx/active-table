import React, { useContext } from "react";

import "./styles.css";

import * as HoverTable from "./HoverTable";
import {
  StyledTable,
  StyledTableBody,
  StyledCell,
  StyledRow,
  Point
} from "./styles";

const MyCell = props => (
  <HoverTable.Cell {...props} render={props => <InnerCell {...props} />}>
    <MyPoint />
  </HoverTable.Cell>
);

const InnerCell = props => {
  const { isActive, isActiveColumn } = useContext(
    HoverTable.IsActiveCellContext
  );
  return (
    <StyledCell
      isActive={isActive}
      isActiveColumn={isActiveColumn}
      {...props}
    />
  );
};

const MyPoint = () => {
  const { isActive } = useContext(HoverTable.IsActiveCellContext);
  return <Point isActive={isActive} />;
};

const MemoStyledRow = React.memo(StyledRow);

const RowOuter = React.memo(({ id, onMouseEnter, children }) => {
  const { activeRow } = useContext(HoverTable.TableContext);
  const isActiveRow = id === activeRow; /*TODO: use rowcontext for this?*/

  return (
    <MemoStyledRow
      isActiveRow={isActiveRow}
      onMouseEnter={onMouseEnter}
      children={children}
    />
  );
});

const Row = props => (
  <HoverTable.Row {...props} render={props => <RowOuter {...props} />} />
);

const Table = props => (
  <StyledTable>
    <StyledTableBody {...props} />
  </StyledTable>
);

export default function App() {
  return (
    <div className="App">
      Hover over a cell
      <HoverTable.default>
        <div>
          <HoverTable.TableContext.Consumer>
            {({activeColumn, activeRow}) => <>{activeColumn}, {activeRow}</>}
          </HoverTable.TableContext.Consumer>
        </div>
        <Table>
          <Row id="row-one">
            <MyCell columnId="column-one" />
            <MyCell columnId="column-two" />
            <MyCell columnId="column-three" />
            <MyCell columnId="column-four" />
            <MyCell columnId="column-five" />
          </Row>
          <Row id="row-two">
            <MyCell columnId="column-one" />
            <MyCell columnId="column-two" />
            <MyCell columnId="column-three" />
            <MyCell columnId="column-four" />
            <MyCell columnId="column-five" />
          </Row>
          <Row id="row-three">
            <MyCell columnId="column-one" />
            <MyCell columnId="column-two" />
            <MyCell columnId="column-three" />
            <MyCell columnId="column-four" />
            <MyCell columnId="column-five" />
          </Row>
          <Row id="row-four">
            <MyCell columnId="column-one" />
            <MyCell columnId="column-two" />
            <MyCell columnId="column-three" />
            <MyCell columnId="column-four" />
            <MyCell columnId="column-five" />
          </Row>
        </Table>
      </HoverTable.default>
    </div>
  );
}
