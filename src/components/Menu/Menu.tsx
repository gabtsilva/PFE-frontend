import {
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import {barChart, accessibility, clipboard, cube, bus, walk, footsteps, logOut} from "ionicons/icons";
import {Redirect} from "react-router-dom";
import checkUserState from "../../utils/checkUserState";

const Menu: React.FC = () => {
  let state = checkUserState();
    return (
      <>
        <IonMenu contentId="main-content">
          <IonContent className="ion-padding">
            <IonList>
              {state == "admin" ? <>
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
                  <IonItem routerLink="/commandes" routerDirection="none">
                    <IonIcon icon={clipboard}></IonIcon>
                    <IonLabel>Commandes</IonLabel>
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
                    <IonLabel>Livreurs</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </>: null}
              <IonMenuToggle>
                <IonItem routerLink="/tournees" routerDirection="none">
                  <IonIcon icon={walk}></IonIcon>
                  <IonLabel>Tournées</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/logout" routerDirection="none">
                  <IonIcon icon={logOut}></IonIcon>
                  <IonLabel>Se déconnecter</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
      </>
    );
};

export default Menu;
