import React, {useState, useEffect, useRef} from "react";
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
  IonSelectOption, IonIcon, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle,
} from "@ionic/react";

import {Redirect, useHistory, useParams} from "react-router-dom";

import "./UpdateClient.css";
import checkUserState from "../../utils/checkUserState";
import {createOutline, documentSharp, removeOutline, trashOutline} from "ionicons/icons";
import {OverlayEventDetail} from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface Tournee {
  id: number;
  name: string;
}

interface OrderLine {
  articleId: number
  changedQuantity: number
  deliveredQuantity: number
  orderId: number
  plannedQuantity: number
}
interface Articles {
  id: number
  name: string
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
  const [order, setOrder] = useState<OrderLine[]>([]);
  const [articles, setArticles] = useState<Articles[]>([]);
  const history = useHistory();

  // Function to toggle the disabled state

  useEffect(() => {
    fetch(`http://localhost:8080/article`)
        .then((response) => response.json())
        .then((data) => {
          let articlesArray: Articles[] = [];
          data.map((article: Articles) => articlesArray.push(article));
          setArticles(articlesArray);
        })
        .catch((error) => {
          console.error(
              "Erreur lors de la récupération des articles",
              error
          );
        })

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
    fetch(`http://localhost:8080/order/${id}/article`)
        .then((response) => response.json())
        .then((data) => {
          let orderArray: OrderLine[] = [];
          data.map((order: OrderLine) => orderArray.push(order));
          setOrder(orderArray);
          // Extracting tour names from the data
          /*
          let tourMapClean: Tournee[] = [];
          data.map((tour: Tournee) => tourMapClean.push(tour));
          setTours(tourMapClean);
           */
        })
        .catch((error) => {
          console.error("Erreur de chargement des tournées", error);
        });
  }, [id]);

  const removeArticle = (order_id: number, article_id : number) =>{
    fetch(`http://localhost:8080/order/remove/${order_id}/${article_id}`,{method:"DELETE"})
        .then((response) => response.json())
        .then((data) => {
          let output = order.filter(order => order.articleId != article_id);
          setOrder(output)
        });
  }
  const updateQuantity = (type: string) => {
    console.log("clicked");
    let arrCons =[];
    const inputs = document.querySelectorAll('input[name^="modify-"]');
    if(type == "c"){
      inputs.forEach((input) => {
        let object = {id: input.name.split("-")[1], value:input.value};
        arrCons.push(object);
      });
    }else if(type == "e"){
      inputs.forEach((input) => {
        let object = {id: input.name.split("-")[1], value:input.value - parseInt(input.placeholder)};
        arrCons.push(object);
      });
    }
    if(type == "c"){
      arrCons.forEach((elem) =>{
        fetch(`http://localhost:8080/order/${id}/addArticle/${elem.id}/${elem.value}`,{method:"POST"})
            .then((response) => response.json())
            .then((data) => {
              window.location.reload();
            });
      });
    }else if (type == "e"){
      arrCons.forEach((elem) =>{
        fetch(`http://localhost:8080/order/${id}/modify/${elem.id}/${elem.value}`,{method:"POST"})
            .then((response) => response.json())
            .then((data) => {
              window.location.reload();
            });
      });
    }

  }
  const handleAjouterClick = () => {
    if (!nom || !nombreEnfants || !trouneeChoisie || !adress || !phone) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    } else {
      setFormError(null);
      // Prepare data in the required format
      const clientData = {
        id: id,
        address: adress,
        name: nom,
        phoneNumber: phone,
        childrenQuantity: nombreEnfants,
        tour: trouneeChoisie,
      };
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
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-bg" size="9">
                <IonLabel>
                  <h2 className="ion-padding">Informations de : <b>{nom}</b></h2>
                </IonLabel>
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
                  <IonButton className="ion-margin-top" size="small" shape="round" onClick={handleAjouterClick}>
                    Modifier le client
                  </IonButton>
                  <p>{formError}</p>
                </IonRow>
              </IonCol>
              <IonCol size="9">
                <IonLabel>
                  <h2 className="ion-padding">Commande de :  <b>{nom}</b></h2>
                </IonLabel>
                <table className="ion-margin-bottom">
                  <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Quantité totale à livrer</th>
                    <th>Dont ajout pour la prochaine livraison</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {order.map((order) => (
                      <tr>
                        <td>{articles.find((article) => article.id === order.articleId)?.name}</td>
                        <td>
                          <IonInput
                              placeholder={order.plannedQuantity}
                              name={"modify-" + articles.find((article) => article.id === order.articleId)?.id}
                              type="number"
                              value={order.plannedQuantity}
                              required
                          />
                        </td>
                        <td>
                          <IonLabel color="primary">({order.changedQuantity})</IonLabel>
                        </td>
                        <td><IonButton size="small" color="light" onClick={() => removeArticle(order.orderId, order.articleId)}><IonIcon color="danger" icon={trashOutline}></IonIcon></IonButton></td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <IonRow>
                  <IonCol size="auto">
                    <IonButton size="small" shape="round" color="success">
                      Ajouter un article
                    </IonButton>
                    <IonButton size="small" shape="round" color="primary" onClick={() => updateQuantity("e")}>
                      Modification ponctuelle
                    </IonButton>
                    <IonButton size="small" shape="round" color="danger" onClick={() => updateQuantity("c")}>
                      Modification définitive
                    </IonButton>
                  </IonCol>
                </IonRow>
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
