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
} from "@ionic/react";

import "./AddTournee.css";
import checkUserState from "../../utils/checkUserState";
import {Redirect} from "react-router-dom";

interface Tournee {
  id: number;
  name: string;
}

const AddTournee: React.FC = () => {
  const [nom, setNom] = useState<string>("");

  const [formError, setFormError] = useState<string | null>(null);

  const handleAjouterClick = () => {
    if (!nom) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("Nom:", nom);

      // Prepare data in the required format
      const clientData = {
        name: nom,
      };
      console.log(JSON.stringify(clientData));
      // Send a POST request to the API
      fetch("http://localhost:8080/tour", {
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
          console.log("Tournée ajouté avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/tournees";
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la tournée:", error);
          setFormError(
            "Une erreur s'est produite lors de l'ajout de la tournée."
          );
        });
    }
  };
  let state = checkUserState();
  if(state == "user"){
    return <Redirect to="/tournees" />
  }else if(state == "admin") {
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
  }else{
    return <Redirect to="/login" />
  }
};

export default AddTournee;
