import './LoginForm.css';
import {IonButton, IonImg, IonInput, IonItem} from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";

const LoginForm: React.FC = () => {
  return (
      <div id="container">
          <IonImg alt="Snappies' logo" src={logo}></IonImg>
          <IonItem lines="none">
              <IonInput type="email" placeholder="Email"></IonInput>
          </IonItem>
          <IonItem lines="none">
              <IonInput type="password" placeholder="Mot de passe"></IonInput>
          </IonItem>
          <IonButton color="light" fill="outline">Se connecter</IonButton>
      </div>
  );
};

export default LoginForm;
