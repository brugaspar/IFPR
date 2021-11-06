import React from "react"
import { FaSearch } from "react-icons/fa"

import { Container } from "./styles"

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ ...rest }: SearchBarProps) {
    return (
        <Container>
            <div className="search">
                <div className="searchInputs">
                    <input type="text" {...rest}/>
                    <div className="searchIcon"> 
                        <FaSearch/> 
                    </div>
                </div>
            </div>
        </Container>
    )
}