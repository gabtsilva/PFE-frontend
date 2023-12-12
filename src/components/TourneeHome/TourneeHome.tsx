import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
} from "@ionic/react";

import "./TourneeHome.css";
import { walkOutline } from "ionicons/icons";

const TourneeHome: React.FC = () => {
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="4" size-md="6">
            <IonCard>
              <IonIcon icon={walkOutline}></IonIcon>
              <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                Here's a small text description for the card content. Nothing
                more, nothing less.
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" size-md="6">
            <IonCard>
              <IonIcon icon={walkOutline}></IonIcon>
              <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                Here's a small text description for the card content. Nothing
                more, nothing less.
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" size-md="6">
            <IonCard>
              <IonIcon icon={walkOutline}></IonIcon>
              <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                Here's a small text description for the card content. Nothing
                more, nothing less.
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default TourneeHome;
