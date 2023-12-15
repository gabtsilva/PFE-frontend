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
  useIonToast,
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

interface User {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface commandesByClient {
  plannedQuantity: number;
  deliveredQuantity: number;
  changedQuantity: number;
  articleId: number;
  articleName: string;
}

let state = checkUserState();

const TourneeLivreur: React.FC = () => {
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
  const [userConnected, setUserConneted] = useState<string>();
  const [tourneeDeUser, setTourneeDeUser] = useState<TourneeExec[]>([]);
  const [maTournee, setMaTournee] = useState<TourneeExec>();
  const [commandesByClient, setCommandesByClient] = useState<
    Record<number, commandesByClient[]>
  >({});
  const [commandesByClientAfterLiv, setCommandesByClientAfterLiv] = useState<
    Record<number, commandesByClient[]>
  >({}); // copy de commandesByClient à renvoyer
  const [clickedClientId, setClickedClientId] = useState<number | null>(null);
  const [present] = useIonToast();

  const [inputValues, setInputValues] = useState<{ [key: number]: number[] }>(
    {}
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    let userData;

    // Fetching user data
    const fetchUserData = fetch(`http://localhost:8080/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: token,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setUserConneted(data);
        userData = data;
      });

    // Fetching user tournee data
    const fetchUserTourneeData = fetch(
      `http://localhost:8080/tourExecution/today/deliveryPerson/${userConnected}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTourneeDeUser(data);
        if (data.length > 0) {
          if (data[data.length - 1].state != "finie") {
            setMaTournee(data[data.length - 1]);
          } else {
            setTourneeDeUser([]);
          }
        }
      })
      .catch((error) =>
        console.error("Erreur de chargement des données tournées", error)
      );

    // Wait for both fetch operations to complete
    Promise.all([fetchUserData, fetchUserTourneeData])
      .then(() => {})
      .catch((error) => console.error("Error during fetch operations", error));
  }, [userConnected]);

  useEffect(() => {
    fetch("http://localhost:8080/tourExecution/today/state/prevue")
      .then((response) => response.json())
      .then((data) => {
        setTourneesExecUser(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données tournées", error)
      );
  }, []);

  useEffect(() => {
    // Dans votre useEffect pour récupérer l'ordre de passage pour chaque tournée
    const fetchOrdrePassageByName = tourneesExecUser.map((tourneeExecUser) =>
      fetch(`http://localhost:8080/tour/${tourneeExecUser.tourId}/getTourOrder`)
        .then((response) => response.json())
        .then((ordrePassage) => {
          const sortedOrdrePassage = ordrePassage.sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order
          );
          setOrdrePassageTournee((prevOrdrePassage) => ({
            ...prevOrdrePassage,
            [tourneeExecUser.tourId]: sortedOrdrePassage,
          }));

          ordrePassage.map((item: { clientId: any }) =>
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
              [tourneeExecUser.id]: ordrePassage,
            }));
          })
      );

      const fetchCommandes = tourneesExecUser.map((tourneeExecUser) =>
        fetch(
          `http://localhost:8080/tour/${tourneeExecUser.id}/tourExecution/allArticles`
        )
          .then((response) => response.json())
          .then((commandes) => {
            setCommandesByTourneeExec((prevCommandes) => ({
              ...prevCommandes,
              [tourneeExecUser.id]: commandes,
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

  useEffect(() => {
    if (maTournee !== undefined) {
      // Dans votre useEffect pour récupérer l'ordre de passage pour chaque tournée
      const fetchInfoTourneeUser = ordrePassageTournee[maTournee.id]?.map(
        (ordrePassage) =>
          fetch(
            `http://localhost:8080/tour/${maTournee.id}/tourExecution/allArticles/client/${ordrePassage.clientId}`
          )
            .then((response) => response.json())
            .then((dataAllCommande) => {
              setCommandesByClient((prevOrdrePassage) => ({
                ...prevOrdrePassage,
                [ordrePassage.clientId]: dataAllCommande,
              }));
              setCommandesByClientAfterLiv((prevOrdrePassage) => ({
                ...prevOrdrePassage,
                [ordrePassage.clientId]: dataAllCommande,
              }));
            })
      );
      // Utilisez Promise.all pour attendre la fin de toutes les promesses
      Promise.all(fetchInfoTourneeUser);
    }
  }, [ordrePassageTournee]);

  const handleClick = (id: number) => {
    // Mettez le code que vous voulez exécuter ici
    fetch(`http://localhost:8080/user/${userConnected}`)
      .then((response) => response.json())
      .then((data) => {
        let userComplet: User = {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          isAdmin: data.admin,
        };
        fetch(`http://localhost:8080/tour/${id}/tourExecution/deliveryPerson`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userComplet),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then((data) => {
            window.location.reload();
          });
      })
      .catch((error) => {
        console.error("Erreur lors de l'attribution à l'user", error);
      });
  };

  const marquerPasser = (id: number) => {
    setClickedClientId(id);
  };

  const clientSoumission = (clientId: number, index: number, value: number) => {
    setInputValues((prevInputValues) => {
      const clientInputs = prevInputValues[clientId] || [];
      const updatedClientInputs = [...clientInputs];
      updatedClientInputs[index] = value;

      return {
        ...prevInputValues,
        [clientId]: updatedClientInputs,
      };
    });
  };

  const envoyerLivraisons = (clientId: number, idTournee: number) => {
    const livraisons = inputValues[clientId] || [];
    livraisons.forEach((livraison, index) => {
      commandesByClientAfterLiv[clientId][index].deliveredQuantity = livraison;
    });
    fetch(
      `http://localhost:8080/tour/${idTournee}/tourExecution/distributeArticle/client/${clientId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commandesByClientAfterLiv[clientId]),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    });
    present({
      message: "Livraison validée !",
      duration: 2500,
      position: "bottom",
      color:"success"
    });
  };

  const redirectToGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/place/${encodedAddress}`;
    window.open(googleMapsUrl, "_blank");
  };

  const finirTournee = (id: number) => {
    fetch(`http://localhost:8080/tour/${id}/tourExecution/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMaTournee(undefined);
      window.location.href = "/tourneesLivreur";
    });
  };

  if (state == "user") {
    if (tourneeDeUser.length === 0 && maTournee == undefined) {
      return (
        <>
          <IonContent>
            <IonGrid className="grid-card">
              <h2>Tournées disponibles</h2>
              <IonRow>
                {tourneesExecUser
                  .filter(
                    (tourneeExecUser) => tourneeExecUser.deliveryPerson === null
                  )
                  .map((tourneeExecUser) => (
                    <IonCol size="12" size-md="6" key={tourneeExecUser.id}>
                      <IonCard>
                        <IonIcon icon={walk}></IonIcon>
                        <IonCardHeader>
                          <IonCardTitle>
                            {
                              tournees.find(
                                (tournee) =>
                                  tournee.id === tourneeExecUser.tourId
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
                              {ordrePassageTournee[tourneeExecUser.id]
                                ?.sort((a, b) => a.order - b.order)
                                .map((ordrePassage) => (
                                  <tr key={ordrePassage.clientId}>
                                    <td>
                                      {
                                        clientsDetails[ordrePassage.clientId]
                                          ?.name
                                      }
                                    </td>
                                    <td>
                                      <a
                                        className="button-map"
                                        onClick={() =>
                                          redirectToGoogleMaps(
                                            clientsDetails[
                                              ordrePassage.clientId
                                            ]?.address
                                          )
                                        }
                                      >
                                        {
                                          clientsDetails[ordrePassage.clientId]
                                            ?.address
                                        }
                                      </a>
                                    </td>
                                  </tr>
                                ))}
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
                                (commande) =>
                                  commande ? (
                                    <tr key={commande.id}>
                                      <td>{commande.name}</td>
                                      <td>{commande.planned_quantity} </td>
                                      <td>{commande.total_with_surplus}</td>
                                    </tr>
                                  ) : null
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
      if (maTournee !== undefined) {
        return (
          <>
            <IonContent>
              <IonGrid className="grid-card">
                <h2>Votre tournée</h2>

                <IonCol size="8" key={maTournee.id}>
                  <IonCard>
                    <IonIcon icon={walk}></IonIcon>
                    <IonCardHeader>
                      <IonCardTitle>
                        {
                          tournees.find(
                            (tournee) => tournee.id === maTournee.id
                          )?.name
                        }
                      </IonCardTitle>
                      <IonCardSubtitle>
                        {new Date(
                          maTournee.executionDate[0],
                          maTournee.executionDate[1] - 1, // Les mois dans JavaScript commencent à 0, donc on soustrait 1
                          maTournee.executionDate[2]
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
                          {ordrePassageTournee[maTournee.id]
                            ?.sort((a, b) => a.order - b.order)
                            .map((ordrePassage) => (
                              <tr key={ordrePassage.clientId}>
                                <td>
                                  {clientsDetails[ordrePassage.clientId]?.name}
                                </td>
                                <td>
                                  <a
                                    className="button-map"
                                    onClick={() =>
                                      redirectToGoogleMaps(
                                        clientsDetails[ordrePassage.clientId]
                                          ?.address
                                      )
                                    }
                                  >
                                    {
                                      clientsDetails[ordrePassage.clientId]
                                        ?.address
                                    }
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <br></br>
                      <div className="info-commandes">
                        <br></br>
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
                            {commandesByTourneeExec[maTournee.id]?.map(
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
                        <br></br>
                        {Object.keys(commandesByClient).map((clientId) => (
                          <div key={clientId} className="info-client-commandes">
                            <h4>
                              Commandes pour :{" "}
                              {clientsDetails[parseInt(clientId, 10)].name
                                ? clientsDetails[parseInt(clientId, 10)].name
                                : ""}
                            </h4>
                            <table>
                              <thead>
                                <tr>
                                  <th>Nom</th>
                                  <th>Quantité pour cette tournée</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commandesByClient[parseInt(clientId, 10)]?.map(
                                  (commande: commandesByClient) => (
                                    <tr>
                                      <td>{commande.articleName}</td>
                                      <td>{commande.changedQuantity}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            {clickedClientId !== parseInt(clientId, 10) ? (
                              <IonButton
                                className="btn-passer"
                                size="small"
                                onClick={() =>
                                  marquerPasser(parseInt(clientId, 10))
                                }
                              >
                                Marquer comme passé
                              </IonButton>
                            ) : (
                              ""
                            )}
                            {clickedClientId === parseInt(clientId, 10)
                              ? commandesByClient[parseInt(clientId, 10)]?.map(
                                  (
                                    commande: commandesByClient,
                                    index: number
                                  ) => (
                                    <div
                                      key={index}
                                      className="info-liv input-article-livre"
                                    >
                                      <label htmlFor="">
                                        Quantité livrée pour l'article{" "}
                                        {commande.articleName} :
                                      </label>
                                      <input
                                        type="number"
                                        value={
                                          (inputValues[
                                            parseInt(clientId, 10)
                                          ] || [])[index] || ""
                                        }
                                        onChange={(e) =>
                                          clientSoumission(
                                            parseInt(clientId, 10),
                                            index,
                                            +e.target.value
                                          )
                                        }
                                        placeholder="Nombres"
                                      />
                                    </div>
                                  )
                                )
                              : ""}
                            {clickedClientId === parseInt(clientId, 10) ? (
                              <IonButton
                                className="btn-passer"
                                size="small"
                                onClick={() =>
                                  envoyerLivraisons(
                                    parseInt(clientId, 10),
                                    maTournee.id
                                  )
                                }
                              >
                                Envoyer
                              </IonButton>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                      <br></br>
                      <IonButton
                        routerLink={`/tourneeExecution/${maTournee.id}`}
                        routerDirection="none"
                      >
                        En savoir plus
                      </IonButton>
                      <IonButton
                        color="danger"
                        onClick={() => finirTournee(maTournee.id)}
                      >
                        Je fini la tournée
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonRow></IonRow>
              </IonGrid>
            </IonContent>
          </>
        );
      }
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default TourneeLivreur;
