import { FaChevronDown } from "react-icons/fa"
import { Checkbox } from "../Checkbox"
import { SearchBar } from "../SearchBar"

import { Container } from "./styles"

type FilterContainerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasOnlyEnabled?: boolean
  onlyEnabled?: boolean
  handleToggleOnlyEnabled?: () => void
  hasFilterButton?: boolean
  handleFilterButtonClick?: () => void
  handleSearchFilter: (event: any) => void
}

export function FilterContainer({
  hasOnlyEnabled = true,
  onlyEnabled = true,
  handleToggleOnlyEnabled = () => {},
  handleSearchFilter,
  hasFilterButton,
  handleFilterButtonClick,
  ...rest
}: FilterContainerProps) {
  return (
    <Container>
      <SearchBar onChange={handleSearchFilter} {...rest} />

      <div className="left bottom">
        {hasOnlyEnabled && <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />}
      </div>

      <div className={hasOnlyEnabled ? "left" : ""}>
        {hasFilterButton && (
          <button className="filter" type="button" onClick={handleFilterButtonClick}>
            Filtrar
            <FaChevronDown />
          </button>
        )}
      </div>
    </Container>
  )
}
