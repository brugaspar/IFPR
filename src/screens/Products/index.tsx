import { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

import { api } from "../../services/api.service";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import { StatusModal } from "../../components/Modals/Status";
import { GroupsModal } from "../../components/Modals/Group";
import { BrandsModal } from "../../components/Modals/Brand";
import { InputModal } from "../../components/Modals/Input";

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
import { styles } from "../../styles/global";

type GroupProps = {
  id: string;
  name: string;
};

type BrandProps = {
  id: string;
  name: string;
};

export function Products() {
  const statusRef = useRef<RBSheet>(null);
  const groupRef = useRef<RBSheet>(null);
  const brandRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [reload, setReload] = useState(false);

  const [status, setStatus] = useState<string | null>(null);
  const [group, setGroup] = useState<GroupProps | null>(null);
  const [brand, setBrand] = useState<BrandProps | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<ProductProps[] | null>(null);

  function handleOpenModal(modal: "status" | "name" | "group" | "brand") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      case "name": {
        nameRef.current?.open();
        break;
      }
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

  async function loadProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
    setReload(!reload);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let newData = products;
    if (name) {
      newData = newData.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = name.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setName(name);
    } else {
      if (status || brand || group) {
        setFilteredData(newData);
      } else {
        setFilteredData(products);
      }
      setName(name);
    }

    if (status) {
      newData = newData.filter((item) => item.disabled === (status === "disabled"));
      setFilteredData(newData);
      setStatus(status);
    } else {
      if (name || brand || group) {
        setFilteredData(newData);
      } else {
        setFilteredData(products);
      }
      setStatus(status);
    }

    if (brand) {
      newData = newData.filter(function (item) {
        if (item.brand.id) {
          const itemData = item.brand.id.toUpperCase();
          const textData = brand.id.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setBrand(brand);
    } else {
      if (status || name || group) {
        setFilteredData(newData);
      } else {
        setFilteredData(products);
      }
      setBrand(brand);
    }

    if (group) {
      newData = newData.filter(function (item) {
        if (item.group.id) {
          const itemData = item.group.id.toUpperCase();
          const textData = group.id.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setGroup(group);
    } else {
      if (status || name || brand) {
        setFilteredData(newData);
      } else {
        setFilteredData(products);
      }
      setGroup(group);
    }
  }, [name, status, brand, group, products.length, reload]);

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Produtos filtrados" value={filteredData?.length || 0} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome"} ml onPress={() => handleOpenModal("name")} />
          <Filter title={group ? group.name : "Grupo"} ml onPress={() => handleOpenModal("group")} />
          <Filter title={brand ? brand.name : "Marca"} ml onPress={() => handleOpenModal("brand")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(product) => product.id}
          renderItem={({ item, index }) => <ProductCard product={item} index={index} total={filteredData?.length || 0} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadProducts}
              progressBackgroundColor={styles.colors.background}
              colors={[styles.colors.text]}
            />
          }
        />
      </Container>
      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <InputModal modalRef={nameRef} selectedText={name} setSelectedText={setName} />
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
  brand: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  price: number;
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

  const value = formatCurrency(product.price);

  return (
    <ProductCardContainer>
      <ProductCardTitle>{product.name}</ProductCardTitle>

      <ProductCardSeparator />

      <ProductCardRow>
        <ProductCardText>Estoque: {product.quantity}</ProductCardText>
        <ProductCardText>Marca: {product.brand.name}</ProductCardText>
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
