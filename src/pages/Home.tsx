import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import TourneeHome from "../components/TourneeHome";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/hello");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent
        fullscreen
        className="home-content"
        style={{ marginTop: "100px" }}
      >
        <div className="ion-margin">
          <h1>Home</h1>
          <TourneeHome />
          {JSON.stringify(data)}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
