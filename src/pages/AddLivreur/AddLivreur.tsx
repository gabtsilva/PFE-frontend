import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
} from "@ionic/react";

import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";

const AddLivreur: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [estAdmin, setEstAdmin] = useState<boolean>(false);

  const handleAjouterClick = () => {
    if (!email || !firstname || !lastname || !password || !phoneNumber) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      console.log("admin status : " + estAdmin);
      // Prepare data in the required format
      const userData = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        admin: estAdmin,
        password: password,
      };
      // Send a POST request to the API
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
          //window.location.href = "/livreurs";
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du livreur:", error);
          setFormError("Une erreur s'est produite lors de l'ajout du livreur.");
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
          <h1 className="titre-ajout">Ajouter un utilisateur</h1>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonItem>
                <IonLabel position="floating">Email </IonLabel>
                <IonInput
                  type="text"
                  value={email}
                  required
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Nom</IonLabel>
                <IonInput
                  type="text"
                  value={lastname}
                  required
                  onIonChange={(e) => setLastName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Prénom</IonLabel>
                <IonInput
                  type="text"
                  value={firstname}
                  required
                  onIonChange={(e) => setFirstName(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonItem>
                <IonLabel position="floating">Téléphone</IonLabel>
                <IonInput
                  type="text"
                  value={phoneNumber}
                  required
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="text"
                  value={password}
                  required
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonSelect
                  className="select-option"
                  aria-label="isAdmin"
                  placeholder="Est admin ?"
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
                Ajouter un livreur
              </IonButton>
              <p>{formError}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  }
};

export default AddLivreur;
