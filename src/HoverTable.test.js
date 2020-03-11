import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";

import * as HoverTable from "./HoverTable";

test("does not default column to active", async () => {
  const cellText = "Hover me!";

  const testMessage = "Column One Selected!";
  const { queryByText, getByText } = render(
    <HoverTable.default>
      <table>
        <tbody>
          <HoverTable.Row id="row-one">
            <HoverTable.Cell columnId="column-one">
              <div>{cellText}</div>
              <HoverTable.IsActiveCellContext.Consumer>
                {({ isActiveColumn }) => (
                  <div>{isActiveColumn ? testMessage : ""}</div>
                )}
              </HoverTable.IsActiveCellContext.Consumer>
            </HoverTable.Cell>
          </HoverTable.Row>
        </tbody>
      </table>
    </HoverTable.default>
  );
  expect(queryByText(testMessage)).toBeNull();
  fireEvent.mouseOver(getByText(cellText));
  expect(queryByText(testMessage)).toBeInTheDocument();
});
