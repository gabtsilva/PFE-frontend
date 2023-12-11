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

import {Redirect, useParams} from "react-router-dom";

import "./UpdateClient.css";
import checkUserState from "../../utils/checkUserState";

interface Tournee {
  id: number;
  name: string;
}

const UpdateClient: React.FC = () => {
  const [nom, setNom] = useState<string>("");
  const [nombreEnfants, setNombreEnfants] = useState<number | undefined>();
  const [adress, setAdress] = useState<string>("");
  const [trouneeChoisie, setTourneeChoisie] = useState<number>(0);
  const [tours, setTours] = useState<Tournee[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/client/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved data
        setNom(data.name || "");
        setAdress(data.address || "");
        setPhone(data.phoneNumber || "");
        setNombreEnfants(data.childrenQuantity || undefined);
        setTourneeChoisie(data.tour || undefined);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données du client:",
          error
        );
      });

    // Fetch tour data from the API
    fetch("http://localhost:8080/tour")
      .then((response) => response.json())
      .then((data) => {
        // Extracting tour names from the data
        let tourMapClean: Tournee[] = [];
        data.map((tour: Tournee) => tourMapClean.push(tour));
        setTours(tourMapClean);
      })
      .catch((error) => {
        console.error("Erreur de chargement des tournées", error);
      });
  }, [id]);

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
        id: id,
        address: adress,
        name: nom,
        phoneNumber: phone,
        childrenQuantity: nombreEnfants,
        tour: trouneeChoisie,
      };
      console.log(JSON.stringify(clientData));
      // Send a POST request to the API
      fetch(`http://localhost:8080/client/${id}`, {
        method: "PUT",
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
          console.log("Client a été modifié avec succès:", data);
          // Reset form error state
          setFormError(null);
          window.location.href = "/clients";
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du client:", error);
          setFormError("Une erreur s'est produite lors de l'ajout du client.");
        });
    }
  };
  let state = checkUserState();
  if(state == "user"){
    return <Redirect to="/tournees" />
  }else if(state == "admin"){
    return (
        <IonContent>
          <IonGrid>
            <h1 className="titre-ajout">Modifier le client : {nom}</h1>
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
                      value={trouneeChoisie}
                      onIonChange={(e) =>
                          setTourneeChoisie(parseFloat(e.detail.value!))
                      }
                  >
                    {tours.map((tour, index) => (
                        <IonSelectOption
                            key={index}
                            value={tour.id}
                            aria-selected={
                              trouneeChoisie === tour.id ? true : undefined
                            }
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
                  Modifier le client
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

export default UpdateClient;
