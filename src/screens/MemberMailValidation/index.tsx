import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Container, Highlight, LogoImage, Message, VersionContainer, VersionText, InvisibleButton } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ErrorModal } from "../../components/ErrorModal";

import { useAuth } from "../../contexts/AuthContext";
import { handleKeyboardDismiss, handlePhoneVibration } from "../../helpers/device.helper";

import { expo } from "../../../app.json";

import logoImage from "../../assets/logo.png";

export function MemberMailValidation() {
  const { handleCpfValidation: validateCpf } = useAuth();
  const navigation = useNavigation();

  const [cpf, setCpf] = useState("");

  const [cpfError, setCpfError] = useState(false);
  const [keepConnected, setKeepConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorModal, setErrorModal] = useState("");

  function handleNavigateToUserSignIn() {
    navigation.navigate("SignIn" as never);
  }

  function handleToggleCheckbox() {
    handlePhoneVibration();
    setKeepConnected(!keepConnected);
  }

  function handleInputChangeText(text: string, type: "e-mail") {
    setCpf(text);
    setCpfError(false);
  }

  async function handleCpfValidation() {
    setLoading(true);

    if (!cpf.trim()) {
      setCpfError(true);
      return;
    }

    try {
      await validateCpf(cpf);
      navigation.navigate("MemberPasswordRegister" as never);
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            setErrorModal(error.response.data.message.join("\n"));
          } else {
            setErrorModal(error.response.data.message);
          }
        } else {
          setErrorModal("Erro interno, tente novamente");
        }
      } else {
        setErrorModal("Erro interno, tente novamente");
      }

      setLoading(false);
    }
  }

  return (
    <>
      <InvisibleButton onPress={handleKeyboardDismiss}>
        <Container>
          <LogoImage source={logoImage} />

          <Message>
            Informe seu <Highlight>CPF</Highlight> para continuar
          </Message>

          <Input
            label="CPF"
            placeholder="Informe seu CPF"
            icon="filter"
            value={cpf}
            onChangeText={(text) => handleInputChangeText(text, "e-mail")}
            error={cpfError}
            type="cpf"
          />

          <Button title="Continuar" onPress={handleCpfValidation} />

          <VersionContainer>
            <VersionText>{expo.version}</VersionText>
          </VersionContainer>
        </Container>
      </InvisibleButton>

      <ErrorModal error={errorModal} setError={setErrorModal} />
    </>
  );
}
