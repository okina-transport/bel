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
                        <a href="doc/RMR-CharteNommage-V4.0.pdf" target="_blank">Charte de Nommage Modalis - 21/06/2018</a>
                    </div>
                    <div>
                        <h2>Méthode et organisation</h2>
                        <a href="doc/RMR-GuideMethodo-V2.0.pdf" target="_blank">Guide Méthodologique - 21/06/2018</a>
                        <br/>
                        <a href="doc/RMR-PreconnisationsDSP-V3.0.pdf" target="_blank">Préconisations pour les marchés publics DSP - 29/03/2018</a>
                    </div>
                    <br/>
                    <div>
                        <h1>Accompagnement technique</h1>
                        <h2>Manuels utilisateurs</h2>
                        <a href="doc/MAN-NA-RMRPA-V3.0.pdf" target="_blank">Manuel Utilisateur Référentiel de points d’arrêt</a>
                        <br/>
                        <a href="doc/MAN-NA-RMRTOPO-V1.0.pdf" target="_blank">Manuel Utilisateur Référentiel Topologie/Horaires</a>
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
                    </div>
                    <div>
                        <h2>Documentation technique informatique</h2>
                        <a href="http://gtfs.org/best-practices/" target="_blank">Spécifications et bonnes pratiques du format GTFS</a>
                        <br/>
                        <a href="http://netex-cen.eu/" target="_blank">Spécifications NeTEx</a>
                    </div>
                    <br/>
                    <div style={{marginBottom: 100}}>
                        <h1>Suivi de projet</h1>
                        <a href="doc/RMR-Lancement_de_projet-31_10_2017-V4.2.pdf" target="_blank">Présentation du lancement de projet - 31/10/2017</a>
                        <br/>
                        <a href="doc/CRR-Lancement_RMR_Limoges-18_10_2017-V2.2.pdf" target="_blank">Compte rendu de réunion de lancement de projet à Limoges -
                            18/10/2017</a>
                        <br/>
                        <a href="doc/CRR-Lancement_RMR_Poitiers-19_10_2017-V2.2.pdf" target="_blank">Compte rendu de réunion de lancement de projet à Poitiers -
                            19/10/2017</a>
                        <br/>
                        <a href="doc/CRR-Lancement_RMR_Bordeaux-30_10_2017-V2.0.pdf" target="_blank">Compte rendu de réunion de lancement de projet à Bordeaux -
                            30/10/2017</a>
                        <br/>
                        <br/>
                        <a href="doc/RMR-NA_Restitution_06022018_V2.0.pdf" target="_blank">Présentation du COTECH (Restitution de l’Audit) - 06/02/2018</a>
                        <br/>
                        <a href="doc/CRR-NA-RestitutionCOTECH-06_02_2018-V2.3.pdf" target="_blank">Compte rendu de réunion du COTECH (Restitution de l’Audit) -
                            06/02/2018</a>
                        <br/>
                        <a href="doc/RMR-COTECH-18_06_2018_V1.0.pdf" target="_blank">Présentation du COTECH (RMR + SIM) - 18/06/2018</a>
                        <br/>
                        <br/>
                        <a href="doc/CRR-RMRFormation-V1.0.pdf" target="_blank">Compte rendu de formation RMR - 21/06/2018</a>
                        <br/>
                        <a href="doc/RMR-FormationRMR-2018-V1.0.pdf" target="_blank">Présentation des formations RMR - 14/05/2018</a>
                    </div>
                </div>
            </div>

        );
    }

}

export default connect()(DocumentBase);