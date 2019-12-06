import React, { Component } from 'react';
import NavbarComponent from '../components/navbar';
import { Link } from 'react-router-dom';

class CandidatesComponent extends Component {

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
                                      Candidatos a la presidencia de México 2018
                                  </h3>
                                  <hr/>
                              </div>
                          </div>
                      </div>

                       <div className="m-content">
                          <div className="row">

                              <div className="col-xl-4">
                                  <div className="m-portlet m-portlet--bordered-semi m-portlet--full-height  m-portlet--rounded-force">
                                      <div className="m-portlet__head m-portlet__head--fit">
                                          <div className="m-portlet__head-caption">
                                          </div>
                                      </div>
                                      <div className="m-portlet__body">
                                          <div className="m-widget19">
                                              <div className="m-widget19__pic m-portlet-fit--top m-portlet-fit--sides" style={{minHeight: "286px"}} >
                                                  <img src="images/anaya.jpg" alt=""/>
                                                  <h3 className="m-widget19__title m--font-light">
                                                      Ricardo Anaya
                                                  </h3>
                                                  <div className="m-widget19__shadow">

                                                  </div>
                                              </div>
                                              <div className="m-widget19__content">
                                                  <div className="m-widget19__header">

                                                  </div>
                                                  <div className="m-widget19__body">
                                                      Ricardo Anaya Cortés (Santiago de Querétaro, México, 25 de febrero de 1979) es un político y abogado mexicano, militante del Partido Acción Nacional (PAN). Es candidato a la presidencia de México por la coalición Por México al Frente
                                                  </div>
                                              </div>

                                               <div className="m-widget19__action">
                                                   <a href="/candidato/2">
                                                       <button type="button" className="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                                                           Ir al perfil
                                                       </button>
                                                   </a>
                                               </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-xl-4">
                                  <div className="m-portlet m-portlet--bordered-semi m-portlet--full-height  m-portlet--rounded-force">
                                      <div className="m-portlet__head m-portlet__head--fit">
                                          <div className="m-portlet__head-caption">
                                          </div>
                                      </div>
                                      <div className="m-portlet__body">
                                          <div className="m-widget19">
                                              <div className="m-widget19__pic m-portlet-fit--top m-portlet-fit--sides" style={{minHeight: "286px"}} >
                                                  <img src="images/amlo.jpg" alt=""/>
                                                  <h3 className="m-widget19__title m--font-light">
                                                      Andrés Manuel López
                                                  </h3>
                                                  <div className="m-widget19__shadow">

                                                  </div>
                                              </div>
                                              <div className="m-widget19__content">
                                                  <div className="m-widget19__header">

                                                  </div>
                                                  <div className="m-widget19__body">
                                                      Andrés Manuel López Obrador (Tepetitán, Macuspana, Tabasco, 13 de noviembre de 1953) es un político, politólogo y escritor mexicano. Es fundador y militante del partido Movimiento Regeneración Nacional (Morena) y candidato a la presidencia de México por la coalición Juntos Haremos Historia
                                                  </div>
                                              </div>

                                              <div className="m-widget19__action">
                                                   <a href="/candidato/1">
                                                       <button type="button" className="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                                                           Ir al perfil
                                                       </button>
                                                   </a>
                                               </div>
                                          </div>
                                      </div>

                                      <div className="m-widget19__action">
                                          <button type="button" className="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                                              Ir al perfil
                                          </button>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-xl-4">
                                  <div className="m-portlet m-portlet--bordered-semi m-portlet--full-height  m-portlet--rounded-force">
                                      <div className="m-portlet__head m-portlet__head--fit">
                                          <div className="m-portlet__head-caption">
                                          </div>
                                      </div>
                                      <div className="m-portlet__body">
                                          <div className="m-widget19">
                                              <div className="m-widget19__pic m-portlet-fit--top m-portlet-fit--sides" style={{minHeight: "286px"}} >
                                                  <img src="images/meade.jpg" alt=""/>
                                                  <h3 className="m-widget19__title m--font-light">
                                                      José Antonio Meade
                                                  </h3>
                                                  <div className="m-widget19__shadow">

                                                  </div>
                                              </div>
                                              <div className="m-widget19__content">
                                                  <div className="m-widget19__header">

                                                  </div>
                                                  <div className="m-widget19__body">
                                                      José Antonio Meade Kuribreña (Ciudad de México, 27 de febrero de 1969) es un político y economista mexicano. Es candidato a la presidencia de México en las elecciones federales de 2018 por la coalición Todos por México
                                                  </div>
                                              </div>

                                              <div className="m-widget19__action">
                                                   <a href="/candidato/3">
                                                       <button type="button" className="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                                                           Ir al perfil
                                                       </button>
                                                   </a>
                                               </div>
                                          </div>
                                      </div>

                                      <div className="m-widget19__action">
                                          <button type="button" className="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                                              Ir al perfil
                                          </button>
                                      </div>
                                  </div>
                              </div>

                          </div>
                       </div>
                  </div>
              </div>
              {/*
              <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                  <h1 className="display-4">Candidatos</h1>
              </div>
              <div className="container">
                  <div className="card-deck mb-3 text-center">
                      <div className="card mb-4 box-shadow">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">
                                <a href="/candidatos/1">
                                    Andres Lopez Obrador
                                </a>
                            </h4>
                          </div>
                          <div className="card-body">
                              <img alt= "Lopez" src="/images/amlove.jpg" className="card-img-top"/>
                             <Link to="/candidatos/1"> <button type="button" className="btn btn-lg btn-block btn-outline-primary">Ir al perfil</button></Link>
                          </div>
                      </div>
                      <div className="card mb-4 box-shadow">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">
                                <a href="/candidatos/2">
                                    Ricardo Anaya
                                </a>
                            </h4>
                          </div>
                          <div className="card-body">
                              <img alt= "Anaya" src="/images/anaya.jpg" className="card-img-top"/>
                              <Link to="/candidatos/2"><button type="button" className="btn btn-lg btn-block btn-outline-primary">Ir al perfil</button></Link>
                          </div>
                      </div>
                      <div className="card mb-4 box-shadow">
                          <div className="card-header">
                            <h4 className="my-0 font-weight-normal">
                                <a href="/candidatos/3">
                                    Jose Antonio Meade
                                </a>
                            </h4>
                          </div>
                          <div className="card-body">
                              <img alt= "Meade" src="/images/meade.jpg" className="card-img-top"/>
                              <Link to="/candidatos/3"><button type="button" className="btn btn-lg btn-block btn-outline-primary">Ir al perfil</button></Link>
                          </div>
                      </div>
                  </div>
              </div>
              */}
          </div>

      )
  }
}

export default CandidatesComponent;
