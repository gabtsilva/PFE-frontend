import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonButton,
} from "@ionic/react";

import "./TourneeExecution.css";
import checkUserState from "../../utils/checkUserState";
import { Redirect, useParams } from "react-router-dom";

interface ArticlesTourneeExec {
  articleName: string;
  articleId: number;
  qtyBase: number;
  qtyLivre: number;
  qtySurplusRestant: number;
}

interface PlannedQuantityByClient {
  clientId: number;
  clientName: string;
  articles: {
    plannedQuantity: number;
    deliveredQuantity: number;
    changedQuantity: number;
    articleId: number;
    articleName: string;
  }[];
}

const TourneeExecution: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ArticlesTourneeExec[]>([]);
  const [data2, setData2] = useState<PlannedQuantityByClient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/tour/tourExecution/${id}/remainigAllArticles`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/tour/tourExecution/${id}/client/delivredArticles`
        );
        const jsonData = await response.json();
        setData2(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <IonContent>
      <IonGrid>
        <IonRow className="info-table-tournee">
          <IonCol size="12" size-md="10">
            <h2>Concernant la tournée</h2>
            <table>
              <thead>
                <tr>
                  <th>Nom de l'article</th>
                  <th>Quantité de base</th>
                  <th>Quantité livrée</th>
                  <th>Quantité de stock restant</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: ArticlesTourneeExec) => (
                  <tr key={item.articleId}>
                    <td>{item.articleName}</td>

                    <td>{item.qtyBase}</td>
                    <td>{item.qtyLivre}</td>
                    <td>{item.qtySurplusRestant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </IonCol>
        </IonRow>

        {data2.map((client) => (
          <IonRow key={client.clientId} className="info-table-tournee">
            <IonCol size="12" size-md="10">
              <br></br>
              <br></br>
              <h2>{`Concernant le client ${client.clientName}`}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nom de l'article</th>
                    <th>Quantité délivrée</th>
                    <th>Quantité prévue</th>
                  </tr>
                </thead>
                <tbody>
                  {client.articles.map((article) => (
                    <tr key={article.articleId}>
                      <td>{article.articleName}</td>
                      <td>{article.deliveredQuantity}</td>
                      <td>{article.changedQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCol>
          </IonRow>
        ))}

        <IonRow>
          <IonCol size="12" size-md="10">
            <IonButton routerLink={`/`} routerDirection="none">
              Retour
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default TourneeExecution;
