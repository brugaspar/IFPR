import styled from "styled-components"

export const Container = styled.div`
  
   position: relative;
   height: 2.5rem;
   width: 20rem;
   background: var(--shape-dark);
   overflow: hidden;
   border-radius: 0.25rem;

   /* border:1px solid red; */

  .searchInputs {
    display: flex;
  }

  .search input {
    background: var(--shape-dark);
    border: 0;   
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 1.2rem;
    padding: 1rem;
    height: 2.5rem;
    width: 17.5rem;
    color:white;

    /* border:1px solid green; */
  } 

  .searchIcon {
    height: 2rem;
    width: 2.12rem;
    display: grid;
    margin-top:0.2rem;
    place-items: center;
    color:grey;
    float:right;
    /* border:1px solid blue; */
  }

  input:focus {
    outline: none;
  }

  .searchIcon svg {
    font-size: 1.7rem;
  }

  #clearBtn {
    cursor: pointer;
  }

 
`
