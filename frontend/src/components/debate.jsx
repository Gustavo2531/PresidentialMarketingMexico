import React, { Component } from 'react';
import NavbarComponent from '../components/navbar'

class Debate extends Component {

    render() {
        return (
            <div>
                <NavbarComponent/>

                <div className="m-grid__item m-grid__item--fluid  m-grid m-grid--ver-desktop m-grid--desktop 	m-container m-container--responsive m-container--xxl m-page__container m-body">
                    <div className="m-grid__item m-grid__item--fluid m-wrapper">

                        <div className="m-subheader">
                            <div className="d-flex align-items-center">
                                <div className="mr-auto">
                                    <h3 className="m-subheader__title ">
                                        Resultados Primer Debate Presidencial
                                    </h3>
                                </div>

                                <div>
                                    <span className="m-subheader__daterange">
                                        <i className="la la-question-circle" data-container="body"
                                           data-toggle="m-tooltip" data-placement="top"
                                           title="¿Cómo obtuvimos esto?" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="m-content">


                            <div className="m-portlet m-portlet--skin-dark m-portlet--bordered-semi m--bg-brand">
                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon">
                                                <i className="flaticon-statistics"></i>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Análisis de Menciones durante el primer debate
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet__body">
                                    Se hizo uso de un modelo entrenado para detectar si un texto ingresado es positivo o negativo, utilizando una <i>LSVM (Lagrangian Support Vector Machine)</i>.
                                    <br/>
                                    Nuestro modelo entrenado es capaz de identificar la emoción prominente en un texto y regresar 1 (Positivo) o 0 (Negativo) como resultado.
                                    <br/>
                                    <br/>
                                    Para este análisis fue necesario anotar manualmente los tiempos de inicio y de fin del debate y utilizar nuestro modelo con las menciones directas hacia los candidatos.
                                    <br/>
                                    Las menciones cumplen con las siguientes características:
                                    <ul>
                                        <li>Son menciones directas a un candidato, por ejemplo: "@RicardoAnayaC hola"</li>
                                        <li>Se descartaron tweets veniendo de personas con menos de 500 seguidores y menos de 1k tweets en su timeline, esto con la finalidad de remover la posibilidad de tener tweets con bots</li>
                                        <li>No hay Retweets</li>
                                    </ul>
                                    A continuación se presentan los resultados clasificados por la duración completa del debate <b>(De 8:00 PM a 10:00 PM)</b>
                                    <hr/>
                                    <div className="row">
                                        <div className="col">
                                            <img alt="anaya" src = "/images/debate/MencionesRicardoAnayaGeneral.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="amlo" src = "/images/debate/MencionesAmloGeneral.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="meade" src = "/images/debate/MencionesMeadeGeneral.jpeg" className="img-fluid"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <div className="m-portlet m-portlet--skin-dark m-portlet--bordered-semi">
                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon">
                                                <i className="flaticon-statistics"/>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Identificación de temas en el primer debate presidencial.
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet__body">
                                    <p>
                                        Se utilizaron dos algoritmos para hacer un análisis de datos en las menciones de cada candidato, esto con la finalidad de encontrar temas que impacten o
                                        sean de utilidad para la población, asi como darle una herramienta a cada candidato para el segundo debate presidencial.
                                        <br/>
                                        <br/>
                                        Los algoritmos utilizados para generar los temas recurrents son: <i>LDA o Latent Dirichlet Allocation</i> y <i>NMF o Non Negative Matrix Factorization</i>
                                        <br/>
                                        A continuación se enlistan los temas detectados por candidato Presidencial usando ambos algoritmos
                                    </p>

                                    <hr/>

                                    <h4>Usando NMF</h4>
                                    <div className="row">
                                        <div className="col">
                                            <h5>Andrés Manuel López Obrador</h5>
                                            <ul>
                                                <li>Tópico 0: debate méxico si méxicoconamlo corrupción amlo vamos mexicoconamlo presidente pueblo</li>
                                                <li>Tópico 1: amnistía impunidad significa causas atender pobreza combatir violencia originaron delincuentes</li>
                                                <li>Tópico 2: violencia crecimiento económico desató años 30 país hace paz bienestar</li>
                                                <li>Tópico 3: gobierno jefe cdmx violencia bajó homicidios robo inseguridad incidencia reduje</li>
                                                <li>Tópico 4: andrés manuel obrador lópez lengua lagarto peje traen aristeguinoticias poder</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h5>Ricardo Anaya</h5>
                                            <ul>
                                                <li>Tópico 0: mzavalagc jaimerdznl joseameadek lopezobrador_ candidatos debate propuestas primer inemexico presidencia</li>
                                                <li>Tópico 1: juntosconanaya méxico propuestas vamos debate candidato mejor conanayaporméxico futuro porméxicoalfrente</li>
                                                <li>Tópico 2: mujeresconanaya mujeresalfrente pormexicoalfrente progreso lograremos libertad bienestar conanayaporméxico juntosconanaya noesnormal</li>
                                                <li>Tópico 3: amlo dice si anaya amnistía estrategia seguridad gobierno va propone</li>
                                                <li>Tópico 4: meade pregunta honestidad gobernado jefe nieto peña contesta enrique frente</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h5>José Antonio Meade</h5>
                                            <ul>
                                                <li>Tópico 0: presidente méxicoconmeade meadepresidente queremos cdeprihidalgo pri_nacional sola honesto</li>
                                                <li>Tópico 1: propuestas ganómeade méxico debate duda hoy candidato mejores preparado mejor</li>
                                                <li>Tópico 2: verdaderas corrupción combatir acciones demuestra hidalgoconmeade propuestas meadepresidente redhgoconmeade retweeted</li>
                                                <li>Tópico 3: meade antonio josé lopezobrador_ retweeted seguridad gobierno criminales si meadepresidente</li>
                                                <li>Tópico 4: nuevaalianza decidadanxaciudadanx mensaje final contundente ganar dabateine vamos mexico ganomeade</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <hr/>

                                    <h4>Usando LDA</h4>
                                    <div className="row">
                                        <div className="col">
                                            <h5>Andrés Manuel López Obrador</h5>
                                            <ul>
                                                <li>Tópico 0: amnistía impunidad significa violencia pobreza combatir dice delincuentes manera undefined</li>
                                                <li>Tópico 1: debate si candidatos años propuestas amlo dice mexicoconamlo va solo</li>
                                                <li>Tópico 2: corrupción méxico vamos presidencial si avión dice país arriba gobierno</li>
                                                <li>Tópico 3: gobierno violencia jefe puede crecimiento si cdmx seguridad económico estrategia</li>
                                                <li>Tópico 4: méxico presidente pueblo andrés transformación manuel país obrador mexicoconamlo mexicanos</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h5>Ricardo Anaya</h5>
                                            <ul>
                                                <li>Tópico 0: joseameadek lopezobrador_ mzavalagc jaimerdznl debate candidatos propuestas si ganó quién</li>
                                                <li>Tópico 1: méxico hoy futuro propuestas duarte visión país noche cambio siempre</li>
                                                <li>Tópico 2: lopezobrador_ amlo joseameadek anaya dice meade si país amnistía pregunta</li>
                                                <li>Tópico 3: juntosconanaya conanayaporméxico candidato vamos méxico propuestas debate mejor ganar duda</li>
                                                <li>Tópico 4: corrupción propone estrategia mandato gobierno dice revocación va favor conanayaporméxico</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <h5>José Antonio Meade</h5>
                                            <ul>
                                                <li>Tópico 0: debate ganar vamos nuevaalianzaconmeade nuevaalianza candidato deciudadanxaciudadanx meadepresidente dabateine creo</li>
                                                <li>Tópico 1: lopezobrador_ dice pri partido amlo si corrupción violencia seguridad años</li>
                                                <li>Tópico 2: gobierno si seguridad meadepresidente días 100 voy cárcel único primeros</li>
                                                <li>Tópico 3: ganómeade meade propuestas debate antonio hoy josé duda meadepresidente méxico</li>
                                                <li>Tópico 4: meadepresidente méxico presidente propuestas méxicoconmeade hidalgoconmeade honesto ganómeade pri_nacional preparado</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <br/>

                            <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">

                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon m--hide">
                                                <i className="flaticon-statistics"/>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Analisis de menciones en el bloque: <b>Seguridad Publica Y Violencia</b>
                                            </h3>
                                            <h2 className="m-portlet__head-label m-portlet__head-label--success">
                                                <span>Menciones Positivas vs Negativas en el Primer Bloque</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-portlet__body">
                                    Se tomaron los tiempos manuales de el primer tema, para hacer una clasificación de tweets basadas en este.
                                    <br/>
                                    Los tweets analizados en este segmento corresponden a la duración del debate en el primer tema: <b>De 8:03 a 8:42</b> aproximadamente. Es interesante notar que este tema fue el mejor aceptado en las menciones (Hubo un buen número de menciones positivas).
                                    <hr/>
                                    <div className="row">
                                        <div className="col">
                                            <img alt="anaya" src = "/images/debate/MencionesRicardoAnayaPrimerTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="amlo" src = "/images/debate/MencionesAmloPrimerTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="meade" src = "/images/debate/MencionesMeadePrimerTema.jpeg" className="img-fluid"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <br/>

                            <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">

                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon m--hide">
                                                <i className="flaticon-statistics"/>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Análisis de menciones en el bloque: <b>Combate a la corrupcion e impunidad</b>
                                            </h3>
                                            <h2 className="m-portlet__head-label m-portlet__head-label--danger">
                                                <span>Menciones Positivas vs Negativas en el Segundo Bloque</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-portlet__body">
                                    Se tomaron los tiempos manuales de el segundo tema, para hacer una clasificación de tweets basadas en este.
                                    <br/>
                                    Los tweets analizados en este segmento corresponden a la duración del debate en el segundo tema: <b>De 8:42PM a 9:21PM</b> aproximadamente. Es interesante notar que este tema fue el peor aceptado en las menciones (Hubo un buen número de menciones negativas para todos los candidatos).
                                    Recomendamos a los candidatos reflexionar sobre esto y poder aprovecharlo para el siguiente debate presidencial.
                                    <hr/>
                                    <hr/>
                                    <div className="row">
                                        <div className="col">
                                            <img alt="anaya" src = "/images/debate/MencionesRicardoAnayaSegundoTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="amlo" src = "/images/debate/MencionesAmloSegundoTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="meade" src = "/images/debate/MencionesMeadeSegundoTema.jpeg" className="img-fluid"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <br/>

                            <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">

                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon m--hide">
                                                <i className="flaticon-statistics"/>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Análisis de menciones en el bloque: <b>Democracia, pluralismo y situacion de grupos de vulnerabilidad</b>
                                            </h3>
                                            <h2 className="m-portlet__head-label m-portlet__head-label--info">
                                                <span>Menciones Positivas vs Negativas en el Tercer Bloque</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-portlet__body">
                                    Se tomaron los tiempos manuales de el tercer tema, para hacer una clasificación de tweets basadas en este.
                                    <br/>
                                    Los tweets analizados en este segmento corresponden a la duración del debate en el tercer tema: <b>De 9:21PM a 9:59</b> aproximadamente. Es interesante notar que este tema fue, junto con el segundo tema, el peor aceptado entre las menciones. Así mismo fue el tema que duró mas tiempo.
                                    <hr/>
                                    <hr/>
                                    <div className="row">
                                        <div className="col">
                                            <img alt="anaya" src = "/images/debate/MencionesRicardoAnayaTercerTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="amlo" src = "/images/debate/MencionesAmloTercerTema.jpeg" className="img-fluid"/>
                                        </div>
                                        <div className="col">
                                            <img alt="meade" src = "/images/debate/MencionesMeadeTercerTema.jpeg" className="img-fluid"/>
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


export default Debate
