import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonCardSubtitle,
} from "@ionic/react";
import { walk, pencilOutline } from "ionicons/icons";
import "./TourneeLivreur.css";
import React, { useEffect, useState } from "react";
import AddElement from "../../components/AddElement/AddElement";
import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";

interface Tournee {
  id: number;
  name: string;
}

interface TourneeExec {
  id: number;
  state: string;
  deliveryPerson: string;
  vehicleId: number;
  tourId: number;
  executionDate: [];
}

interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  childrenQuantity: number;
  tour: number;
}

let state = checkUserState();

const TourneeLivreur: React.FC = () => {
  document.title = "SnappiesLog - Tournées";
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [clientsByTournee, setClientsByTournee] = useState<
    Record<number, Client[]>
  >({});
  const [tourneesExecUser, setTourneesExecUser] = useState<TourneeExec[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/tour/tourExecution")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTourneesExecUser(data);

        let tourneeActuel: Tournee[] = [];
        data.map((tourneeExec: TourneeExec) => {
          fetch(`http://localhost:8080/tour/${tourneeExec.tourId}`)
            .then((response) => response.json())
            .then((data) => {
              tourneeActuel.push(data);
            });
        });

        setTournees(tourneeActuel);

        console.log("tournée toruvés : " + JSON.stringify(tournees));

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
      //})
      .catch((error) =>
        console.error("Erreur de chargement des données tournées", error)
      );
  }, []);

  if (state == "user") {
    return (
      <>
        <IonContent>
          <IonGrid>
            <IonRow>
              {tourneesExecUser.map((tourneeExecUser) => (
                <IonCol size="12" size-md="6" key={tourneeExecUser.id}>
                  <IonCard>
                    <IonIcon icon={walk}></IonIcon>
                    <IonCardHeader>
                      <IonCardTitle>
                        {
                          tournees.find(
                            (tournee) => tournee.id === tourneeExecUser.id
                          )?.name
                        }
                      </IonCardTitle>
                      <IonCardSubtitle>
                        {new Date(
                          tourneeExecUser.executionDate[0],
                          tourneeExecUser.executionDate[1] - 1, // Les mois dans JavaScript commencent à 0, donc on soustrait 1
                          tourneeExecUser.executionDate[2]
                        ).toLocaleDateString("fr-FR")}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="clients-tour">
                      <p>Clients dans cette tournee : </p>
                      <ul>
                        {clientsByTournee[tourneeExecUser.id]?.map((client) => (
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
  } else {
    return <Redirect to="/login" />;
  }
};

export default TourneeLivreur;
