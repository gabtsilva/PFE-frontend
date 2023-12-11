import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/LoginForm/LoginForm";
import checkUserState  from '../../utils/checkUserState';
import { Redirect } from "react-router-dom";

const Login: React.FC = () => {
    document.title = 'SnappiesLog - Login'
    if(checkUserState() != null){
        return <Redirect to="/" />
    }else{
        return (
            <IonPage>
                <IonContent fullscreen>
                    <LoginForm />
                </IonContent>
            </IonPage>
        );
    }
};

export default Login;
