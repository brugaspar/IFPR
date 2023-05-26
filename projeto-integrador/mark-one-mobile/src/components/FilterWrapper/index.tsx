import { ReactNode } from "react";
import { FilterContainer, HorizontalScroll } from "./styles";

type FilterWrapperProps = {
  children: ReactNode;
};

export const FilterWrapper = ({ children }: FilterWrapperProps) => {
  return (
    <FilterContainer>
      <HorizontalScroll>{children}</HorizontalScroll>
    </FilterContainer>
  );
};
