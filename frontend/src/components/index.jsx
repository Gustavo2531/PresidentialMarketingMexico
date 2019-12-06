import React, { Component } from 'react';
import NavbarComponent from '../components/navbar'

class IndexComponent extends Component {
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
                                      Bienvenido
                                  </h3>
                              </div>

                          </div>
                      </div>

                       <div className="m-content">
                          <div className="row">

                              <div className="col-xl-4">
                                  <div className="m-portlet m--bg-accent m-portlet--bordered-semi m-portlet--skin-dark m-portlet--full-height">

                                      <div className="m-portlet__head">
                                          <div className="m-portlet__head-caption">
                                              <div className="m-portlet__head-title">
                                                  <h3 className="m-portlet__head-text">
                                                      Anuncios
                                                  </h3>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="m-portlet__body">
                                              <div className="m-widget7 m-widget7--skin-dark">
                                                  <div className="m-widget7__desc">
                                                      El proyecto ya se encuentra listo. Puedes empezar a ver las estadísticas para cada candidato.
                                                  </div>
                                                  <div className="m-widget7__user">
                                                      <div className="m-widget7__user-img">
                                                      </div>
                                                      <div className="m-widget7__info">
                                                          <span className="m-widget7__username"/>
                                                          <br/>
                                                          <span className="m-widget7__time"/>
                                                      </div>
                                                  </div>
                                                  <div className="m-widget7__button">
                                                      <a className="m-btn m-btn--pill btn btn-danger" href="/candidatos" role="button">
                                                          Empezar
                                                      </a>
                                                  </div>
                                              </div>
                                          </div>


                                  </div>
                              </div>

                              <div className="col-xl-8">
                                  <div className="m-portlet m-portlet--tabs m-portlet--info m-portlet--head-solid-bg m-portlet--bordered">
                                      <div className="m-portlet__head">
                                          <div className="m-portlet__head-tools">
                                              <ul className="nav nav-tabs m-tabs-line m-tabs-line--primary"
                                                  role="tablist">
                                                  <li className="nav-item m-tabs__item">
                                                      <a className="nav-link m-tabs__link active show" data-toggle="tab"
                                                         href="#inicio" role="tab" aria-selected="true">
                                                          <i className="la la-home"></i> Inicio
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                      <div className="m-portlet__body">
                                          <div className="tab-content">
                                              <div id="inicio" className="tab-pane active show" role="tabpanel" style={{fontSize: "18px"}}>
                                                  <p >
                                                      Bienvenido al analisis de los candidatos a la presidencia de Mexico en el 2018.
                                                      <br/>
                                                      Este proyecto tiene como fin el proporcionar las herramientas necesarias a los candidatos para analizar su impacto y ver las tendencias a futuro basado en un analisis de datos muy amplio, utilizando informacion de acceso publico.
                                                  </p>
                                                  <p>
                                                      Este proyecto ha sido desarrollado con las ultimas tendencias en <b>Machine Learning</b>, asi como modelos de <b>Inteligencia Artificial</b> y <b>Analitica de datos</b> para la toma de decisiones.
                                                  </p>
                                                  <p>
                                                      A continuacion se exponen los diferentes modelos de Machine Learning Utilizados:
                                                      <br/><br/>
                                                      <ul>
                                                          <li> <b>Lagrangian Support Vector Machine (LSVM)</b>: Utilizado para predecir si un texto es positivo vs negativo</li>
                                                          <li> <b>Random Forest</b>: Utilizado para predecir cuantos favoritos va a tener un tweet prueba, basado en datos historicos sacados de los perfiles publicos de cada candidato.</li>
                                                          <li> <b>Convolutional Neural Network (CNN)</b>: Utilizado para analizar videos, cuadro por cuadro y sacar un promedio de emociones presentes en los rostros que aparecen en el mismo.</li>
                                                          <li> <b>Latent Dirichlet Allocation (LDA)</b>: Utilizado para extraer los topicos o temas en un gran volumen de texto.</li>
                                                          <li> <b>Non Negative Matrix Factorization (NMF)</b>: Otro algoritmo utilizado para extraer los topicos o temas en un gran volumen de texto, con resultados un poco mas relevantes que LDA.</li>
                                                          <li> <b>Long Short Term Memory Neural Network (LSTMNN)</b>: Se hizo uso de una red neuronal LSTM (Long Short-tem memory) cuya finalidad es aprender de un bloque de texto para generar contenido nuevo basado en un input de 100 caracteres.
</li>
                                                      </ul>
                                                  </p>

                                              </div>
                                              <div id="impacto" className="tab-pane" role="tabpanel">
                                                  Lorem ipsum hue hue hueasdasdasd
                                              </div>
                                              <div id="comparacion" className="tab-pane" role="tabpanel">
                                                  Lorem ipsum hue hue huezxcxczxczxc
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>


                          </div>
                       </div>
                  </div>
              </div>



              {/*
              <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                  <h1 className="display-4">Mercadotecnia Personal</h1>
                  <p className="lead">
                      Bienvenido a la pagina principal del proyecto de mercadotecnia personal. Dirigida a los candidatos a la presidencia de México en 2018.
                      El proposito de este proyecto es proveer a los candidatos de informacion que los ayude a tomar desiciones y tener una métrica definida.
                  </p>
              </div>
              */
              }
          </div>

      )
  }
}

export default IndexComponent;
