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
  const history = useHistory();

  return (
    <>
      <IonMenu contentId="main-content">
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
    </>
  );
};

export default Menu;
