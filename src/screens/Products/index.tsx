import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { StatusModal } from "../../components/Modals/Status";
import { GroupsModal } from "../../components/Modals/Group";
import { BrandsModal } from "../../components/Modals/Brand";

import { formatCurrency } from "../../helpers/strings.helper";

import {
  Container,
  ProductCardContainer,
  ProductCardIndex,
  ProductCardNumber,
  ProductCardRow,
  ProductCardSeparator,
  ProductCardStatusCircle,
  ProductCardText,
  ProductCardTitle,
} from "./styles";


type GroupProps = {
  id: string;
  name: string;
};

type BrandProps = {
  id: string;
  name: string;
};

const products = [
  {
    id: "1",
    name: "Munição 9mm",
    quantity: 34,
    brand: "Taurus",
    value: 7.45,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "2",
    name: "Munição .50",
    quantity: 456,
    brand: "CBC",
    value: 15.5,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "3",
    name: "Aluguel 9mm",
    quantity: 1,
    brand: "Glock",
    value: 225.0,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "4",
    name: "Munição .40",
    quantity: 299,
    brand: "CBC",
    value: 6.25,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "5",
    name: "Camiseta M",
    quantity: 45,
    brand: "Estatex",
    value: 59.0,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "6",
    name: "Camiseta GG",
    quantity: 32,
    brand: "Estatex",
    value: 79.0,
    disabled: false,
    createdAt: "2021-12-27",
  },
];

export function Products() {

  const statusRef = useRef<RBSheet>(null);
  const groupRef = useRef<RBSheet>(null);
  const brandRef = useRef<RBSheet>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupProps | null>(null);
  const [brand, setBrand] = useState<BrandProps | null>(null);

  function handleOpenModal(modal: "status" | "name" | "group" | "brand") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      // case "name": {
      //   nameRef.current?.open();
      //   break;
      // }
      case "group": {
        groupRef.current?.open();
        break;
      }
      case "brand": {
        brandRef.current?.open();
        break;
      }
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Produtos filtrados" value={products.length} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={group ? group.name : "Grupo"} ml onPress={() => handleOpenModal("group")} />
          <Filter title={brand ? brand.name : "Marca"} ml onPress={() => handleOpenModal("brand")} />
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
      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <GroupsModal modalRef={groupRef} selectedGroup={group} setSelectedGroup={setGroup} />
      <BrandsModal modalRef={brandRef} selectedBrand={brand} setSelectedBrand={setBrand} />
    </>
  );
}

// ProductCard

type ProductProps = {
  id: string;
  name: string;
  quantity: number;
  brand: string;
  value: number;
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

  const value = formatCurrency(product.value);

  return (
    <ProductCardContainer>
      <ProductCardTitle>{product.name}</ProductCardTitle>

      <ProductCardSeparator />

      <ProductCardRow>
        <ProductCardText>Estoque: {product.quantity}</ProductCardText>
        <ProductCardText>Marca: {product.brand}</ProductCardText>
      </ProductCardRow>

      <ProductCardText>
        <ProductCardNumber>{value}</ProductCardNumber>
      </ProductCardText>

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
