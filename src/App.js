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

const ActiveCell = props => {
  const { isActive, isActiveColumn } = useContext(
    HoverTable.IsActiveCellContext
  );
  return (
    <StyledCell
      isActive={isActive}
      isActiveColumn={isActiveColumn}
      {...props}
    >
      <Point isActive={isActive} />
    </StyledCell>
  );
};

const ActiveRow = props => {
  const isActiveRow = useContext(HoverTable.IsActiveRowContext);

  return (
    <StyledRow
      isActiveRow={isActiveRow}
      {...props}
    />
  );
};

const CustomCell = props => (
  <HoverTable.Cell {...props} render={props => <ActiveCell {...props} />} />
);

const CustomRow = props => (
  <HoverTable.Row {...props} render={props => <ActiveRow {...props} />} />
);

const CustomTable = props => (
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
            {({ activeColumn, activeRow }) => (
              <>
                {activeColumn}, {activeRow}
              </>
            )}
          </HoverTable.TableContext.Consumer>
        </div>
        <CustomTable>
          <CustomRow id="row-one">
            <CustomCell columnId="column-one" />
            <CustomCell columnId="column-two" />
            <CustomCell columnId="column-three" />
            <CustomCell columnId="column-four" />
            <CustomCell columnId="column-five" />
          </CustomRow>
          <CustomRow id="row-two">
            <CustomCell columnId="column-one" />
            <CustomCell columnId="column-two" />
            <CustomCell columnId="column-three" />
            <CustomCell columnId="column-four" />
            <CustomCell columnId="column-five" />
          </CustomRow>
          <CustomRow id="row-three">
            <CustomCell columnId="column-one" />
            <CustomCell columnId="column-two" />
            <CustomCell columnId="column-three" />
            <CustomCell columnId="column-four" />
            <CustomCell columnId="column-five" />
          </CustomRow>
          <CustomRow id="row-four">
            <CustomCell columnId="column-one" />
            <CustomCell columnId="column-two" />
            <CustomCell columnId="column-three" />
            <CustomCell columnId="column-four" />
            <CustomCell columnId="column-five" />
          </CustomRow>
        </CustomTable>
      </HoverTable.default>
    </div>
  );
}
