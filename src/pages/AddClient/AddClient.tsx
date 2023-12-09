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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import "./AddClient.css";

interface Tournee {
  id: number;
  name: string;
}

const AddClient: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [nombreEnfants, setNombreEnfants] = useState<number | undefined>();
  const [adress, setAdress] = useState<string>("");
  const [trouneeChoisie, setTourneeChoisie] = useState<number | undefined>();
  const [tours, setTours] = useState<Tournee[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    // Fetch tour data from the API
    fetch("http://localhost:8080/tour")
      .then((response) => response.json())
      .then((data) => {
        // Extracting tour names from the data
        const tourNames = data.map((tour: Tournee) => tour);
        setTours(tourNames);
      })
      .catch((error) =>
        console.error("Erreur de chargement des tournées", error)
      );
  }, []);

  const handleAjouterClick = () => {
    if (!nom || !nombreEnfants || !trouneeChoisie || !adress || !phone) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("Nom:", nom);
      console.log("Adress:", adress);
      console.log("Phone:", phone);
      console.log("Nombre d'enfants:", nombreEnfants);
      console.log("numéro de tournée:", trouneeChoisie);

      // Prepare data in the required format
      const clientData = {
        address: adress,
        name: nom,
        phoneNumber: phone,
        childrenQuantity: nombreEnfants,
        tour: trouneeChoisie,
      };
      console.log(JSON.stringify(clientData));
      // Send a POST request to the API
      fetch("http://localhost:8080/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log("Client ajouté avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/clients";
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du client:", error);
          setFormError("Une erreur s'est produite lors de l'ajout du client.");
        });
    }
  };

  return (
    <IonContent>
      <IonGrid>
        <h1 className="titre-ajout">Ajouter un client</h1>
        <IonRow>
          <IonCol size="12" size-md="6">
            <IonItem>
              <IonLabel position="floating">Nom de la crèche</IonLabel>
              <IonInput
                type="text"
                value={nom}
                required
                onIonChange={(e) => setNom(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Adresse</IonLabel>
              <IonInput
                type="text"
                required
                value={adress}
                onIonChange={(e) => setAdress(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Numéro de téléphone</IonLabel>
              <IonInput
                type="text"
                required
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" size-md="6">
            <IonItem>
              <IonLabel position="floating">Nombre d'enfants</IonLabel>
              <IonInput
                type="number"
                value={nombreEnfants}
                required
                onIonChange={(e) =>
                  setNombreEnfants(parseFloat(e.detail.value!))
                }
              />
            </IonItem>
            <IonItem className="tournee-input">
              <IonLabel>Tournées</IonLabel>
              <IonSelect
                onIonChange={(e) =>
                  setTourneeChoisie(parseFloat(e.detail.value!))
                }
              >
                {tours.map((tour, index) => (
                  <IonSelectOption
                    key={index}
                    value={tour.id}
                    aria-required={trouneeChoisie === tour.id}
                  >
                    {tour.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center button-send">
          <IonCol size="12">
            <IonButton onClick={handleAjouterClick}>
              Ajouter le client
            </IonButton>
            <p>{formError}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddClient;
