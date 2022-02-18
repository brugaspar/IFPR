import styled from "styled-components/native";

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
})`
  margin: 20px -16px;
`;
