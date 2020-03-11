import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, cleanup } from "@testing-library/react";

import * as ActiveTable from "./ActiveTable";

test("does not default column to active", async () => {
  const testMessage = "Column One Selected!";
  const { queryByText } = render(
    <ActiveTable.default>
      <table>
        <tbody>
          <ActiveTable.Row id="row-one">
            <ActiveTable.Cell columnId="column-one">
              <ActiveTable.IsActiveCellContext.Consumer>
                {({ isActiveColumn }) => (
                  <div>{isActiveColumn ? testMessage : ""}</div>
                )}
              </ActiveTable.IsActiveCellContext.Consumer>
            </ActiveTable.Cell>
          </ActiveTable.Row>
        </tbody>
      </table>
    </ActiveTable.default>
  );
  expect(queryByText(testMessage)).toBeNull();
  cleanup();
});

test("sets isActiveColumn after setting activeColumn", async () => {
  const testMessage = "Column One Selected!";
  const buttonText = "Select column one";
  const { getByText, queryByText } = render(
    <ActiveTable.default>
      <div>
        <ActiveTable.SetTableContext.Consumer>
          {({ setActiveColumn, setActiveRow }) => (
            <button
              onClick={() => {
                setActiveColumn("column-one");
              }}
            >
              {buttonText}
            </button>
          )}
        </ActiveTable.SetTableContext.Consumer>
      </div>
      <table>
        <tbody>
          <ActiveTable.Row id="row-one">
            <ActiveTable.Cell columnId="column-one">
              <ActiveTable.IsActiveCellContext.Consumer>
                {({ isActiveColumn }) => (
                  <div>{isActiveColumn ? testMessage : ""}</div>
                )}
              </ActiveTable.IsActiveCellContext.Consumer>
            </ActiveTable.Cell>
          </ActiveTable.Row>
        </tbody>
      </table>
    </ActiveTable.default>
  );
  expect(queryByText(testMessage)).toBeNull();
  fireEvent.click(getByText(buttonText));
  expect(getByText(testMessage)).toBeInTheDocument();
  cleanup();
});
