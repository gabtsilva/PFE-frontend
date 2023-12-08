import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { accessibilityOutline, pencilOutline } from "ionicons/icons";
import "./Client.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../components/Menu";

interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  tour: number;
}

const Client: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Effect hook pour récupérer les données de l'API
    fetch("http://localhost:8080/client")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données récupérées:", data);
        setClients(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <Menu />
      <IonContent>
        <IonGrid>
          <IonRow>
            {clients.map((client) => (
              <IonCol size="12" size-md="6" key={client.id}>
                <IonCard>
                  <IonIcon icon={accessibilityOutline}></IonIcon>
                  <IonButton
                    className="edit"
                    onClick={() => history.replace(`/client?id=` + client.id)}
                  >
                    <IonIcon icon={pencilOutline}></IonIcon>
                  </IonButton>
                  <IonCardHeader>
                    <IonCardSubtitle>{client.address}</IonCardSubtitle>
                    <IonCardTitle>{client.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Téléphone : {client.phoneNumber}</p>
                    <p>Tour : {client.tour}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Client;
