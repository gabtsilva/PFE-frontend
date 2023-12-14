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
import { cube, pencilOutline } from "ionicons/icons";
import "./Article.css";
import React, { useEffect, useState } from "react";
import AddElement from "../../components/AddElement/AddElement";
import checkUserState from "../../utils/checkUserState";
import { Redirect } from "react-router-dom";

interface Article {
  id: number;
  name: string;
}

const Article: React.FC = () => {
  document.title = "SnappiesLog - Articles";
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Effect hook to retrieve client data from the API
    fetch("http://localhost:8080/article")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données", error)
      );
  }, []);
  let state = checkUserState();
  if (state == "user") {
    return <Redirect to="/tournees" />;
  } else if (state == "admin") {
    return (
      <>
        <IonContent>
          <IonGrid>
            <AddElement nom="article" icone={cube} />
            <IonRow>
              {articles.map((article) => (
                <IonCol size="12" size-md="6" key={article.id}>
                  <IonCard>
                    <IonIcon icon={cube}></IonIcon>
                    <IonButton
                      className="edit"
                      routerLink={`/article/update/${article.id}`}
                      routerDirection="none"
                    >
                      <IonIcon icon={pencilOutline}></IonIcon>
                    </IonButton>
                    <IonCardHeader>
                      <IonCardTitle>{article.name}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Article;
