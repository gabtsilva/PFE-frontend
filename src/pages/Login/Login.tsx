import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Redirect } from "react-router-dom";

const Login: React.FC = () => {
    document.title = 'SnappiesLog - Login'
    return (
        <IonPage>
            <IonContent fullscreen>
                <LoginForm />
            </IonContent>
        </IonPage>
    );
};

export default Login;
