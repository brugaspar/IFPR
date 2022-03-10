import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Highlight, LogoImage, Message, VersionContainer, VersionText, InvisibleButton } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ErrorModal } from "../../components/ErrorModal";

import { handleKeyboardDismiss } from "../../helpers/device.helper";

import { useAuth } from "../../contexts/AuthContext";
import { expo } from "../../../app.json";
import { styles } from "../../styles/global";

import logoImage from "../../assets/logo.png";

export function MemberPasswordRegister() {
  const { createMemberPassword } = useAuth();
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [errorModal, setErrorModal] = useState("");

  function handleInputChangeText(text: string, type: "password" | "confirmPassword") {
    if (type === "password") {
      setPassword(text);
      setPasswordError(false);
    }
    if (type === "confirmPassword") {
      setConfirmPassword(text);
      setConfirmPasswordError(false);
    }
  }

  async function handlePasswordValidation() {
    if (!password.trim()) {
      setPasswordError(true);
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError(true);
    }

    if (!password.trim() || !confirmPassword.trim()) {
      return;
    }

    if (!(password === confirmPassword)) {
      setErrorModal("Senhas não conferem");
      return;
    }

    try {
      await createMemberPassword(password);
      navigation.navigate("SignIn" as never);
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
            Crie uma <Highlight>senha </Highlight>para continuar
          </Message>

          <Input
            label="Senha"
            placeholder="Informe sua senha"
            icon="md-lock-closed-outline"
            value={password}
            onChangeText={(text) => handleInputChangeText(text, "password")}
            error={passwordError}
          />
          <Input
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            icon="md-lock-closed-outline"
            value={confirmPassword}
            onChangeText={(text) => handleInputChangeText(text, "confirmPassword")}
            error={confirmPasswordError}
          />

          <Button title="Finalizar" onPress={handlePasswordValidation} />

          <VersionContainer>
            <VersionText>{expo.version}</VersionText>
          </VersionContainer>
        </Container>
      </InvisibleButton>
      <ErrorModal error={errorModal} setError={setErrorModal} />
    </>
  );
}
