import styled from "styled-components";

export const NavLink = styled.li`
  &.active {
    text-decoration: underline;
    font-weight: 800;
    /* font-size: 20px; */
  }
`;

export const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: #fff;
`;

export const BurgerContainer = styled.div`
  top: 15px;
  left : 30px ;
  .nav-icon {
    width: 30px;
    height: 30px;
    position: relative;
    margin: 10px auto;

    & span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background: #393e46;
      border-radius: 9px;
      opacity: 1;
      left: 0;
    }

    & span:nth-child(1) {
      top: 0px;
    }

    & span:nth-child(2) {
      top: 10px;
    }

    & span:nth-child(3) {
      top: 20px;
    }
  }
`;
