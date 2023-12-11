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
          <Route
            exact
            path="/"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              localStorage.getItem("token") == null ? (
                <Login />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/logout"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Logout />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/clients"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Client />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route exact path="/client/add">
            <AddClient />
          </Route>

          <Route exact path="/client/update/:id">
            <UpdateClient />
          </Route>

          <Route exact path="/article/add">
            <AddArticle />
          </Route>

          <Route exact path="/article/update/:id">
            <UpdateArticle />
          </Route>

          <Route
            exact
            path="/articles"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Article />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route exact path="/vehicule/add">
            <AddVehicule />
          </Route>

          <Route exact path="/vehicule/update/:id">
            <UpdateVehicule />
          </Route>

          <Route
            exact
            path="/vehicules"
            render={(props) =>
              localStorage.getItem("token") != null ? (
                <Vehicule />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route exact path="/tournee/add">
            <AddTournee />
          </Route>

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
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  </IonApp>
);

export default App;
