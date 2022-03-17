import { MutableRefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { formatCurrency } from "../../../helpers/strings.helper";
import { api } from "../../../services/api.service";
import { Input } from "../../Input";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";

import { Container, ProductCardContainer, ProductCardIndex, ProductCardText, ProductCardTitle, Row, Separator } from "./styles";

type ProductProps = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};
type Item = {
  id: string;
  activityId: string;
  productId: string;
  quantity: string;
  price: string;
  subtotal: string;
  product: {
    name?: string;
    quantity?: string;
  };
  name?: string;
};

type ProductsModalProps = {
  modalRef: MutableRefObject<any>;
  selectedProduct: Item | null;
  setSelectedProduct: (product: Item | null) => void;
};

export function ProductModal({ modalRef, selectedProduct, setSelectedProduct }: ProductsModalProps) {
  const [text, setText] = useState("");

  const [products, setProducts] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[] | null>(null);

  const searchFilter = (text: string) => {
    if (text) {
      const newData = products.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setText(text);
    } else {
      setFilteredData(products);
      setText(text);
    }
  };

  function handleSelectStatus(product: Item) {
    if (selectedProduct?.id !== product.id) {
      setSelectedProduct(product);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedProduct !== null) {
      setSelectedProduct(null);
    }

    modalRef.current?.close();
  }

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
      setFilteredData(response.data);
    }
    loadProducts();
  }, []);

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <ModalHeader title="Selecione um produto" onCleanFilter={handleCleanStatus} />

        <Input
          hasLabel={false}
          label="Nome"
          placeholder="Informe o nome"
          icon="search-outline"
          value={text}
          onChangeText={(text) => searchFilter(text)}
          returnKeyType="search"
          style={{
            marginBottom: 0,
            marginTop: 5,
          }}
        />
        <Separator />
        <FlatList
          data={filteredData}
          keyExtractor={(product) => product.id}
          renderItem={({ item, index }) => (
            <ProductCard
              selectedProductId={selectedProduct ? selectedProduct.id : null}
              selectProduct={handleSelectStatus}
              product={item}
              index={index}
              total={products.length}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>
    </ModalView>
  );
}

// PlanCard

type ProductCardProps = {
  product: Item;
  index: number;
  total: number;
  selectedProductId: string | null;
  selectProduct: (Product: Item) => void;
};

function ProductCard({ product, index, total, selectProduct, selectedProductId }: ProductCardProps) {
  return (
    <ProductCardContainer selected={selectedProductId === product.id} activeOpacity={0.7} onPress={() => selectProduct(product)}>
      <Row>
        <ProductCardTitle>{product.name}</ProductCardTitle>
        <ProductCardIndex>
          {index + 1} / {total}
        </ProductCardIndex>
      </Row>
    </ProductCardContainer>
  );
}
