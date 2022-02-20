import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import {
  Container,
  ProductCardContainer,
  ProductCardIndex,
  ProductCardRow,
  ProductCardSeparator,
  ProductCardStatusCircle,
  ProductCardText,
  ProductCardTitle,
} from "./styles";

const products = [
  {
    id: "1",
    name: "Munição 9mm",
    quantity: "34",
    brand: "Taurus",
    value: "7.45",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "2",
    name: "Munição .50",
    quantity: "456",
    brand: "CBC",
    value: "15.50",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "3",
    name: "Aluguel pistola 9mm",
    quantity: "1",
    brand: "Glock",
    value: "225.00",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "4",
    name: "Munição .40",
    quantity: "299",
    brand: "CBC",
    value: "6.25",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "5",
    name: "Camiseta M",
    quantity: "45",
    brand: "Estatex",
    value: "59.00",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "6",
    name: "Camiseta GG",
    quantity: "32",
    brand: "Estatex",
    value: "79.00",
    disabled: false,
    createdAt: "2021-12-27",
  },
  
];

export function Product() {
  return (
    <Container>
      <Header />
      <TotalCard title="Produtos filtrados" value={products.length} />

      <FilterWrapper>
        <Filter title="Status" />
        <Filter title="Nome" ml />
        <Filter title="Grupo" ml />
        <Filter title="Marca" ml />
      </FilterWrapper>

      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item, index }) => <ProductCard product={item} index={index} total={products.length} />}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: -16,
        }}
      />
    </Container>
  );
}

// ProductCard

type ProductProps = {
  id: string;
  name: string;
  quantity: string;
  brand: string;
  value: string;
  disabled: boolean;
  createdAt: string;
};

type ProductCardProps = {
  product: ProductProps;
  index: number;
  total: number;
};

function ProductCard({ product, index, total }: ProductCardProps) {
  const createdAt = moment(product.createdAt).format("DD/MM/YYYY");

  return (
    <ProductCardContainer>
      <ProductCardTitle>{product.name}</ProductCardTitle>

      <ProductCardSeparator />

      <ProductCardRow>
        <ProductCardText>{`Estoque: ${product.quantity}`}</ProductCardText>
        <ProductCardText>{`Marca: ${product.brand}`}</ProductCardText>
      </ProductCardRow>

      <ProductCardText>{`R$ ${product.value}`}</ProductCardText>
      
      <ProductCardRow>
        <ProductCardRow>
          <ProductCardStatusCircle disabled={product.disabled} />
          <ProductCardText>{product.disabled ? "Inativo" : "Ativo"}</ProductCardText>
        </ProductCardRow>

        <ProductCardText>Cadastro: {createdAt}</ProductCardText>
      </ProductCardRow>

      <ProductCardIndex>
        {index + 1}/{total}
      </ProductCardIndex>
    </ProductCardContainer>
  );
}
