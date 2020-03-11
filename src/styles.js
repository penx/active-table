import React from "react";
import styled from "styled-components";

export const StyledTable = styled.table`
  background: black;
  padding: 20px;
`;

export const StyledTableBody = styled.tbody``;

const ROW_BACKGROUND_HEIGHT = 32;
const MAX_CIRCLE_DIAMETER = ROW_BACKGROUND_HEIGHT * 4;

const SVG_BOUNDING_WIDTH = MAX_CIRCLE_DIAMETER;
const SVG_BOUNDING_HEIGHT = MAX_CIRCLE_DIAMETER;

export const Point = ({ isActive }) => (
  <svg
    style={{
      position: "relative"
    }}
    width={SVG_BOUNDING_WIDTH}
    height={SVG_BOUNDING_HEIGHT}
    viewBox={`0 0 ${SVG_BOUNDING_WIDTH} ${SVG_BOUNDING_HEIGHT}`}
  >
    <circle
      cx={SVG_BOUNDING_WIDTH / 2}
      cy={SVG_BOUNDING_HEIGHT / 2}
      r={ROW_BACKGROUND_HEIGHT}
      fill={isActive ? "rgba(255, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}
    />
    <circle
      cx={SVG_BOUNDING_WIDTH / 2}
      cy={SVG_BOUNDING_HEIGHT / 2}
      r={ROW_BACKGROUND_HEIGHT / 2}
      fill="rgba(255, 255, 255, 1)"
    />
  </svg>
);

export const StyledRow = styled.tr`
  text-align: left;
  display: block;
  position: relative;
  height: ${MAX_CIRCLE_DIAMETER}px;
  margin: 0;
  padding: 0;
  border: none;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: ${MAX_CIRCLE_DIAMETER / 2 - ROW_BACKGROUND_HEIGHT / 2}px;
    left: ${MAX_CIRCLE_DIAMETER / 2 - ROW_BACKGROUND_HEIGHT / 2}px;
    right: ${MAX_CIRCLE_DIAMETER / 2 - ROW_BACKGROUND_HEIGHT / 2}px;
    background-color: #333;
    border-radius: ${ROW_BACKGROUND_HEIGHT / 2}px;
    border: 3px solid grey;
    height: ${ROW_BACKGROUND_HEIGHT}px;
    border-color: ${props =>
      props.isActiveRow ? "rgba(255, 0, 0, 1)" : "grey"};
  }
`;

export const StyledCell = styled.td`
  display: inline-block;
  position: relative;
  text-align: center;
  padding: 0;
  height: ${SVG_BOUNDING_HEIGHT}px;
  z-index: 2;
  ${StyledRow}:not(:last-child) &::before {
    content: "";
    position: absolute;
    top: ${SVG_BOUNDING_HEIGHT / 2}px;
    height: ${SVG_BOUNDING_HEIGHT}px;
    left: calc(50% - 1px);
    border-left: 2px dashed red;
    z-index: 0;
    border-color: ${props => (props.isActiveColumn ? "red" : "grey")};
  }
`;
