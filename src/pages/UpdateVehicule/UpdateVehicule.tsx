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
} from "@ionic/react";

import { Redirect, useParams } from "react-router-dom";

import "./UpdateVehicule.css";
import checkUserState from "../../utils/checkUserState";
import { cellular } from "ionicons/icons";

const UpdateUpdate: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number | null>();
  const [formError, setFormError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/vehicle/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.name || "");
        setPlate(data.plate || "");
        setMaxQuantity(data.maxQuantity || null);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données du vehicule:",
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

      // Prepare data in the required format
      const vehiculeData = {
        id: id,
        name: nom,
        plate: plate,
        maxQuantity: maxQuantity,
      };
      // Send a POST request to the API
      fetch(`http://localhost:8080/vehicle/${id}`, {
        method: "PUT",
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
          // Reset form error state
          setFormError(null);
          window.location.href = "/vehicules";
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du vehicule:", error);
          setFormError(
            "Une erreur s'est produite lors de l'ajout du vehicule."
          );
        });
    }
  };
  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/" />;
  } else if (state == "admin") {
    return (
      <IonContent>
        <IonGrid>
          <h1 className="titre-ajout">Modifier un vehicule : {nom}</h1>
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
                <IonLabel position="floating">Plate</IonLabel>
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
                  onIonChange={(e) =>
                    setMaxQuantity(parseFloat(e.detail.value!))
                  }
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center button-send">
            <IonCol size="12">
              <IonButton onClick={handleAjouterClick}>
                Modifier le véhicule
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

export default UpdateUpdate;
