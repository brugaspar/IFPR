import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Container } from "./styles"

type PaginationBarProps = {
  pages: number
  setCurrentPage: (page: number) => void
}

export const PaginationBar = ({ pages, setCurrentPage }: PaginationBarProps) => {
  return (
    <Container>
      <div className="paginationBar_div">
        <FaChevronLeft />
        {Array.from(Array(pages), (_, index) => {
          return (
            <button key={index} className="paginationBar_bttn" onClick={() => setCurrentPage(Number(index))}>
              {index + 1}
            </button>
          )
        })}
        <FaChevronRight />
      </div>
    </Container>
  )
}
