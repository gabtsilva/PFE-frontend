import React, { useState, useEffect } from "react";
import {
  IonContent,
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

import { useParams } from "react-router-dom";

import "./UpdateArticle.css";

interface Tournee {
  id: number;
  name: string;
}

const UpdateArticle: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/article/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.name || "");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'article:",
          error
        );
      });
  }, [id]);

  const handleAjouterClick = () => {
    if (!nom) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("Nom:", nom);

      // Prepare data in the required format
      const articleData = {
        id: id,
        name: nom,
      };
      console.log(JSON.stringify(articleData));
      // Send a POST request to the API
      fetch(`http://localhost:8080/article/${id}`, {
        method: "PUT",
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
          console.log("Article a été modifié avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/articles";
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du Article:", error);
          setFormError("Une erreur s'est produite lors de l'ajout du Article.");
        });
    }
  };

  return (
    <IonContent>
      <IonGrid>
        <h1 className="titre-ajout">Modifier l'article : {nom}</h1>
        <IonRow>
          <IonCol size="12" size-md="6">
            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
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
              Modifier l'article
            </IonButton>
            <p>{formError}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default UpdateArticle;
