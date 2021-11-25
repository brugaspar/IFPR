import React from "react";
import { Container } from "./styles";

export const PaginationSelector = ({itensPerPage, setItensPerPage}) =>{
    return(
      <Container>
        <div> 
          Exibir 
          <select className="pgSelector" value={itensPerPage} onChange={(e)=> setItensPerPage(Number(e.target.value))}>
            <option className="pgSelectorOpt" value="10">10</option>
            <option className="pgSelectorOpt" value="25">25</option>
            <option className="pgSelectorOpt" value="50">50</option>
            <option className="pgSelectorOpt" value="100">100</option>
            <option className="pgSelectorOpt" value="500">500</option>
          </select>  
          resultados
        </div>
      </Container>
    )
}
