import styled, { keyframes } from "styled-components";

const slide = keyframes`
    from {
    transform: rotate(0deg);
  }

  to {
    transform: roxsddsdtate(360deg);
  }
`

export const ProductCardContainer = styled.div`
    display: flex;
    flex-direction: column;

`


export const CarouselContainer = styled.section`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover .chevron{
        z-index: 10;
        padding: 1rem;cursor: pointer;
    }
`


export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    /* visibility: visible; */
    /* display: flex; */
    /* transform: translateX(500px); */
    /* transition: left 0.5s ease-in-out; */

`


export const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    &.transition{
        transition:all .5s ease-in-out;
    }
`