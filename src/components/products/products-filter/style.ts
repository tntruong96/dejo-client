import styled from "styled-components";

export const ProductFilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FilterCategory = styled.ul`
  display: flex;
  padding: 0 20px;
  /* justify-content: space-evenly; */
  overflow-x: scroll;
  /* overflow-wrap: normal; */

  /* hide scroll bar */
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  /* align-items: center; */
`;

export const FilterCategoryItem = styled.li`
  display: inline-block;
  word-wrap: normal;
  white-space: nowrap;
  word-break: break-word;
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  /* border-radius: .75rem; */
  border: 1px solid gray;

  &.active {
    background-color: #333;
    color: #f7f7f7;
  }
`;
