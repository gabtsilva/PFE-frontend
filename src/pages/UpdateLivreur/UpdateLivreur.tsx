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

import checkUserState from "../../utils/checkUserState";

const UpdateLivreur: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [estAdmin, setEstAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [formError, setFormError] = useState<string | null>(null);
  const { email } = useParams<{ email: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/user/${email}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.lastname || "");
        setPrenom(data.firstname || "");
        setTelephone(data.phoneNumber || "");
        setEstAdmin(data.admin);
        setPassword(data.password || "");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données du livreur:",
          error
        );
      });
  }, [email]);

  const handleAjouterClick = () => {
    if (!nom || !prenom || !telephone) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);

      // Prepare data in the required format
      const livreurData = {
        email: email,
        firstname: prenom,
        lastname: nom,
        phoneNumber: telephone,
        isAdmin: estAdmin,
        password: password,
      };

      console.log({ livreurData });

      // Send a POST request to the API
      fetch(`http://localhost:8080/user/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livreurData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log("utilisateur a été modifié avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/livreurs";
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du livreur:", error);
          setFormError(
            "Une erreur s'est produite lors de la modification du livreur."
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
          <h1 className="titre-ajout">Modifier un utilisateur : {email}</h1>
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
              <IonItem>
                <IonLabel position="floating">Prénom</IonLabel>
                <IonInput
                  type="text"
                  value={prenom}
                  required
                  onIonChange={(e) => setPrenom(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonItem>
                <IonLabel position="floating">Téléphone</IonLabel>
                <IonInput
                  type="text"
                  value={telephone}
                  required
                  onIonChange={(e) => setTelephone(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonSelect
                  className="select-option"
                  aria-label="isAdmin"
                  placeholder="Est admin ?"
                  value={estAdmin}
                  onIonChange={(ev) => {
                    console.log("Current value admin:", ev.detail.value);
                    setEstAdmin(ev.detail.value);
                  }}
                >
                  <IonSelectOption key={0} value={false}>
                    Non
                  </IonSelectOption>
                  <IonSelectOption key={1} value={true}>
                    Oui
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center button-send">
            <IonCol size="12">
              <IonButton onClick={handleAjouterClick}>
                Modifier l'utilisateur
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

export default UpdateLivreur;
