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
        <select className="pgSelector" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
          <option className="pgSelectorOpt" value="10">
            10
          </option>
          <option className="pgSelectorOpt" value="25">
            25
          </option>
          <option className="pgSelectorOpt" value="50">
            50
          </option>
          <option className="pgSelectorOpt" value="100">
            100
          </option>
          <option className="pgSelectorOpt" value="500">
            500
          </option>
        </select>
        resultados
      </div>
    </Container>
  )
}
