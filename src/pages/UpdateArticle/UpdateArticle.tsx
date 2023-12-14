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

import { Redirect, useParams } from "react-router-dom";

import "./UpdateArticle.css";
import checkUserState from "../../utils/checkUserState";

interface Tournee {
  id: number;
  name: string;
}

const UpdateArticle: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [pourcentage, setPourcenatge] = useState<number>();
  const [formError, setFormError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/article/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.name || "");
        if (data.pourcentage) {
          let vraiPourcentage = data.pourcentage * 100;
          setPourcenatge(vraiPourcentage);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'article:",
          error
        );
      });
  }, [id]);

  const handleAjouterClick = () => {
    if (!nom || !pourcentage) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      let pourcentageGood = pourcentage / 100;
      // Prepare data in the required format
      const articleData = {
        id: id,
        name: nom,
        pourcentage: pourcentageGood,
      };
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
  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/tournees" />;
  } else if (state == "admin") {
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
              <IonItem>
                <IonLabel position="floating">Pourcentage</IonLabel>
                <IonInput
                  type="number"
                  value={pourcentage}
                  required
                  onIonChange={(e) => setPourcenatge(parseInt(e.detail.value!))}
                />
              </IonItem>
              <IonButton onClick={handleAjouterClick}>
                Modifier l'article
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

export default UpdateArticle;
