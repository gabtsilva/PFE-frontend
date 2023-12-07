import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRouterLink,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
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
} from "ionicons/icons";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonRouterLink routerLink="/">
              <IonItem>
                <IonIcon icon={homeOutline}></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/clients">
              <IonItem>
                <IonIcon icon={accessibilityOutline}></IonIcon>
                <IonLabel>Clients</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/articles">
              <IonItem>
                <IonIcon icon={clipboardOutline}></IonIcon>
                <IonLabel>Articles</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/commandes">
              <IonItem>
                <IonIcon icon={cubeOutline}></IonIcon>
                <IonLabel>Commandes</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/vehicules">
              <IonItem>
                <IonIcon icon={busOutline}></IonIcon>
                <IonLabel>Véhicules</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/tournees">
              <IonItem>
                <IonIcon icon={walkOutline}></IonIcon>
                <IonLabel>Tournées</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink routerLink="/livreurs">
              <IonItem>
                <IonIcon icon={footstepsOutline}></IonIcon>
                <IonLabel>Livreurs</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonList>
        </IonContent>
      </IonMenu>
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
