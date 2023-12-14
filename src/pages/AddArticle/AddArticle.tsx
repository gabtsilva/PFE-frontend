import React, { useState } from "react";
import {
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
} from "@ionic/react";

import "./AddArticle.css";
import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";

const AddArticle: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [pourcentage, setPourcentage] = useState<number>();
  const [formError, setFormError] = useState<string | null>(null);

  const handleAjouterClick = () => {
    if (!nom || !pourcentage) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("Nom:", nom);
      console.log("Pourcentage:", pourcentage);
      // Prepare data in the required format
      const articleData = {
        name: nom,
        pourcentage: pourcentage / 100,
      };
      console.log(JSON.stringify(articleData));
      // Send a POST request to the API
      fetch("https://bf9b-193-190-75-175.ngrok-free.app/article", {
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
  let state = checkUserState();

  if (state == "user") {
    return <Redirect to="/tournees" />;
  } else if (state == "admin") {
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
              <IonItem>
                <IonLabel position="floating">Pourcentage en surplus</IonLabel>
                <IonInput
                  type="number"
                  value={pourcentage}
                  required
                  onIonChange={(e) =>
                    setPourcentage(parseInt(e.detail.value!, 10))
                  }
                />
              </IonItem>
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
  } else {
    return <Redirect to="/login" />;
  }
};

export default AddArticle;
