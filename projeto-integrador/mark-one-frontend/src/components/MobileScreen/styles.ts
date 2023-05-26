import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: var(--background);

  > img {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`
export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */

  #logo {
    position: absolute;
    top: 2.5rem;
    right: 0;

    padding: 0 10%;

    z-index: 999;

    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  #center-image {
    z-index: 999;
    position: absolute;
    top: calc(100% / 3);

    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      width: 60%;
      object-fit: contain;
    }
  }

  #text {
    position: absolute;
    z-index: 999;

    font-family: "Epilogue";
    font-size: 1.2rem;
    color: var(--background);
    line-height: 1.5rem;

    max-width: 60%;

    bottom: 8rem;
    left: 2rem;

    span {
      display: inline-block;
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }
`
