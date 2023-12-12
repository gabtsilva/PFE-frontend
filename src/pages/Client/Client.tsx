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
  IonButton, IonSearchbar,
} from "@ionic/react";
import {accessibilityOutline, createOutline, pencilOutline, personAddOutline} from "ionicons/icons";
import "./Client.css";
import React, { useEffect, useState } from "react";
import AddElement from "../../components/AddElement/AddElement";
import checkUserState from "../../utils/checkUserState";
import {Redirect} from "react-router-dom";
import {addOutline} from "ionicons/icons";
import {toLower} from "ionicons/dist/types/components/icon/utils";

interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  childrenQuantity: number;
  tour: number;
}

interface Tournee {
  id: number;
  name: string;
}

const Client: React.FC = () => {
  document.title = "SnappiesLog - Clients";
  const [clients, setClients] = useState<Client[]>([]);
  const [tournes, setTournes] = useState<Tournee[]>([]); // Assuming tournes is an array of strings
  const [search, setSearch] = useState("");
  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://localhost:8080/client")
      .then((response) => response.json())
      .then((data) => {
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
  // @ts-ignore
  const handleSearchChange = (event) => {
    setSearch(event.detail.value.toLowerCase());
  };

  let state = checkUserState();
  if(state == "user"){
    return <Redirect to="/tournees" />
  }else if(state == "admin"){
    return (
        <>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size="10" size-md="7">
                  <IonSearchbar placeholder="Chercher un client" value={search} onIonInput={handleSearchChange}></IonSearchbar>
                </IonCol>
                <IonCol size="auto" size-md="auto">
                  <AddElement nom="client" icone={personAddOutline}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <table>
                    <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>Nbr d'enfants</th>
                      <th>Tournée</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.filter(client => client.name.toLowerCase().includes(search)).map((client) => (
                        <tr>
                          <td>{client.name}</td>
                          <td>{client.address}</td>
                          <td>{client.phoneNumber}</td>
                          <td>{client.childrenQuantity}</td>
                          <td>{tournes.find((tour) => tour.id === client.tour)?.name}</td>
                          <td><IonButton size="small" color="success" routerLink={`/client/update/${client.id}`} routerDirection="none"><IonIcon icon={createOutline}></IonIcon></IonButton></td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
    );
  }else{
    return <Redirect to="/login" />
  }
};

export default Client;
