import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonPage,
  IonHeader,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Client from "./pages/Client/Client";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonReactRouter>
      <Menu />
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/clients">
            <Client />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  </IonApp>
);

export default App;
