import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Header from "../components/Header";
import {useEffect, useState} from "react";

const Home: React.FC = () => {
    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/hello');
            if (!response.ok) {
                throw new Error('Network response was not ok');
                console.log("not ok");
            }
            console.log(response);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.log("error " + error);
            console.error('Error fetching data:', error);
        }
    };
    fetchData();

    return (
    <IonPage>
        <Header />
      <IonContent fullscreen>
          <div>
              {JSON.stringify(data)}
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
