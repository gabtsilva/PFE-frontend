import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg
} from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";
import "./Header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  if(localStorage.getItem("token") != null){
    return (
        <>
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
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
  }

};

export default Header;
