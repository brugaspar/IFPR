import React from "react";
import {FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Container } from "./styles";

export const PaginationBar = ({pages, setCurrentPage}) =>{
    return(
        <Container>
            <div className="paginationBar_div">
                <FaChevronLeft/>           
                {Array.from(Array(pages), 
                (user, index)=>{
                    return <button className="paginationBar_bttn" onClick={(e)=> setCurrentPage(Number(index))}>{index+1}</button>
                })}
                <FaChevronRight/>           
            </div>
        </Container>
    )
}