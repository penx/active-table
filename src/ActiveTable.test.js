import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";

import * as ActiveTable from "./ActiveTable";

describe("ActiveTable", () => {
  it("does not default column to active", () => {
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
  });

  it("sets isActiveColumn after setting activeColumn", () => {
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
  });

  it("sets isActive on cell after setting activeColumn and activeRow", () => {
    const testMessageColumn = "Column Selected!";
    const testMessageCell = "Cell Selected!";
    const buttonTextColumn = "Select column one";
    const buttonTextRow = "Select row one";
    const { getByText, queryByText } = render(
      <ActiveTable.default>
        <div>
          <ActiveTable.SetTableContext.Consumer>
            {({ setActiveColumn, setActiveRow }) => (
              <>
                <button
                  onClick={() => {
                    setActiveColumn("column-one");
                  }}
                >
                  {buttonTextColumn}
                </button>
                <button
                  onClick={() => {
                    setActiveRow("row-one");
                  }}
                >
                  {buttonTextRow}
                </button>
              </>
            )}
          </ActiveTable.SetTableContext.Consumer>
        </div>
        <table>
          <tbody>
            <ActiveTable.Row id="row-one">
              <ActiveTable.Cell columnId="column-one">
                <ActiveTable.IsActiveCellContext.Consumer>
                  {({ isActiveColumn, isActive }) => (
                    <>
                      <div>{isActiveColumn ? testMessageColumn : ""}</div>
                      <div>{isActive ? testMessageCell : ""}</div>
                    </>
                  )}
                </ActiveTable.IsActiveCellContext.Consumer>
              </ActiveTable.Cell>
            </ActiveTable.Row>
          </tbody>
        </table>
      </ActiveTable.default>
    );
    expect(queryByText(testMessageColumn)).toBeNull();
    fireEvent.click(getByText(buttonTextColumn));
    fireEvent.click(getByText(buttonTextRow));
    expect(getByText(testMessageCell)).toBeInTheDocument();
  });
});
