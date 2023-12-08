import {
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
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

const Menu: React.FC = () => {

  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">
          <IonList>
            <IonItem routerLink="/">
              <IonIcon icon={homeOutline}></IonIcon>
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem routerLink="/clients">
              <IonIcon icon={accessibilityOutline}></IonIcon>
              <IonLabel>Clients</IonLabel>
            </IonItem>

            <IonItem routerLink="/articles">
              <IonIcon icon={clipboardOutline}></IonIcon>
              <IonLabel>Articles</IonLabel>
            </IonItem>

            <IonItem routerLink="/commandes">
              <IonIcon icon={cubeOutline}></IonIcon>
              <IonLabel>Commandes</IonLabel>
            </IonItem>

            <IonItem routerLink="/vehicules">
              <IonIcon icon={busOutline}></IonIcon>
              <IonLabel>Véhicules</IonLabel>
            </IonItem>

            <IonItem routerLink="/tournees">
              <IonIcon icon={walkOutline}></IonIcon>
              <IonLabel>Tournées</IonLabel>
            </IonItem>

            <IonItem routerLink="/livreurs">
              <IonIcon icon={footstepsOutline}></IonIcon>
              <IonLabel>Livreurs</IonLabel>
            </IonItem>

            <IonItem routerLink="/logout">
              <IonIcon icon={logOutOutline}></IonIcon>
              <IonLabel>Se déconnecter</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
