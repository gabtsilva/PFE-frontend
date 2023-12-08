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
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddElement from "../../components/AddElement/AddElement";

interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  tour: number;
}

interface Tournee {
  id: number;
  name: string;
}

const Client: React.FC = () => {
  document.title = 'SnappiesLog - Clients'
  const [clients, setClients] = useState<Client[]>([]);
  const [tournes, setTournes] = useState<Tournee[]>([]); // Assuming tournes is an array of strings

  const history = useHistory();

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://localhost:8080/client")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données récupérées:", data);
        setClients(data);
        // Extracting tour IDs from client data and fetching tour data
        const tourIds = data.map((client: Client) => client.tour);
        fetchTournes(tourIds);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);

  const fetchTournes = (tourIds: number[]) => {
    // Fetch tour data for each tour ID
    const promises = tourIds.map((id) => {
      return fetch(`http://localhost:8080/tour/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Tour data récupérée:", data);
          return data; // Assuming data is a string, modify this based on your API response
        });
    });

    // Wait for all promises to resolve
    Promise.all(promises)
      .then((tournesData) => {
        setTournes(tournesData);
      })
      .catch((error) =>
        console.error("Erreur de chargement des tournées", error)
      );
  };

  return (
    <>
      <IonContent>
        <IonGrid>
          <AddElement nom="client" />
          <IonRow>
            {clients.map((client) => (
              <IonCol size="12" size-md="6" key={client.id}>
                <IonCard>
                  <IonIcon icon={accessibilityOutline}></IonIcon>
                  <IonButton
                    className="edit"
                    routerLink={`/client?id=${client.id}`}
                    routerDirection="none"
                  >
                    <IonIcon icon={pencilOutline}></IonIcon>
                  </IonButton>
                  <IonCardHeader>
                    <IonCardSubtitle>{client.address}</IonCardSubtitle>
                    <IonCardTitle>{client.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Téléphone : {client.phoneNumber}</p>
                    <p>
                      Tournée :{" "}
                      {tournes.find((tour) => tour.id === client.tour)?.name}
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default Client;
