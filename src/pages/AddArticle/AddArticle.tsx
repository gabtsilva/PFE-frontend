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

import "./AddArticle.css";

const AddArticle: React.FC = () => {
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
      const articleData = {
        name: nom,
      };
      console.log(JSON.stringify(articleData));
      // Send a POST request to the API
      fetch("http://localhost:8080/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log("Article ajouté avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/articles";
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'article:", error);
          setFormError(
            "Une erreur s'est produite lors de l'ajout de l'article."
          );
        });
    }
  };

  return (
    <IonContent>
      <IonGrid>
        <h1 className="titre-ajout">Ajouter un article</h1>
        <IonRow>
          <IonCol size="12" size-md="6">
            <IonItem>
              <IonLabel position="floating">Nom de l'article</IonLabel>
              <IonInput
                type="text"
                value={nom}
                required
                onIonChange={(e) => setNom(e.detail.value!)}
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" size-md="6">
            <IonButton onClick={handleAjouterClick}>
              Ajouter un article
            </IonButton>
            <p>{formError}</p>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center button-send"></IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default AddArticle;
