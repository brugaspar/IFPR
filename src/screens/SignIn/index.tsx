import { expo } from "../../../app.json";
import { Container, Highlight, LogoImage, Margin, Message, Title, VersionContainer, VersionText } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import logoImage from "../../assets/logo.png";

export function SignIn() {
  return (
    <Container>
      <LogoImage source={logoImage} />

      <Message>
        Informe seu <Highlight>usuário</Highlight> e sua <Highlight>senha</Highlight>
        {"\n"}para acessar o aplicativo
      </Message>

      <Input label="Usuário" placeholder="Informe seu usuário" icon="person-outline" />
      <Input label="Senha" placeholder="Informe sua senha" icon="lock-closed-outline" type="password" />

      <Margin />

      <Button title="Entrar" />

      <VersionContainer>
        <VersionText>{expo.version}</VersionText>
      </VersionContainer>
    </Container>
  );
}
