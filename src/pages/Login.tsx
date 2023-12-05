import {IonContent, IonPage} from '@ionic/react';
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <LoginForm  />
            </IonContent>
        </IonPage>
    );
};

export default Login;
