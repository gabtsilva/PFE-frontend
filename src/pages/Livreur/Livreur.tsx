import React, { useEffect, useState } from "react";
import { IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonSearchbar } from "@ionic/react";
import {  createOutline, footsteps } from "ionicons/icons";
import { Redirect } from "react-router-dom";
import AddElement from "../../components/AddElement/AddElement";
import checkUserState from "../../utils/checkUserState";

interface Livreur {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: number;
  isAdmin: boolean;
}

const Livreur: React.FC = () => {
  document.title = "SnappiesLog - Livreurs";
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://20.126.131.212:8080/user/delivery")
      .then((response) => response.json())
      .then((data) => {
        setLivreurs(data);
      })
      .catch((error) => console.error("Erreur de chargement des données", error));
  }, []);

  const handleSearchChange = (event: any) => {
    setSearch(event.detail.value.toLowerCase());
  };

  let state = checkUserState();

  console.log({livreurs});
  if (state === "user") {
    return <Redirect to="/tournees" />;
  } else if (state === "admin") {
    return (
      <>
        <IonContent>
          <IonGrid>
          <AddElement nom="livreur" icone={footsteps} />
            <IonRow>
              <IonCol size="10" size-md="7">
                <IonSearchbar placeholder="Chercher un livreur" value={search} onIonInput={handleSearchChange} />
              </IonCol>
              <IonCol size="auto" size-md="auto">
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livreurs
                      .filter((livreur) =>
                        Object.values(livreur).some(
                          (value) =>
                            typeof value === "string" &&
                            value.toLowerCase().includes(search)
                        )
                      )
                      .map((livreur) => (
                        <tr key={livreur.email}>
                          <td>{livreur.lastname}</td>
                          <td>{livreur.firstname}</td>
                          <td>{livreur.phoneNumber}</td>
                          <td>{livreur.email}</td>
                          <td>
                            <IonButton
                              size="small"
                              color="success"
                              routerLink={`/livreur/update/${livreur.email}`}
                              routerDirection="none"
                            >
                              <IonIcon icon={createOutline} />
                            </IonButton>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Livreur;
