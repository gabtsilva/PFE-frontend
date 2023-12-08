import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";
import "./Header.css";
import {
  accessibilityOutline,
  homeOutline,
  clipboardOutline,
  cubeOutline,
  busOutline,
  walkOutline,
  footstepsOutline,
  logOutOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const history = useHistory();
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>

            <IonImg
              class="ion-margin"
              alt="Snappies' logo"
              src={logo}
              slot="end"
            ></IonImg>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default Header;
