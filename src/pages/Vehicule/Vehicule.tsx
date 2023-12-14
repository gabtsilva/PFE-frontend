import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { bus, pencilOutline } from "ionicons/icons";
import "./Vehicule.css";
import React, { useEffect, useState } from "react";
import AddElement from "../../components/AddElement/AddElement";
import checkUserState from "../../utils/checkUserState";
import {Redirect} from "react-router-dom";

interface Vehicule {
  id: number;
  name: string;
  plate: string;
  maxQuantity: number;
}

const Vehicule: React.FC = () => {
  document.title = "SnappiesLog - Véhicules";
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://20.126.131.212:8080/vehicle")
      .then((response) => response.json())
      .then((data) => {
        setVehicules(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);
  let state = checkUserState();
  if(state == "user"){
    return <Redirect to="/" />
  }else if(state == "admin") {
    return (
        <>
          <IonContent>
            <IonGrid>
              <AddElement nom="vehicule"/>
              <IonRow>
                {vehicules.map((vehicule) => (
                    <IonCol size="12" size-md="6" key={vehicule.id}>
                      <IonCard>
                        <IonIcon icon={bus}></IonIcon>
                        <IonButton
                            className="edit"
                            routerLink={`/vehicule/update/${vehicule.id}`}
                            routerDirection="none"
                        >
                          <IonIcon icon={pencilOutline}></IonIcon>
                        </IonButton>
                        <IonCardHeader>
                          <IonCardSubtitle>{vehicule.plate}</IonCardSubtitle>
                          <IonCardTitle>{vehicule.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p>Nombres de caisses stockable : {vehicule.maxQuantity}</p>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
    );
  }else{
    return <Redirect to="/login" />
  }
};

export default Vehicule;
