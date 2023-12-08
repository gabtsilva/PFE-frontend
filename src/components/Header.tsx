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
  logOutOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const history = useHistory();
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
            <IonItem onClick={() => history.replace(`/`)}>
              <IonIcon icon={homeOutline}></IonIcon>
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/clients`)}>
              <IonIcon icon={accessibilityOutline}></IonIcon>
              <IonLabel>Clients</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/articles`)}>
              <IonIcon icon={clipboardOutline}></IonIcon>
              <IonLabel>Articles</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/commandes`)}>
              <IonIcon icon={cubeOutline}></IonIcon>
              <IonLabel>Commandes</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/vehicules`)}>
              <IonIcon icon={busOutline}></IonIcon>
              <IonLabel>Véhicules</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/tournees`)}>
              <IonIcon icon={walkOutline}></IonIcon>
              <IonLabel>Tournées</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/livreurs`)}>
              <IonIcon icon={footstepsOutline}></IonIcon>
              <IonLabel>Livreurs</IonLabel>
            </IonItem>

            <IonItem onClick={() => history.replace(`/logout`)}>
              <IonIcon icon={logOutOutline}></IonIcon>
              <IonLabel>Se déconnecter</IonLabel>
            </IonItem>
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
