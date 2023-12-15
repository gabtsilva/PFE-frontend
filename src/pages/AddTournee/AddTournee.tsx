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
  IonDatetime,
} from "@ionic/react";

import "./AddTournee.css";
import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";

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

interface OrdrePassage {
  clientId: number;
  tourId: number;
  order: number;
}

interface TourneeExec {
  state: string;
  deliveryPerson: string | null;
  vehicleId: number;
  tourId: number;
  executionDate: string | null;
}

interface Vehicule {
  id: number;
  name: string;
  plate: string;
  maxQuantity: number;
}

const AddTournee: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [clientsSelected, setClientsSelected] = useState<number[]>([]);
  const [clientOrder, setClientOrder] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedVehicule, setselectedVehicule] = useState<number>();
  const [listVehicule, setlistVehicule] = useState<Vehicule[]>([]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const newClientsOrder = event.detail.complete(clientsSelected);
    setClientOrder(newClientsOrder);
    event.detail.complete();
  }

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://localhost:8080/client")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://localhost:8080/vehicle")
      .then((response) => response.json())
      .then((data) => {
        setlistVehicule(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);

  function secondRequest() {}
  const handleAjouterClick = async () => {
    if (!nom || !selectedVehicule) {
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
      let listIdClientSelected = clients;
      listIdClientSelected.sort((a, b) => {
        return a.id - b.id;
      });
      const updateOrderClientsPromises = async () => {
        // Créez un tableau pour stocker les promesses
        const promises: Promise<void>[] = [];
        let arrayPassage: OrdrePassage[] = [];
        for (const [index, element] of clientOrder.entries()) {
          let i = index + 1;
          let passage: OrdrePassage = {
            clientId: element,
            tourId: newTournee.id,
            order: i,
          };
          arrayPassage.push(passage);
        }
        // Ajoutez la promesse à votre tableau
        const response = await fetch(
          `http://localhost:8080/tour/${newTournee.id}/createTourOrder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(arrayPassage), // Notez que le body doit être un tableau
          }
        );

        // Vérifiez la réponse et lancez une erreur si nécessaire
        if (!response.ok) {
          throw new Error(`Erreur lors de la requête: ${response.statusText}`);
        }

        // Ajoutez la promesse à votre tableau
        promises.push(Promise.resolve());

        // Retournez le tableau de promesses
        return promises;
      };

      const createExecution = async () => {
        // Créez un tableau pour stocker les promesses
        const promises: Promise<void>[] = [];
        let tourneeExec: TourneeExec = {
          executionDate: selectedDate ? selectedDate : null,
          state: "prévue",
          deliveryPerson: null,
          vehicleId: selectedVehicule,
          tourId: newTournee.id,
        };
        // Ajoutez la promesse à votre tableau
        const response = await fetch(
          `http://localhost:8080/tour/${newTournee.id}/tourExecution`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tourneeExec), // Notez que le body doit être un tableau
          }
        );

        // Vérifiez la réponse et lancez une erreur si nécessaire
        if (!response.ok) {
          throw new Error(`Erreur lors de la requête: ${response.statusText}`);
        }

        // Ajoutez la promesse à votre tableau
        promises.push(Promise.resolve());

        // Retournez le tableau de promesses
        return promises;
      };
      // Utilisez directement la fonction pour obtenir le tableau de promesses
      // Attendre que toutes les mises à jour des clients soient terminées

      const promisesArray: Promise<void>[] = await updateOrderClientsPromises();
      await createExecution();
      // Passez le tableau de promesses à Promise.all
      await Promise.all(promisesArray);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tournée:", error);
      setFormError("Une erreur s'est produite lors de l'ajout de la tournée.");
    }

    window.location.href = "/tournees";
  };

  const dateChanged = (value: any) => {
    const dateObject = new Date(value);

    // Extraction des composants
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
    const day = dateObject.getDate().toString().padStart(2, "0");

    // Création de la nouvelle chaîne de date au format "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  };

  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/tournees" />;
  } else if (state == "admin") {
    return (
      <IonContent>
        <IonGrid className="grid-tournee">
          <h1 className="titre-ajout">Ajouter une tournée</h1>
          <IonRow>
            <IonCol size="12" size-md="12">
              <IonItem>
                <IonLabel position="floating">Nom de la tournée</IonLabel>
                <IonInput
                  type="text"
                  value={nom}
                  required
                  onIonChange={(e) => setNom(e.detail.value!)}
                />
              </IonItem>
              <br></br>
              <IonItem className="no-border">
                <IonDatetime
                  onIonChange={(e) => dateChanged(e.detail.value)}
                  locale="en-US"
                  showDefaultButtons={true}
                  min="2023"
                  max="2024"
                  className="calendar"
                  presentation="date"
                >
                  <span slot="title">Jour de la 1er livrai</span>
                </IonDatetime>
              </IonItem>
              <p>laissez vide pour le rendre actif aujourd'hui</p>
              <br></br>
              <IonItem>
                <IonSelect
                  className="select-option"
                  aria-label="Vehicule"
                  placeholder="Selectionner un véhicule"
                  onIonChange={(ev) => {
                    setselectedVehicule(ev.detail.value);
                  }}
                >
                  {listVehicule.map((vehicle) => (
                    <IonSelectOption key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
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

export default AddTournee;
