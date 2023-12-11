import {
  IonContent,
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
import { walk, pencilOutline } from "ionicons/icons";
import "./Tournee.css";
import { useEffect, useState } from "react";
import AddElement from "../../components/AddElement/AddElement";

interface Tournee {
  id: number;
  name: string;
}
interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  childrenQuantity: number;
  tour: number;
}

const Tournee: React.FC = () => {
  document.title = "SnappiesLog - Tournées";
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [clientsByTournee, setClientsByTournee] = useState<
    Record<number, Client[]>
  >({});

  useEffect(() => {
    fetch("http://localhost:8080/tour")
      .then((response) => response.json())
      .then((data) => {
        setTournees(data);

        // Fetch clients for each tournee
        const fetchClients = data.map((tournee: Tournee) =>
          fetch(`http://localhost:8080/client/tour/${tournee.id}`)
            .then((response) => response.json())
            .then((clients) => {
              setClientsByTournee((prevClients) => ({
                ...prevClients,
                [tournee.id]: clients,
              }));
            })
        );

        // Wait for all client fetches to complete
        Promise.all(fetchClients).catch((error) =>
          console.error("Erreur de chargement des données clients", error)
        );
      })
      .catch((error) =>
        console.error("Erreur de chargement des données tournées", error)
      );
  }, []);

  return (
    <>
      <IonContent>
        <IonGrid>
          <AddElement nom="tournee" />
          <IonRow>
            {tournees.map((tournee) => (
              <IonCol size="12" size-md="6" key={tournee.id}>
                <IonCard>
                  <IonIcon icon={walk}></IonIcon>
                  <IonButton
                    className="edit"
                    routerLink={`/tour/update/${tournee.id}`}
                    routerDirection="none"
                  >
                    <IonIcon icon={pencilOutline}></IonIcon>
                  </IonButton>
                  <IonCardHeader>
                    <IonCardTitle>{tournee.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="clients-tour">
                    <p>Clients dans cette tournee : </p>
                    <ul>
                      {clientsByTournee[tournee.id]?.map((client) => (
                        <IonButton
                          routerLink={`/client/update/${client.id}`}
                          routerDirection="none"
                        >
                          <li key={client.id}>{client.name}</li>
                        </IonButton>
                      ))}
                    </ul>
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

export default Tournee;
