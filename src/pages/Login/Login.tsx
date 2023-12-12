import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/LoginForm/LoginForm";
import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";
import React from "react";

const Login: React.FC = () => {
  document.title = "SnappiesLog - Login";
  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/tourneesLivreur" />;
  } else if (state == "admin") {
    return <Redirect to="/" />;
  } else {
    return (
      <IonPage>
        <IonContent fullscreen>
          <LoginForm />
        </IonContent>
      </IonPage>
    );
  }
};

export default Login;
