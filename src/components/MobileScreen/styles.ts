import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import { darken, transparentize } from "polished"

export const Container = styled.div`
    position:absolute;   
    overflow:hidden;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #121214;
    z-index:-2;

    > img {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        width:100%;
        z-index: -1;  
        filter: brightness(70%); 
    }  
  
`
export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 7rem;
    padding: 8%;

    #divLogo{
        position:fixed;
        width:19rem;
        height:8rem;
        margin-top:15%;
        z-index:999;

        > img {       
            height: 100%;
            width:100%;
        }  
    }   

    #divText{
        position:relative;
        width:19rem;
        height:20%;
        margin-top:70%;
        color:white;
        z-index:999;
        font-family: "Mukta";
        text-align:center;

        p{
           font-size:1.5rem; 
        }        
    }
    
    #divImgs{
        position:fixed;
        width:14rem;
        height:auto;
        margin-top:22rem;
        margin-left:2.5rem;
        color:white;
        z-index:999;

        .downloadImage{
            width:100%;
            height:100%;
            filter: grayscale(100%);
        }
    }
  
`