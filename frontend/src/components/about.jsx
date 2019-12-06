import React, { Component } from 'react';
import NavbarComponent from '../components/navbar'
import { withRouter } from 'react-router-dom';

class AboutComponent extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <NavbarComponent/>

                <div className="container text-center">
                    <h1>Información</h1>
                    <hr/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h4>Análisis de Sentimientos</h4>
                            <p>
                                Explicar por que usamos SVM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm text-center">
                            Tweets por localización
                            <img className="img-fluid" src="/images/mexico.png" alt="Mapa mexico"/>

                        </div>
                        <div className="col-sm text-center">
                            Tweets por sentimiento
                            <img className="img-fluid" src="/images/sentimientos.png" alt="Mapa mexico"/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(AboutComponent);
