import React, { Component } from 'react'
import YouTube from 'react-youtube'
import MultipleBarChart from '../charts/MultipleBarChart'
import ActiveShapePieChart from '../charts/ActiveShapePieChart'

class VideoAnalysis extends Component {
    render() {
        return (
            <div className="m-portlet">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
							<i className="flaticon-map-location"/>
						</span>
                            <h3 className="m-portlet__head-text">
                                Analisis de emociones en el video mas visto.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="m-portlet__body m-portlet__body--no-padding">
                    <div className="row m-row--no-padding m-row--col-separator-xl">
                        <div className="col-md-12 col-lg-12 col-xl-6">
                            <div className="m-widget1">
                                 <div className="m-widget1__item">
                                     <div className="row m-row--no-padding align-items-center">
                                         <div className="col">

                                             <h3 className="m-widget1__title">Descripción</h3>
                                             <span className="m-widget1__desc"> </span>

                                             <p>
                                                 Se utilizó una red neuronal para analizar las emociones presentes en el rostro de este candidato, en el video dado.
                                             </p>

                                             <p>
                                                 El video seleccionado cumple con las siguientes caracteristicas:
                                                 <ul>
                                                     <li>Debe de tener un alto numero de vistas</li>
                                                     <li>Debe de mostrar a un candidato haciendo propuestas</li>
                                                 </ul>
                                             </p>

                                             <p>
                                                 A continuación se muestra el video analizado para este candidato:
                                             </p>

                                             <YouTube
                                                 videoId = {this.props.analyzedVideoId}
                                                 opts = {{
                                                     width: "500"
                                                 }}
                                             />
                                         </div>
                                     </div>
                                 </div>
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-12 col-xl-6">
                            <div className="m-widget1">
                                 <div className="m-widget1__item">
                                     <div className="row m-row--no-padding align-items-center">
                                         <div className="col">

                                             <h3 className="m-widget1__title">Resultados Emocion</h3>
                                             <span className="m-widget1__desc"> Emociones presentes detectadas a lo largo del video por nuestra red neuronal </span>
                                             <br/>
                                             <br/>
                                             <MultipleBarChart data = {this.props.videoEmotionResults}/>

                                             <hr/>

                                             <h3 className="m-widget1__title">Resultados Comentarios</h3>
                                             <span className="m-widget1__desc"> Comentarios Positivos vs Negativos de este video, evaluados por una Maquina de Soporte Vectorial </span>
                                             <br/>
                                             <br/>
                                             <ActiveShapePieChart
                                                 data = {
                                                     [{name: 'Positivos', value: this.props.positiveYoutubeComments},
                                                         {name: 'Negativos', value: this.props.negativeYoutubeComments}]
                                                 }
                                                 colors = {
                                                     ['#34bfa3', '#f4516c']
                                                 }
                                             />
                                         </div>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default VideoAnalysis
