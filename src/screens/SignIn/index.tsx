import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Highlight,
  LogoImage,
  Margin,
  Message,
  Title,
  VersionContainer,
  VersionText,
  KeepConnectedBox,
  KeepConnectedButton,
  KeepConnectedText,
  KeepConnectedContainer,
  MemberText,
  MemberContainer,
} from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import logoImage from "../../assets/logo.png";
import { expo } from "../../../app.json";
import { styles } from "../../styles/global";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-native";

export function SignIn() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleToggleCheckbox() {
    setKeepConnected(!keepConnected);
  }

  async function handleSignIn() {
    try {
      await signIn({
        username,
        password,
        keepConnected,
      });
    } catch (error) {
      Alert.alert("Erro seu arrombado", "Veja essa merda aí de novo");
    }
  }

  return (
    <Container>
      <LogoImage source={logoImage} />

      <Message>
        Informe seu <Highlight>usuário</Highlight> e sua <Highlight>senha</Highlight>
        {"\n"}para acessar o aplicativo
      </Message>

      <Input
        label="Usuário"
        placeholder="Informe seu usuário"
        icon="person-outline"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Senha"
        placeholder="Informe sua senha"
        icon="lock-closed-outline"
        type="password"
        value={password}
        onChangeText={setPassword}
      />

      <KeepConnectedContainer>
        <KeepConnectedButton activeOpacity={0.8} onPress={handleToggleCheckbox} disabled={loading} opacity={loading ? 0.5 : 1}>
          <KeepConnectedBox active={keepConnected}>
            {keepConnected && <Ionicons name="checkmark-sharp" size={17} color={styles.colors.background} />}
          </KeepConnectedBox>
          <KeepConnectedText>Manter conectado</KeepConnectedText>
        </KeepConnectedButton>
      </KeepConnectedContainer>

      <Button title="Entrar" onPress={handleSignIn} />

      <MemberContainer>
        <MemberText>
          É membro? <Highlight onPress={() => console.log("Login do membro")}>Clique aqui</Highlight>
        </MemberText>
      </MemberContainer>

      <VersionContainer>
        <VersionText>{expo.version}</VersionText>
      </VersionContainer>
    </Container>
  );
}
