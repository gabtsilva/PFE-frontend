import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg, IonMenuToggle, IonItem, IonIcon, IonLabel, IonButton
} from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";
import "./Header.css";
import {logOut} from "ionicons/icons";

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
                <IonButtons slot="end">
                  <IonButton routerLink="/logout" routerDirection="none"><IonIcon icon={logOut}></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
          </IonPage>
        </>
    );
  }

};

export default Header;
