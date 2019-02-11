import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import UserActions from "../actions/UserActions";
import {connect} from 'react-redux';

class DocumentBase extends React.Component {
    constructor(props) {
        super(props);
    }

    goToMain() {
        this.props.dispatch(UserActions.navigateTo('/', ''));
    }

    render() {

        return (
            <div>
                <div>
                    <RaisedButton
                        style={{marginTop: 10}}
                        label="Retour"
                        primary={true}
                        onClick={this.goToMain.bind(this)}
                    />
                </div>
                <div style={{marginLeft: 25}}>
                    <div style={{marginTop: 25}}>
                        <h1>Accompagnement Fonctionnel</h1>
                        <h2>Charte de nommage</h2>
                        <a href="doc/RMR-CharteNommage-V5.0.pdf" target="_blank">Charte de Nommage Modalis - 28/01/2019</a>
                    </div>
                    <div>
                        <h2>Méthode et organisation</h2>
                        <a href="doc/RMR-GuideMethodo-V2.0.pdf" target="_blank">Guide Méthodologique - 21/06/2018</a>
                    </div>
                    <br/>
                    <div>
                        <h1>Accompagnement technique</h1>
                        <h2>Manuels utilisateurs</h2>
                        <a href="doc/MAN-NA-RMRPA-V3.0.pdf" target="_blank">Manuel Utilisateur Référentiel de points d’arrêt</a>
                        <br/>
                        <a href="doc/MAN-NA-RMRTOPO-V1.1.pdf" target="_blank">Manuel Utilisateur Référentiel Topologie/Horaires</a>
                    </div>
                    <div>
                        <h2>Tutoriels et webinars :</h2>
                        <p>Tutoriels Youtube Référentiel de points d’arrêt :<a
                            href="https://www.youtube.com/watch?v=3D4fZ4TIdTo&list=PLtMii9_uyfDTcPRaLjSeW7MCowUy_ezUJ" target="_blank"> Lien Tutoriel Youtube
                        </a>
                        </p>
                        <p>vous trouverez à cette adresse un ensemble de vidéos vous permettant d’aborder le référentiel de points d’arrêt régional</p>
                        <br/>
                        <a href="doc/RMR-WEBINAR-19_12_2017-V1.0.pdf" target="_blank">Webinar “Vers les bonnes pratiques de l’information voyageurs” (Transmodel
                            et vocabulaire) - 19/12/2017</a>
                        <br/>
                        <a href="doc/RMR-WEBINAR-20_03_2018-V1.0.pdf" target="_blank">Webinar “Formats d’échanges NeTEx vs GTFS” - 20/03/2018</a>
                        <br/>
                        <a href="doc/RMR-WEBINAR-24_04_2018-V2.0.pdf" target="_blank">Webinars “Organisation pour la mise en qualité des données de mobilité” -
                            24/04/2018</a>
                        <br/>
                        <a href="doc/WEBINAR_0006_V1.0-Formation_aux_outils_RMR_et_Mise_en_qualité_des_données-08-01-2019.pdf" target="_blank">Webinars “Formations aux outils RMR et Mise en qualité des données” -
                            08/01/2019</a>
                    </div>
                    <div style={{marginBottom: 100}}>
                        <h2>Documentation technique informatique</h2>
                        <a href="http://gtfs.org/best-practices/" target="_blank">Spécifications et bonnes pratiques du format GTFS</a>
                        <br/>
                        <a href="http://netex-cen.eu/" target="_blank">Spécifications NeTEx</a>
                    </div>
                </div>
            </div>

        );
    }

}

export default connect()(DocumentBase);