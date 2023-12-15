import {
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonImg,
} from "@ionic/react";
import {
  barChart,
  accessibility,
  clipboard,
  cube,
  bus,
  walk,
  footsteps,
  logOut,
} from "ionicons/icons";
import { Redirect } from "react-router-dom";
import checkUserState from "../../utils/checkUserState";
import logo from "../../assets/img/logo_snappies.png";
import React from "react";

const Menu: React.FC = () => {
  let state = checkUserState();
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">
          <IonList>
            <IonImg
              class="ion-margin"
              alt="Snappies' logo"
              src={logo}
              slot="end"
            />
            {state == "admin" ? (
              <>
                <IonMenuToggle>
                  <IonItem routerLink="/" routerDirection="none">
                    <IonIcon icon={barChart}></IonIcon>
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem routerLink="/clients" routerDirection="none">
                    <IonIcon icon={accessibility}></IonIcon>
                    <IonLabel>Clients</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem routerLink="/articles" routerDirection="none">
                    <IonIcon icon={cube}></IonIcon>
                    <IonLabel>Articles</IonLabel>
                  </IonItem>
                </IonMenuToggle>

                <IonMenuToggle>
                  <IonItem routerLink="/vehicules" routerDirection="none">
                    <IonIcon icon={bus}></IonIcon>
                    <IonLabel>Véhicules</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem routerLink="/livreurs" routerDirection="none">
                    <IonIcon icon={footsteps}></IonIcon>
                    <IonLabel>Utilisateurs</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle>
                  <IonItem routerLink="/tournees" routerDirection="none">
                    <IonIcon icon={walk}></IonIcon>
                    <IonLabel>Tournées</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </>
            ) : null}
            {state == "user" ? (
              <>
                <IonMenuToggle>
                  <IonItem routerLink="/tourneesLivreur" routerDirection="none">
                    <IonIcon icon={walk}></IonIcon>
                    <IonLabel>Tournées</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </>
            ) : null}
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
