import React from "react";
import { IonButton, IonRow } from "@ionic/react";

import "./AddElement.css";

interface AddElementProps {
  nom: string;
}

const AddElement: React.FC<AddElementProps> = ({ nom }) => {
  return (
    <>
      <IonRow className="row-button">
        <IonButton routerLink={`/${nom}/add`} routerDirection="none">
          Ajouter un {nom}
        </IonButton>
      </IonRow>
    </>
  );
};

export default AddElement;
