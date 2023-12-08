import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../../components/Header/Header";
import TourneeHome from "../../components/TourneeHome/TourneeHome";
import Menu from "../../components/Menu/Menu";

const Home: React.FC = () => {
  return (
    <>
      <Menu />
      <IonContent
        fullscreen
        className="home-content"
        style={{ marginTop: "100px" }}
      >
        <div className="ion-margin">
          <TourneeHome />
        </div>
      </IonContent>
    </>
  );
};

export default Home;
