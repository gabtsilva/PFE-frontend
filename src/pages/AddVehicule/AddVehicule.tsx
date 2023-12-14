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
} from "@ionic/react";

import "./AddVehicule.css";
import checkUserState from "../../utils/checkUserState";
import {Redirect} from "react-router-dom";

const AddVehicule: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number>();
  const [formError, setFormError] = useState<string | null>(null);

  const handleAjouterClick = () => {
    if (!nom || !plate || maxQuantity === undefined) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("Nom:", nom);
      console.log("plate:", plate);
      console.log("maxQuantity:", maxQuantity);
      // Prepare data in the required format
      const vehiculeData = {
        name: nom,
        plate: plate,
        maxQuantity: maxQuantity,
      };
      console.log(JSON.stringify(vehiculeData));
      // Send a POST request to the API
      fetch("https://bf9b-193-190-75-175.ngrok-free.app/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculeData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log("Vehicule ajouté avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/vehicules";
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du vehicule:", error);
          setFormError(
            "Une erreur s'est produite lors de l'ajout du vehicule."
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
            <h1 className="titre-ajout">Ajouter un véhicule</h1>
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonItem>
                  <IonLabel position="floating">Nom du véhicule</IonLabel>
                  <IonInput
                      type="text"
                      value={nom}
                      required
                      onIonChange={(e) => setNom(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Plaque du véhicule</IonLabel>
                  <IonInput
                      type="text"
                      value={plate}
                      required
                      onIonChange={(e) => setPlate(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonItem>
                  <IonLabel position="floating">
                    Nombres de caisse stockable
                  </IonLabel>
                  <IonInput
                      type="number"
                      value={maxQuantity}
                      required
                      onIonChange={(e) => setMaxQuantity(parseFloat(e.detail.value!))}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center button-send">
              <IonCol size="12">
                <IonButton onClick={handleAjouterClick}>
                  Ajouter un véhicule
                </IonButton>
                <p>{formError}</p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    );
  }
};

export default AddVehicule;
