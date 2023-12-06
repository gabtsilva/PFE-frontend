import "./LoginForm.css";
import { IonButton, IonImg, IonInput, IonItem } from "@ionic/react";
import logo from "../../assets/img/logo_snappies.png";
import { useEffect, useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // Construire le corps de la requête
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      // Envoyer la requête POST
      console.log("infos conn = " + email + " " + password);
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Vérifier la réponse
      if (response.ok) {
        // La requête a réussi, vous pouvez traiter la réponse ici
        console.log("Connexion réussie !");
        console.log(response);
        // Rediriger vers la page d'accueil
        window.location.href = "/";
      } else {
        // La requête a échoué, vous pouvez gérer les erreurs ici
        console.error("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
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
    </div>
  );
};

export default LoginForm;
