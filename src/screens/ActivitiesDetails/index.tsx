import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

import { formatCurrency } from "../../helpers/strings.helper";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  BackButton,
  ConfirmButton,
  ConfirmButtonText,
  Container,
  ItemCardContainer,
  ItemCardText,
  ItemCardTitle,
  Items,
  ItemsButton,
  Row,
  Separator,
  Title,
} from "./styles";
import { styles } from "../../styles/global";
import RBSheet from "react-native-raw-bottom-sheet";
import { MemberModal } from "../../components/Modals/Member";
import { UserModal } from "../../components/Modals/User";
import { ProductModal } from "../../components/Modals/Product";
import { ErrorModal } from "../../components/ErrorModal";
import { api } from "../../services/api.service";
import { useAuth } from "../../contexts/AuthContext";

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

type Member = {
  id: string;
  name: string;
};
type Seller = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type RouteProps = {
  activity: {
    id: string;
    status: "open" | "cancelled" | "closed";
    member: Member | null;
    seller: Seller | null;
    observation: string;
    items: Item[];
  };
};

export function ActivitiesDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { isMember } = useAuth();

  const [activityId, setActivityId] = useState("");
  const [activityStatus, setActivityStatus] = useState("open");
  const [error, setError] = useState("");

  const memberRef = useRef<RBSheet>(null);
  const sellerRef = useRef<RBSheet>(null);
  const productRef = useRef<RBSheet>(null);

  const [member, setMember] = useState<Member | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [product, setProduct] = useState<Item | null>(null);

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [observation, setObservation] = useState("");

  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [total, setTotal] = useState("");
  const [productId, setProductId] = useState("");
  const [reload, setReload] = useState(false);

  function calculate() {
    const activityTotal = items.reduce((accumulator, item) => (accumulator += Number(item.price) * Number(item.quantity)), 0);
    const activityTotalQuantity = items.reduce((accumulator, item) => (accumulator += Number(item.quantity)), 0);
    const activityTotalItems = items.length;

    setTotalQuantity(String(activityTotalQuantity));
    setTotalItems(String(activityTotalItems));
    setTotal(String(activityTotal));
  }

  function handleSetProduct(product: Item | null) {
    if (!product) {
      setProductId("");
      setPrice("");
      setQuantity("");
      setProduct(null);
      return;
    }

    setProductId(product.id || "");
    setPrice(String(product.price || ""));
    setQuantity("1");
    setProduct({
      ...product,
      productId: product.id || "",
      product: {
        name: product.name || "",
        quantity: product.quantity || "",
      },
    });
  }

  function handleAddItem() {
    if (!quantity) {
      setError("Quantidade não informada");
      return;
    }

    const item = {
      id: Math.random().toString(36).substring(7),
      activityId: activityId || "",
      productId: product?.productId || "",
      quantity,
      price,
      subtotal: String(Number(quantity) * Number(price)),
      product: {
        name: product?.name || product?.product.name,
        quantity: product?.quantity,
      },
    };

    const itemExists = items.some((currentItem) => currentItem.productId === item.productId);

    if (itemExists) {
      const newArr = items.filter((currentItem) => currentItem.productId !== item.productId);
      setItems([...newArr, item]);
    } else {
      setItems([...items, item]);
    }

    setProductId("");
    setQuantity("");
    setPrice("");
    setProduct(null);
    setReload(!reload);
  }

  function handleRemoveItem(item: Item) {
    if (items.length >= 1) {
      const newArr = items.filter((currentItem) => currentItem.id !== item.id);
      setItems(newArr);
    }
  }

  function handleEditItem(item: Item) {
    setProductId(item.productId);
    setPrice(String(item.price));
    setQuantity(String(item.quantity));
    setProduct(item);
  }

  function handleOpenModal(modal: "member" | "seller" | "product") {
    switch (modal) {
      case "seller": {
        sellerRef.current?.open();
        break;
      }
      case "product": {
        productRef.current?.open();
        break;
      }
      case "member": {
        memberRef.current?.open();
        break;
      }
    }
  }

  async function handleConfirm() {
    if (!member) {
      setError("Selecione um membro");
      return;
    }
    if (!seller) {
      setError("Selecione um vendedor");
      return;
    }

    const parsedItems = items.map((item) => {
      return {
        productId: item.productId,
        quantity: Number(item.quantity),
        price: Number(item.price),
      };
    });

    try {
      if (activityId) {
        await api.put(`activities/${activityId}`, {
          status: activityStatus,
          observation: observation || "",
          sellerId: seller?.id,
          memberId: member?.id,
          items: parsedItems,
        });
      } else {
        await api.post("activities", {
          status: activityStatus,
          observation: observation || "",
          sellerId: seller?.id,
          memberId: member?.id,
          items: parsedItems,
        });
      }

      navigation.navigate("Activities" as never);
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            setError(error.response.data.message.join("\n"));
          } else {
            setError(error.response.data.message);
          }
        } else {
          setError("Erro interno, tente novamente");
        }
      } else {
        setError("Erro interno, tente novamente");
      }
    }
  }

  const activityLabel = activityStatus === "open" ? "Editando atividade" : "Visualizando atividade";
  const canEdit = !isMember && activityStatus === "open";

  useEffect(() => {
    if (route.params) {
      const { activity } = route.params as RouteProps;
      if (activity) {
        setActivityStatus(activity.status);
        setActivityId(activity.id);
        setMember(activity.member);
        setSeller(activity.seller);
        setObservation(activity.observation);
        setItems(activity.items);
      }
    }
  }, []);

  useEffect(() => {
    calculate();
  }, [reload, items]);

  return (
    <>
      <Container>
        <Row mb>
          <BackButton activeOpacity={0.6} onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={30} color={styles.colors.text} />
          </BackButton>
          <Title>{activityId ? activityLabel : "Nova atividade"}</Title>
        </Row>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 52 }} showsVerticalScrollIndicator={false}>
          <Input
            value={member?.name || ""}
            label="Membro"
            placeholder={"Selecione o membro"}
            type="modal"
            editable={canEdit}
            onPress={() => handleOpenModal("member")}
          />
          <Input
            value={seller?.name || ""}
            label="Vendedor"
            placeholder={"Selecione o vendedor"}
            type="modal"
            editable={canEdit}
            onPress={() => handleOpenModal("seller")}
          />

          <Input
            label={`Observações | ${observation.length}/255`}
            placeholder="Informe as observações"
            multiline
            maxLength={255}
            onChangeText={setObservation}
            editable={canEdit}
            value={observation}
          />

          <Input
            value={product?.product?.name || product?.name || ""}
            label="Produto"
            placeholder="Selecione o produto"
            type="modal"
            editable={canEdit}
            onPress={() => handleOpenModal("product")}
          />

          <Row>
            <Input
              value={price}
              onChangeText={setPrice}
              label="Preço"
              placeholder="Informe o preço"
              width={48.5}
              keyboardType="numeric"
              editable={canEdit}
            />
            <Input
              value={quantity}
              onChangeText={setQuantity}
              label={product ? `Quantidade (${product.quantity})` : "Quantidade"}
              placeholder="Informe a quantidade"
              width={48.5}
              keyboardType="numeric"
              editable={canEdit}
            />
          </Row>

          <Button onPress={handleAddItem} title="Adicionar" background={styles.colors.blue} disabled={!canEdit || !product} />

          <Separator />

          <Title>Produtos adicionados</Title>
          <ItemCardText style={{ fontSize: 13 }}>
            Valor total: {formatCurrency(Number(total))} | Qtde. itens: {totalItems} | Qtde. total: {totalQuantity}
          </ItemCardText>

          <Items>
            {items.map((item) => {
              const price = formatCurrency(Number(item.price));
              const total = formatCurrency(Number(item.price) * Number(item.quantity));

              return (
                <ItemCardContainer key={item.id}>
                  <Row>
                    <ItemCardTitle />
                    <Row>
                      {!isMember && (
                        <>
                          <ItemsButton onPress={() => handleEditItem(item)} disabled={!canEdit}>
                            <Ionicons name="brush" size={15} color={styles.colors.blue} />
                          </ItemsButton>
                          <ItemsButton onPress={() => handleRemoveItem(item)} disabled={!canEdit}>
                            <Ionicons name="trash-bin" size={15} color={styles.colors.red} />
                          </ItemsButton>
                        </>
                      )}
                    </Row>
                  </Row>
                  <Row>
                    <ItemCardTitle>{item?.name || item?.product?.name}</ItemCardTitle>
                    <ItemCardText>{total}</ItemCardText>
                  </Row>
                  <Separator />
                  <Row>
                    <ItemCardText>Qtde.: {item.quantity}</ItemCardText>
                    <ItemCardText>Valor unitário: {price}</ItemCardText>
                  </Row>
                </ItemCardContainer>
              );
            })}
          </Items>
        </ScrollView>

        {canEdit && (
          <ConfirmButton activeOpacity={0.8} onPress={handleConfirm}>
            <ConfirmButtonText>Salvar</ConfirmButtonText>
          </ConfirmButton>
        )}
      </Container>

      <MemberModal modalRef={memberRef} selectedMember={member} setSelectedMember={setMember} />
      <UserModal modalRef={sellerRef} selectedUser={seller} setSelectedUser={setSeller} />
      <ProductModal modalRef={productRef} selectedProduct={product} setSelectedProduct={handleSetProduct} />
      <ErrorModal error={error} setError={setError} />
    </>
  );
}
