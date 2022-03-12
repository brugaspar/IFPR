import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

import { formatCurrency } from "../../helpers/strings.helper";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  BackButton,
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

type RouteProps = {
  activity: {
    id: string;
    status: "open" | "cancelled" | "closed";
  };
};

const items = [
  {
    id: "1",
    name: "Munição 9mm",
    quantity: 50,
    price: 3.15,
  },
  {
    id: "2",
    name: "Munição .40",
    quantity: 24,
    price: 4,
  },
  {
    id: "3",
    name: "Camiseta M",
    quantity: 1,
    price: 29.99,
  },
  {
    id: "4",
    name: "Curso de Tiro",
    quantity: 1,
    price: 50,
  },
  {
    id: "5",
    name: "Munição .45",
    quantity: 20,
    price: 3.99,
  },
];

export function ActivitiesDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [activityId, setActivityId] = useState("");
  const [activityStatus, setActivityStatus] = useState("");

  const [observation, setObservation] = useState("");

  const activityLabel = activityStatus === "open" ? "Editando atividade" : "Visualizando atividade";
  const canEdit = activityStatus === "open";

  useEffect(() => {
    if (route.params) {
      const { activity } = route.params as RouteProps;
      if (activity) {
        setActivityStatus(activity.status);
        setActivityId(activity.id);
      }
    }
  }, []);

  return (
    <Container>
      <Row mb>
        <BackButton activeOpacity={0.6} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={30} color={styles.colors.text} />
        </BackButton>
        <Title>{activityId ? activityLabel : "Nova atividade"}</Title>
      </Row>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Input label="Membro" placeholder="Selecione o membro" type="modal" editable={canEdit} />
        <Input label="Vendedor" placeholder="Selecione o vendedor" type="modal" editable={canEdit} />

        <Input
          label={`Observações | ${observation.length}/255`}
          placeholder="Informe as observações"
          multiline
          maxLength={255}
          onChangeText={setObservation}
          editable={canEdit}
        />

        <Input label="Produto" placeholder="Selecione o produto" type="modal" editable={canEdit} />

        <Row>
          <Input label="Preço" placeholder="Informe o preço" width={48.5} keyboardType="numeric" editable={canEdit} />
          <Input label="Quantidade" placeholder="Informe a quantidade" width={48.5} keyboardType="numeric" editable={canEdit} />
        </Row>

        <Button title="Adicionar" background={styles.colors.blue} disabled={!canEdit} />

        <Separator />

        <Title>Produtos adicionados</Title>

        <Items>
          {items.map((item) => {
            const price = formatCurrency(item.price);
            const total = formatCurrency(item.price * item.quantity);

            return (
              <ItemCardContainer key={item.id}>
                <Row>
                  <ItemCardTitle />
                  <Row>
                    <ItemsButton disabled={!canEdit}>
                      <Ionicons name="brush" size={15} color={styles.colors.blue} />
                    </ItemsButton>
                    <ItemsButton disabled={!canEdit}>
                      <Ionicons name="trash-bin" size={15} color={styles.colors.red} />
                    </ItemsButton>
                  </Row>
                </Row>
                <Row>
                  <ItemCardTitle>{item.name}</ItemCardTitle>
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
    </Container>
  );
}
