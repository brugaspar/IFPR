import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Highlight,
  LogoImage,
  Message,
  VersionContainer,
  VersionText,
  InvisibleButton,
} from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ErrorModal } from "../../components/ErrorModal";

import { useAuth } from "../../contexts/AuthContext";
import { handleKeyboardDismiss, handlePhoneVibration } from "../../helpers/device.helper";

import { expo } from "../../../app.json";
import { styles } from "../../styles/global";

import logoImage from "../../assets/logo.png";

export function MemberPasswordRegister() {
  // const { signIn } = useAuth(); VERIFICAR

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

    // DESENVOLVER VALIDAÇÕES    
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
            name="password"
            label="Senha"
            placeholder="Informe sua senha"
            icon="md-lock-closed-outline"
            value={password}
            onChangeText={(text) => handleInputChangeText(text, "password")}
            editable={!loading}
            error={passwordError}
          />
          <Input
            name="passwordConfirm"
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            icon="md-lock-closed-outline"
            value={confirmPassword}
            onChangeText={(text) => handleInputChangeText(text, "confirmPassword")}
            editable={!loading}
            error={passwordError}
          />

          <Button title="Finalizar" onPress={handlePasswordValidation} loading={loading} />

          <VersionContainer>
            <VersionText>{expo.version}</VersionText>
          </VersionContainer>
        </Container>
      </InvisibleButton>
      <ErrorModal error={errorModal} setError={setErrorModal} />
    </>
  );
}
