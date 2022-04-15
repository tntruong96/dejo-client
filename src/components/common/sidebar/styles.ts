import styled from "styled-components";


export const SidebarContainer = styled.aside`
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-300px);
    transition: transform .5s ease-in;
    
    &.open{
        transform: translateX(0px);
    }

`

export const NavContainer = styled.nav`

`

export const NavElement = styled.li`

`