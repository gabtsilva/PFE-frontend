import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonList,
  IonReorderGroup,
  IonReorder,
  ItemReorderEventDetail,
} from "@ionic/react";

import "./UpdateTournee.css";
import checkUserState from "../../utils/checkUserState";
import { Redirect, useParams } from "react-router-dom";

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

const UpdateTournee: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [clientsSelected, setClientsSelected] = useState<number[]>([]);
  const [clientOrder, setClientOrder] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const newClientsOrder = event.detail.complete(clientsSelected);

    console.log("Nouvel ordre :", newClientsOrder);
    setClientOrder(newClientsOrder);

    event.detail.complete();
  }

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch(`http://localhost:8080/tour/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.name || "");
      });

    fetch("http://localhost:8080/client")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);

  const handleAjouterClick = async () => {
    if (!nom) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setFormError(null);

      // Ajouter la nouvelle tournée
      const responseTournee = await fetch("http://localhost:8080/tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nom }),
      });

      if (!responseTournee.ok) {
        throw new Error(`HTTP error! Status: ${responseTournee.status}`);
      }

      const newTournee = await responseTournee.json();
      console.log("Tournée ajoutée avec succès:", newTournee);

      // Mettre à jour la tournée pour chaque client sélectionné
      const updateClientsPromises = clientsSelected.map(async (index) => {
        let indexGood = index - 1;
        console.log("for client id : ", clients[indexGood].id);
        const clientData = {
          id: clients[indexGood].id,
          address: clients[indexGood].address,
          name: clients[indexGood].name,
          phoneNumber: clients[indexGood].phoneNumber,
          childrenQuantity: clients[indexGood].childrenQuantity,
          tour: newTournee.id,
        };
        const responseUpdateClient = await fetch(
          `http://localhost:8080/client/${clients[indexGood].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(clientData),
          }
        );

        if (!responseUpdateClient.ok) {
          console.error(
            `Erreur lors de la mise à jour du client ${clients[indexGood].id}`
          );
        } else {
          console.log(
            `Client ${clients[indexGood].id} mis à jour avec succès.`
          );
        }
        console.log("update client fini");
      });

      // Attendre que toutes les mises à jour des clients soient terminées
      await Promise.all(updateClientsPromises);

      // Mettre à jour ordre de la tournée
      let indexOrder = 0;
      const updateOrderClientsPromises = clientOrder.map(async (IDclient) => {
        console.log(
          "Ordre du client id : " + IDclient + " à l'index : " + indexOrder
        );

        console.log("update ordre des clients fini");
        indexOrder++;
      });

      // Attendre que toutes les mises à jour des clients soient terminées
      await Promise.all(updateOrderClientsPromises);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tournée:", error);
      setFormError("Une erreur s'est produite lors de l'ajout de la tournée.");
    }

    window.location.href = "/tournees";
  };

  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/tournees" />;
  } else if (state == "admin") {
    return (
      <IonContent>
        <IonGrid>
          <h1 className="titre-ajout">Ajouter une tournée</h1>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonItem>
                <IonLabel position="floating">Nom de la tournée</IonLabel>
                <IonInput
                  type="text"
                  value={nom}
                  required
                  onIonChange={(e) => setNom(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonList>
                <IonItem>
                  <IonSelect
                    aria-label="Food"
                    placeholder="Selectionner un/des client(s)"
                    onIonChange={(ev) =>
                      console.log(
                        "Current value:",
                        JSON.stringify(ev.detail.value),
                        setClientsSelected(ev.detail.value)
                      )
                    }
                    multiple={true}
                  >
                    {clients.map((client) => (
                      <IonSelectOption key={client.id} value={client.id}>
                        {client.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonList>
                {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
                <IonLabel position="floating">Ordre de passage</IonLabel>
                <IonReorderGroup
                  disabled={false}
                  onIonItemReorder={handleReorder}
                >
                  {clientsSelected.map((selectedClientId) => {
                    const client = clients.find(
                      (c) => c.id === selectedClientId
                    );

                    return (
                      <IonItem key={client?.id}>
                        <IonButton
                          routerLink={`/client/update/${client?.id}`}
                          routerDirection="none"
                        >
                          <IonLabel>{client?.name}</IonLabel>
                        </IonButton>
                        <IonReorder slot="end"></IonReorder>
                      </IonItem>
                    );
                  })}
                </IonReorderGroup>
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center button-send">
            <IonCol size="12">
              <IonButton onClick={handleAjouterClick}>
                Ajouter une tournée
              </IonButton>
              <p>{formError}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default UpdateTournee;
