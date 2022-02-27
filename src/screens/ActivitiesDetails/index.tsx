import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../../components/Input";

import { BackButton, Container, Header, Title } from "./styles";
import { styles } from "../../styles/global";

type RouteProps = {
  activity: {
    id: string;
  };
};

export function ActivitiesDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [activityId, setActivityId] = useState("");

  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (route.params) {
      const { activity } = route.params as RouteProps;
      if (activity) {
        setActivityId(activity.id);
      }
    }
  }, []);

  return (
    <Container>
      <Header>
        <BackButton activeOpacity={0.6} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={30} color={styles.colors.text} />
        </BackButton>
        <Title>{activityId ? "Editando atividade" : "Nova atividade"}</Title>
      </Header>

      <Input label="Membro" placeholder="Selecione o membro" type="modal" />
      <Input label="Vendedor" placeholder="Selecione o vendedor" type="modal" />

      <Input
        label={`Observações | ${observation.length}/255`}
        placeholder="Informe as observações"
        multiline
        maxLength={255}
        onChangeText={setObservation}
      />

      <Input label="Produto" placeholder="Selecione o produto" type="modal" />
    </Container>
  );
}
