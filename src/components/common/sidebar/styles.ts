import styled from "styled-components";


export const SidebarMask = styled.div`
    width: 100vw;
    height: 100vh;
    /* background-color: aqua; */
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
`

export const SidebarContainer = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-300px);
  transition: transform 0.5s ease-in;
  z-index: 101;

  &.open {
    transform: translateX(0px);
  }

  & .seletected-custome {
    background-color: #f7f7f7;
  }

  .ant-menu-item-selected {
    background-color: #333 !important;

    .ant-menu-title-content a {
      color: #fff !important;
    }
  }
`;

export const SidebarContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 2;
`

export const NavContainer = styled.nav``;

export const NavElement = styled.li``;
