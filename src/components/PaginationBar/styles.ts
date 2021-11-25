import styled from "styled-components"
import { darken, transparentize } from "polished"

export const Container = styled.div`
    float:right;
    /* left:0; */
    .paginationBar_div{
        width:auto;
        height:2rem;
        float:right;
        margin-right:3rem;
        .paginationBar_bttn{
            align-content:center;
            height:100%;
            width:1.2rem;
            float: left;
            font-size:1rem;
            margin:0.1rem;
            border: none;
            color:darkgray;
            background: var(--shape-dark);

            &:hover {
                filter: brightness(0.8);
            }
           
          
        }
        svg{
            float: left;
            margin-top:0.5rem;
           
        }
    }
`
