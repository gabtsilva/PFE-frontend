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
import AddClient from "./pages/AddClient/AddClient";
import UpdateClient from "./pages/UpdateClient/UpdateClient";
import Article from "./pages/Article/Article";
import AddArticle from "./pages/AddArticle/AddArticle";
import UpdateArticle from "./pages/UpdateArticle/UpdateArticle";
import Vehicule from "./pages/Vehicule/Vehicule";
import AddVehicule from "./pages/AddVehicule/AddVehicule";
import UpdateVehicule from "./pages/UpdateVehicule/UpdateVehicule";
import Tournee from "./pages/Tournee/Tournee";
import AddTournee from "./pages/AddTournee/AddTournee";
import UpdateTournee from "./pages/UpdateTournee/UpdateTournee";
import TourneeLivreur from "./pages/TourneeLivreur/TourneeLivreur";
import Livreur from "./pages/Livreur/Livreur";
import UpdateLivreur from "./pages/UpdateLivreur/UpdateLivreur";
import AddLivreur from "./pages/AddLivreur/AddLivreur";
import TourneeExecution from "./pages/TourneeExecution/TourneeExecution";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route exact path="/clients" render={() => <Client />} />
          <Route exact path="/client/add" render={() => <AddClient />} />
          <Route
            exact
            path="/client/update/:id"
            render={() => <UpdateClient />}
          />
          <Route exact path="/article/add" render={() => <AddArticle />} />
          <Route
            exact
            path="/article/update/:id"
            render={() => <UpdateArticle />}
          />
          <Route exact path="/articles" render={() => <Article />} />
          <Route exact path="/vehicule/add" render={() => <AddVehicule />} />
          <Route
            exact
            path="/vehicule/update/:id"
            render={() => <UpdateVehicule />}
          />
          <Route exact path="/vehicules" render={() => <Vehicule />} />

          <Route exact path="/tournees" render={() => <Tournee />} />
          <Route exact path="/tournee/add">
            <AddTournee />
          </Route>

          <Route
            exact
            path="/tournee/update/:id"
            render={() => <UpdateTournee />}
          />

          <Route
            exact
            path="/tournees"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Tournee />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/tourneesLivreur"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <TourneeLivreur />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route exact path="/livreurs" render={() => <Livreur />} />
          <Route
            exact
            path="/livreur/update/:email"
            render={() => <UpdateLivreur />}
          />
          <Route exact path="/livreur/add" render={() => <AddLivreur />} />

          <Route
            exact
            path="/tourneeExecution/:id"
            render={() => <TourneeExecution />}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  </IonApp>
);

export default App;
