import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonButton,
} from "@ionic/react";

import "./TourneeHome.css";
import { walk, pencilOutline } from "ionicons/icons";

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

interface User {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  isAdmin: boolean;
}

const TourneeHome: React.FC = () => {
  document.title = "SnappiesLog - Tournées";
  const [tournees, setTournees] = useState<Tournee[]>([]);

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
  // État pour stocker les détails de tous les utilisateurs
  const [usersDetails, setUsersDetails] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch("http://localhost:8080/tour/tourExecution")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTourneesExecUser(data);
        console.log("tourneeExecUser : " + JSON.stringify(tourneesExecUser));
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
            const sortedOrdrePassage = ordrePassage.sort(
              (a: { order: number }, b: { order: number }) => a.order - b.order
            );
            setOrdrePassageTournee((prevOrdrePassage) => ({
              ...prevOrdrePassage,
              [tourneeExecUser.tourId]: sortedOrdrePassage,
            }));
            sortedOrdrePassage.map((item: { clientId: any }) =>
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
            console.log("TOUTES LES COMMANDES : " + JSON.stringify(commandes));
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

  const fetchUserDetails = (deliveryPerson: string) => {
    if (!deliveryPerson) {
      return;
    }

    fetch(`http://localhost:8080/user/${deliveryPerson}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("info user = " + JSON.stringify(data));
        setUsersDetails((prevUsersDetails) => ({
          ...prevUsersDetails,
          [data.email]: data, // Utilisez l'e-mail comme clé
        }));
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur",
          error
        );
      });
  };

  // Effet pour récupérer les détails de l'utilisateur lorsque deliveryPerson change
  useEffect(() => {
    tourneesExecUser.forEach((tourneeExecUser) => {
      fetchUserDetails(tourneeExecUser.deliveryPerson);
    });
  }, [tourneesExecUser]);

  const handleClick = (id: number) => {
    // Mettez le code que vous voulez exécuter ici
    console.log("Bouton cliqué ! " + id);
    console.log(JSON.stringify(ordrePassageTournee[id]));
  };

  // Fonction pour générer le lien vers les détails de l'utilisateur
  const generateUserLink = (deliveryPerson: string) => {
    if (!deliveryPerson) {
      return "/";
    }

    const user = usersDetails[deliveryPerson];

    return (
      <a
        href={user ? `tel:${user.phoneNumber}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        {user ? `${user.firstname} ${user.lastname}` : "Utilisateur inconnu"}
      </a>
    );
  };
  return (
    <>
      <IonGrid>
        <h2>Tournées du jour</h2>
        <IonRow>
          {tourneesExecUser.length !== 0 ? (
            tourneesExecUser.map((tourneeExecUser) => (
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
                      <h6 className="title-state">
                        - {tourneeExecUser.state} -{" "}
                      </h6>
                      <br></br>
                      {new Date(
                        tourneeExecUser.executionDate[0],
                        tourneeExecUser.executionDate[1] - 1, // Les mois dans JavaScript commencent à 0, donc on soustrait 1
                        tourneeExecUser.executionDate[2]
                      ).toLocaleDateString("fr-FR")}
                      <br></br>
                      <br></br>
                      Opéré par :{" "}
                      {generateUserLink(tourneeExecUser.deliveryPerson)}
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
                                {clientsDetails[ordrePassage.clientId]?.address}
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

                    <IonButton onClick={() => handleClick(tourneeExecUser.id)}>
                      En savoir plus
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          ) : (
            <h3 className="no-tournee">Pas de tournée aujourd'hui.</h3>
          )}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default TourneeHome;
