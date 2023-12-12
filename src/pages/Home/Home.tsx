import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../../components/Header/Header";
import TourneeHome from "../../components/TourneeHome/TourneeHome";
import Menu from "../../components/Menu/Menu";
import checkUserState from "../../utils/checkUserState";
import {Redirect} from "react-router-dom";
import React from "react";

const Home: React.FC = () => {
    document.title = 'SnappiesLog - Home'
    let state = checkUserState();
    if(state == "user"){
        return <Redirect to="/tournees" />
    }else if(state == "admin") {
        return (
            <>
                <Menu/>
                <IonContent
                    fullscreen
                    className="home-content"
                    style={{marginTop: "100px"}}
                >
                    <div className="ion-margin">
                        <TourneeHome/>
                    </div>
                </IonContent>
            </>
        );
    }else{
        return <Redirect to="/login" />
    }
};

export default Home;
