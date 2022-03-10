import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

export function SignIn() {
  const { signIn, isMember } = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorModal, setErrorModal] = useState("");

  function handleNavigateToMemberSignIn() {
    if (isMember) {
      console.log("MUDAR PARA USUÁRIO");
    } else {
      navigation.navigate("MemberMailValidation" as never);
    }
  }

  function handleToggleCheckbox() {
    handlePhoneVibration();
    setKeepConnected(!keepConnected);
  }

  function handleInputChangeText(text: string, type: "username" | "password") {
    if (type === "username") {
      setUsername(text);
      setUsernameError(false);
    }

    if (type === "password") {
      setPassword(text);
      setPasswordError(false);
    }
  }

  async function handleSignIn() {
    setLoading(true);

    if (!username.trim()) {
      setUsernameError(true);
    }

    if (!password.trim()) {
      setPasswordError(true);
    }

    if (!username.trim() || !password.trim()) {
      setLoading(false);
      return;
    }

    try {
      await signIn({
        username,
        password,
        keepConnected,
      });
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
            Informe seu <Highlight>{isMember ? "CPF" : "usuário"}</Highlight> e sua <Highlight>senha</Highlight>
            {"\n"}para acessar o aplicativo
          </Message>

          <Input
            label={isMember ? "CPF" : "Usuário"}
            placeholder={`Informe seu ${isMember ? "CPF" : "usuário"}`}
            icon={isMember ? "filter" : "person-outline"}
            value={username}
            onChangeText={(text) => handleInputChangeText(text, "username")}
            editable={!loading}
            error={usernameError}
          />
          <Input
            label="Senha"
            placeholder="Informe sua senha"
            icon="lock-closed-outline"
            type="password"
            value={password}
            onChangeText={(text) => handleInputChangeText(text, "password")}
            editable={!loading}
            error={passwordError}
          />

          <KeepConnectedContainer>
            <KeepConnectedButton
              activeOpacity={0.8}
              onPress={handleToggleCheckbox}
              disabled={loading}
              opacity={loading ? 0.5 : 1}
            >
              <KeepConnectedBox active={keepConnected}>
                {keepConnected && <Ionicons name="checkmark-sharp" size={17} color={styles.colors.background} />}
              </KeepConnectedBox>
              <KeepConnectedText>Manter conectado</KeepConnectedText>
            </KeepConnectedButton>
          </KeepConnectedContainer>

          <Button title="Entrar" onPress={handleSignIn} loading={loading} />

          <MemberContainer>
            <MemberText>
              É {isMember ? "usuário" : "membro"}? <Highlight onPress={handleNavigateToMemberSignIn}>Clique aqui</Highlight>
            </MemberText>
          </MemberContainer>

          <VersionContainer>
            <VersionText>{expo.version}</VersionText>
          </VersionContainer>
        </Container>
      </InvisibleButton>
      <ErrorModal error={errorModal} setError={setErrorModal} />
    </>
  );
}
