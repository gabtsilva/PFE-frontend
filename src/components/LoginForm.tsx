import "./LoginForm.css";
import { IonButton, IonImg, IonInput, IonItem } from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    // Construire le corps de la requête
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      // Envoyer la requête POST
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Vérifier la réponse
      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        // La requête a réussi, vous pouvez traiter la réponse ici
        console.log("Connexion réussie !");

        // Stocker le token dans le localStorage
        localStorage.setItem("token", data.token);

        // Rediriger vers la page d'accueil
        window.location.href = "/";
      } else {
        // La requête a échoué, vous pouvez gérer les erreurs ici
        console.error("Échec de la connexion");
        setErrorMessage(
          "Votre identifiant ou votre mot de passe n'est pas bon."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      setErrorMessage("Une erreur interne est survenue");
    }
  };

  return (
    <div id="container">
      <IonImg alt="Snappies' logo" src={logo}></IonImg>
      <IonItem lines="none">
        <IonInput
          type="email"
          placeholder="Email"
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonItem lines="none">
        <IonInput
          type="password"
          placeholder="Mot de passe"
          onIonChange={(e) => setPassword(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonButton color="light" fill="outline" onClick={handleSubmit}>
        Se connecter
      </IonButton>
      <br></br>
      <div className="info-conn">{errorMessage}</div>
    </div>
  );
};

export default LoginForm;
