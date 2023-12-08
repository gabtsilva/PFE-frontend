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

const Menu: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">
          <IonList>
            <IonItem routerLink="/" routerDirection="none">
              <IonIcon icon={homeOutline}></IonIcon>
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem routerLink="/clients" routerDirection="none">
              <IonIcon icon={accessibilityOutline}></IonIcon>
              <IonLabel>Clients</IonLabel>
            </IonItem>

            <IonItem routerLink="/articles" routerDirection="none">
              <IonIcon icon={clipboardOutline}></IonIcon>
              <IonLabel>Articles</IonLabel>
            </IonItem>

            <IonItem routerLink="/commandes" routerDirection="none">
              <IonIcon icon={cubeOutline}></IonIcon>
              <IonLabel>Commandes</IonLabel>
            </IonItem>

            <IonItem routerLink="/vehicules" routerDirection="none">
              <IonIcon icon={busOutline}></IonIcon>
              <IonLabel>Véhicules</IonLabel>
            </IonItem>

            <IonItem routerLink="/tournees" routerDirection="none">
              <IonIcon icon={walkOutline}></IonIcon>
              <IonLabel>Tournées</IonLabel>
            </IonItem>

            <IonItem routerLink="/livreurs" routerDirection="none">
              <IonIcon icon={footstepsOutline}></IonIcon>
              <IonLabel>Livreurs</IonLabel>
            </IonItem>

            <IonItem routerLink="/logout" routerDirection="none">
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
