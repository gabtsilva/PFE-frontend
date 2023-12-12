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
  executionDate: number[];
}

interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  childrenQuantity: number;
  tour: number;
}

interface Commande {
  id: number;
  name: string;
  planned_quantity: number;
  total_with_surplus: number;
}

interface OrdrePassage {
  clientId: number;
  tourId: number;
  order: number;
}

let state = checkUserState();

const TourneeLivreur: React.FC = () => {
  document.title = "SnappiesLog - Tournées";
  const [tournees, setTournees] = useState<Tournee[]>([]);
  const [clientsByTournee, setClientsByTournee] = useState<
    Record<number, number[]>
  >({});
  const [tourneesExecUser, setTourneesExecUser] = useState<TourneeExec[]>([]);
  const [commandesByTourneeExec, setCommandesByTourneeExec] = useState<
    Record<number, Commande[]>
  >({});

  const [ordrePassageTournee, setOrdrePassageTournee] = useState<
    Record<number, OrdrePassage[]>
  >({});

  const [clientsDetails, setClientsDetails] = useState<Record<number, Client>>(
    {}
  );

  useEffect(() => {
    fetch("http://localhost:8080/tour/tourExecution")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTourneesExecUser(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données tournées", error)
      );
  }, []);

  useEffect(() => {
    if (tourneesExecUser.length > 0) {
      // Fetch other data only if tourneesExecUser has data
      const fetchTournees = tourneesExecUser.map((tourneeExecUser) =>
        fetch(`http://localhost:8080/tour/${tourneeExecUser.tourId}`)
          .then((response) => response.json())
          .then((data) => {
            setTournees((prevTournees) => [...prevTournees, data]);
          })
      );

      // Dans votre useEffect pour récupérer l'ordre de passage pour chaque tournée
      const fetchOrdrePassage = tourneesExecUser.map((tourneeExecUser) =>
        fetch(
          `http://localhost:8080/tour/${tourneeExecUser.tourId}/getTourOrder`
        )
          .then((response) => response.json())
          .then((ordrePassage) => {
            setOrdrePassageTournee((prevOrdrePassage) => ({
              ...prevOrdrePassage,
              [tourneeExecUser.tourId]: ordrePassage,
            }));
          })
      );

      // Dans votre useEffect pour récupérer l'ordre de passage pour chaque tournée
      const fetchOrdrePassageByName = tourneesExecUser.map((tourneeExecUser) =>
        fetch(
          `http://localhost:8080/tour/${tourneeExecUser.tourId}/getTourOrder`
        )
          .then((response) => response.json())
          .then((ordrePassage) => {
            setOrdrePassageTournee((prevOrdrePassage) => ({
              ...prevOrdrePassage,
              [tourneeExecUser.tourId]: ordrePassage,
            }));
            ordrePassage.map((item) =>
              fetch(`http://localhost:8080/client/${item.clientId}`)
                .then((response) => response.json())
                .then((clientDetails) => {
                  setClientsDetails((prevClientsDetails) => ({
                    ...prevClientsDetails,
                    [item.clientId]: clientDetails,
                  }));
                })
            );
          })
      );

      const fetchCommandes = tourneesExecUser.map((tourneeExecUser) =>
        fetch(
          `http://localhost:8080/tour/${tourneeExecUser.tourId}/tourExecution/allArticles`
        )
          .then((response) => response.json())
          .then((commandes) => {
            setCommandesByTourneeExec((prevCommandes) => ({
              ...prevCommandes,
              [tourneeExecUser.tourId]: commandes,
            }));
          })
      );

      // Wait for all fetches to complete
      Promise.all([
        ...fetchTournees,
        ...fetchOrdrePassage,
        ...fetchCommandes,
        ...fetchOrdrePassageByName,
      ]).catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
    }
  }, [tourneesExecUser]);

  const handleClick = (id: number) => {
    // Mettez le code que vous voulez exécuter ici
    console.log("Bouton cliqué ! " + id);
    console.log(JSON.stringify(ordrePassageTournee));
  };

  if (state == "user") {
    return (
      <>
        <IonContent>
          <IonGrid>
            <h2>Tournées disponibles</h2>
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
                      <p>Ordre des clients dans cette tournée : </p>
                      <table className="ion-margin-bottom">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Adresse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordrePassageTournee[tourneeExecUser.id]?.map(
                            (ordrePassage) => (
                              <tr key={ordrePassage.clientId}>
                                <td>
                                  {clientsDetails[ordrePassage.clientId]?.name}
                                </td>
                                <td>
                                  {
                                    clientsDetails[ordrePassage.clientId]
                                      ?.address
                                  }
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <p>Commandes dans cette tournée :</p>

                      <table className="ion-margin-bottom">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Quantité prévue</th>
                            <th>Quantité avec surplus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commandesByTourneeExec[tourneeExecUser.id]?.map(
                            (commande) => (
                              <tr key={commande.id}>
                                <td>{commande.name}</td>
                                <td>{commande.planned_quantity} </td>
                                <td>{commande.total_with_surplus}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>

                      <IonButton
                        onClick={() => handleClick(tourneeExecUser.id)}
                      >
                        Je prends la tournée
                      </IonButton>
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
