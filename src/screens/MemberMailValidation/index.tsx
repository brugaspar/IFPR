import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Highlight,
  LogoImage,
  Message,
  VersionContainer,
  VersionText,
  KeepConnectedBox,
  KeepConnectedButton,
  KeepConnectedText,
  KeepConnectedContainer,
  MemberText,
  MemberContainer,
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

export function MemberMailValidation() {
  // const { signIn } = useAuth(); VERIFICAR

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  
  const [errorModal, setErrorModal] = useState("");

  function handleInputChangeText(text: string, type: "e-mail") {   
      setEmail(text);
      setEmailError(false); 
  }

  async function handleEmailValidation() {
    if (!email.trim()) {
      setEmailError(true);
    }

    // DESENVOLVER VALIDAÇÕES    
  }

  return (
    <>
      <InvisibleButton onPress={handleKeyboardDismiss}>
        <Container>
          <LogoImage source={logoImage} />

          <Message> 
            Informe seu <Highlight>e-mail</Highlight> para continuar
          </Message>

          <Input
            label="E-mail"
            placeholder="Informe seu e-mail"
            icon="person-outline"
            value={email}
            onChangeText={(text) => handleInputChangeText(text, "e-mail")}
            editable={!loading}
            error={emailError}
          />

          <Button title="Continuar" onPress={handleEmailValidation} loading={loading} />

          <VersionContainer>
            <VersionText>{expo.version}</VersionText>
          </VersionContainer>
        </Container>
      </InvisibleButton>
      <ErrorModal error={errorModal} setError={setErrorModal} />
    </>
  );
}
