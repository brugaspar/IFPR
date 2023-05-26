import React from "react"
import { Container } from "./styles"

type PaginationSelectorProps = {
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
}

export const PaginationSelector = ({ itemsPerPage, setItemsPerPage }: PaginationSelectorProps) => {
  return (
    <Container>
      <div>
        Exibir
        <select className="pagination-selector" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
          <option className="pagination-selector-option" value="10">
            10
          </option>
          <option className="pagination-selector-option" value="25">
            25
          </option>
          <option className="pagination-selector-option" value="50">
            50
          </option>
          <option className="pagination-selector-option" value="100">
            100
          </option>
          <option className="pagination-selector-option" value="500">
            500
          </option>
        </select>
        resultados
      </div>
    </Container>
  )
}
