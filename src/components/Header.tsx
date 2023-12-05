import {IonHeader, IonImg, IonToolbar} from "@ionic/react";
import logo from '../../assets/img/logo_snappies.png';
import './Header.css';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonImg class="ion-margin" alt="Snappies' logo" src={logo}></IonImg>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
