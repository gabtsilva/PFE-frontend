import React from "react";
import {IonButton, IonIcon, IonImg, IonRow} from "@ionic/react";

import "./AddElement.css";

interface AddElementProps {
  nom: string;
  icone : string
}

const AddElement: React.FC<AddElementProps> = ({ nom, icone }) => {
  return (
    <>
      <IonRow className="row-button button-add">
        <IonButton size="default" routerLink={`/${nom}/add`} routerDirection="none">
            <IonIcon className="ion-padding-end" color="white" icon={icone}/>Ajouter un {nom}
         </IonButton>
      </IonRow>
    </>
  );
};

export default AddElement;
