import { MutableRefObject } from "react";
import { FlatList } from "react-native";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";

import {

  Container,
  BrandCardContainer,
  BrandCardIndex,
  BrandCardTitle,
  Row,
  Separator,
} from "./styles";

type BrandProps = {
  id: string;
  name: string;
};

type BrandsModalProps = {
  modalRef: MutableRefObject<any>;
  selectedBrand: BrandProps | null;
  setSelectedBrand: (brand: BrandProps | null) => void;
};

const brands = [
  {
    id: "1",
    name: "Taurus",
  },
  {
    id: "2",
    name: "Glock",
  },
  {
    id: "3",
    name: "CMC",
  },
  {
    id: "4",
    name: "CBC",
  },
  {
    id: "5",
    name: "Estatex",
  },
];

export function BrandsModal({ modalRef, selectedBrand, setSelectedBrand }: BrandsModalProps) {
  function handleSelectStatus(brand: BrandProps) {
    if (selectedBrand?.id !== brand.id) {
      setSelectedBrand(brand);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedBrand !== null) {
      setSelectedBrand(null);
    }

    modalRef.current?.close();
  }

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
      <ModalHeader title="Selecione uma marca" onCleanFilter={handleCleanStatus} />

        <Separator />

        <FlatList
          data={brands}
          keyExtractor={(brand) => brand.id}
          renderItem={({ item, index }) => (
            <BrandCard
              selectedBrandId={selectedBrand ? selectedBrand.id : null}
              selectBrand={handleSelectStatus}
              brand={item}
              index={index}
              total={brands.length}
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

// BrandCard

type BrandCardProps = {
  brand: BrandProps;
  index: number;
  total: number;
  selectedBrandId: string | null;
  selectBrand: (brand: BrandProps) => void;
};

function BrandCard({ brand, index, total, selectBrand, selectedBrandId }: BrandCardProps) {

  return (
    <BrandCardContainer selected={selectedBrandId === brand.id} activeOpacity={0.7} onPress={() => selectBrand(brand)}>
      <Row>
        <BrandCardTitle>{brand.name}</BrandCardTitle>
        <BrandCardIndex>
          {index + 1} / {total}
        </BrandCardIndex>
      </Row>
      
    </BrandCardContainer>
  );
}
