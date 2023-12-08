import {
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
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
  if (localStorage.getItem("token") !== null) {
    return (
      <>
        <IonMenu contentId="main-content">
          <IonContent className="ion-padding">
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/" routerDirection="none">
                  <IonIcon icon={homeOutline}></IonIcon>
                  <IonLabel>Home</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/clients" routerDirection="none">
                  <IonIcon icon={accessibilityOutline}></IonIcon>
                  <IonLabel>Clients</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/articles" routerDirection="none">
                  <IonIcon icon={clipboardOutline}></IonIcon>
                  <IonLabel>Articles</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/commandes" routerDirection="none">
                  <IonIcon icon={cubeOutline}></IonIcon>
                  <IonLabel>Commandes</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/vehicules" routerDirection="none">
                  <IonIcon icon={busOutline}></IonIcon>
                  <IonLabel>Véhicules</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/tournees" routerDirection="none">
                  <IonIcon icon={walkOutline}></IonIcon>
                  <IonLabel>Tournées</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/livreurs" routerDirection="none">
                  <IonIcon icon={footstepsOutline}></IonIcon>
                  <IonLabel>Livreurs</IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem routerLink="/logout" routerDirection="none">
                  <IonIcon icon={logOutOutline}></IonIcon>
                  <IonLabel>Se déconnecter</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
      </>
    );
  } else {
    return (
      <>
        <IonMenu contentId="main-content">
          <IonContent className="ion-padding">
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/login" routerDirection="none">
                  <IonIcon icon={homeOutline}></IonIcon>
                  <IonLabel>Se connecter</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
      </>
    );
  }
};

export default Menu;
