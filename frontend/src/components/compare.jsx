import React, { Component } from 'react';
import NavbarComponent from '../components/navbar'
import { withRouter } from 'react-router-dom';
import DataService from "../services/DataService"
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend} from 'recharts';
import ActiveShapePieChart from './charts/ActiveShapePieChart'

// 4: amlo menciones positivas
// 5: anaya menciones positivas
// 6: meade menciones positivas

let candidates = [
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {}
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {}
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {}
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {}
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {},
        lastName: "Seguidores López Obrador"
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {},
        lastName: "Seguidores Anaya"
    },
    {
        personalityInsights: {
            consumption_preferences: []
        },
        mentionsPersonalityInsights: {},
        lastName: "Seguidores Meade"
    }
]

let personalityInsights = []
let valuesInsights = []
let needsInsights = []
let consumptionPreferences = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
}

var consumerNeedsCandidateOne, consumerNeedsCandidateTwo;

class CompareComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            candidate_one: 0,
            candidate_two: 0
        };

        this.changeCandidateOne = this.changeCandidateOne.bind(this)
        this.changeCandidateTwo = this.changeCandidateTwo.bind(this)
        this.generateConsumerNeedsCandidateOne = this.generateConsumerNeedsCandidateOne.bind(this)
        this.generateConsumerNeedsCandidateTwo = this.generateConsumerNeedsCandidateTwo.bind(this)
    }

    componentDidMount() {
        let self = this;
        DataService.getAllCandidates().then(
            function success(res) {
                console.log(res.data);
                let counter = 4;
                res.data.candidates.forEach(function(candidate) {
                    candidates[candidate.frontendId] = candidate
                    //candidates[counter] = candidate
                    //counter++
                })

                personalityInsights = res.data.personalityInsights;
                valuesInsights = res.data.valuesInsights;
                needsInsights = res.data.needsInsights;
                consumptionPreferences = res.data.consumptionPreferences;

                //console.log("Candidates", candidates)

            },
            function error(err) {
                console.log("Error getting candidate info, is the server up or are you using a valid ID?")
                console.error(err)
            })
    }

    changeCandidateOne(event) {
        this.setState(...this.state, {
            candidate_one: event.target.value
        })
        this.generateConsumerNeedsCandidateOne(event.target.value)
    }

    changeCandidateTwo(event) {
        this.setState(...this.state, {
            candidate_two: event.target.value
        })
        this.generateConsumerNeedsCandidateTwo(event.target.value)
    }

    generateConsumerNeedsCandidateOne(id) {
        consumerNeedsCandidateOne = consumptionPreferences[id].map(
            (consumptionPreference, i) => {
                return(consumptionPreference.score != 0 ? <div key={"two" + i}>{consumptionPreference.name}</div>: "")
            })
    }

    generateConsumerNeedsCandidateTwo(id) {
        consumerNeedsCandidateTwo = consumptionPreferences[id].map(
            (consumptionPreference, i) => {
                return(consumptionPreference.score != 0 ? <div key={"two" + i}>{consumptionPreference.name}</div>: "")
            })
    }


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
                                        Comparar Candidatos
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="m-portlet">
                            <div className="m-portlet__body m-portlet__body">
                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                    <div className="col-md-12 col-lg-12 col-xl-6">
                                        <div className="m-widget1">
                                            <div className="m-widget1__item">
                                                <div className="row m-row--no-padding align-items-center">
                                                    <div className="col">
                                                        <select className="form-control m-bootstrap-select m_selectpicker" onChange={this.changeCandidateOne}>
                                                            <option value="0">
                                                            </option>
                                                            <option value="1">
                                                                Andres Manuel Lopez Obrador
                                                            </option>
                                                            <option value="2">
                                                                Ricardo Anaya
                                                            </option>
                                                            <option value="3">
                                                                Jose Antonio Meade
                                                            </option>
                                                            <option value="4">
                                                                Seguidores Andres Manuel Lopez Obrador
                                                            </option>
                                                            <option value="5">
                                                                Seguidores Ricardo Anaya
                                                            </option>
                                                            <option value="6">
                                                                Seguidores Jose Antonio Meade
                                                            </option>
                                                        </select>
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
                                                        <select className="form-control m-bootstrap-select m_selectpicker" onChange={this.changeCandidateTwo}>
                                                            <option value="0">
                                                            </option>
                                                            <option value="1">
                                                                Andres Manuel Lopez Obrador
                                                            </option>
                                                            <option value="2">
                                                                Ricardo Anaya
                                                            </option>
                                                            <option value="3">
                                                                Jose Antonio Meade
                                                            </option>
                                                            <option value="4">
                                                                Seguidores Andres Manuel Lopez Obrador
                                                            </option>
                                                            <option value="5">
                                                                Seguidores Ricardo Anaya
                                                            </option>
                                                            <option value="6">
                                                                Seguidores Jose Antonio Meade
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                    <div className="col text-center">
                                        <h5 className="m-portlet__head-text">
                                            Se proporcionan los datos de Candidatos presidenciales (utilizando su timeline de twitter como generador del modelo), así como la de sus seguidores (las personas que los mencionaron con tweets positivos a lo largo del primer debate presidencial).
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">
                            <div className="m-portlet__head">
                                <div className="m-portlet__head-caption">
                                    <div className="m-portlet__head-title">
                                        <h3 className="m-portlet__head-text">
                                            Analísis basado en la API de IBM Watson. Esta comparativa permite descubrir similitudes entre candidatos y sus seguidores.
                                            Así como permitirle ver a los candidatos presidenciales de manera visual cómo se comportan o qué es lo que esperan sus seguidores o los seguidores de sus contrincantes.
                                        </h3>
                                        <h2 className="m-portlet__head-label m-portlet__head-label--danger">
                                            <span>Comparación de Análisis de Personalidad</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="m-portlet__body m-portlet__body--no-padding">
                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                    <div className="col-md-12 col-lg-12 col-xl-4">
                                        <div className="m-widget1 text-center">
                                            <h4>Personalidad</h4>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadarChart data={personalityInsights}>
                                                <PolarGrid/>
                                                <PolarAngleAxis dataKey="name"/>
                                                <PolarRadiusAxis/>
                                                <Radar name={candidates[this.state.candidate_one].lastName} dataKey={this.state.candidate_one} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                                                <Radar name={candidates[this.state.candidate_two].lastName} dataKey={this.state.candidate_two} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                                                <Legend/>
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-xl-4">
                                        <div className="m-widget1 text-center">
                                            <h4>Necesidades</h4>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadarChart data={needsInsights}>
                                                <PolarGrid/>
                                                <PolarAngleAxis dataKey="name"/>
                                                <PolarRadiusAxis/>
                                                <Radar name={candidates[this.state.candidate_one].lastName} dataKey={this.state.candidate_one} stroke="#F79F1F" fill="#F79F1F" fillOpacity={0.6}/>
                                                <Radar name={candidates[this.state.candidate_two].lastName} dataKey={this.state.candidate_two} stroke="#1289A7" fill="#1289A7" fillOpacity={0.6}/>
                                                <Legend/>
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-xl-4">
                                        <div className="m-widget1 text-center">
                                            <h4>Valores</h4>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadarChart data={valuesInsights}>
                                                <PolarGrid/>
                                                <PolarAngleAxis dataKey="name"/>
                                                <PolarRadiusAxis/>
                                                <Radar name={candidates[this.state.candidate_one].lastName} dataKey={this.state.candidate_one} stroke="#0652DD" fill="#0652DD" fillOpacity={0.6}/>
                                                <Radar name={candidates[this.state.candidate_two].lastName} dataKey={this.state.candidate_two} stroke="#EE5A24" fill="#EE5A24" fillOpacity={0.6}/>
                                                <Legend/>
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">
                            <div className="m-portlet__head">
                                <div className="m-portlet__head-caption">
                                    <div className="m-portlet__head-title">
                                        <h3 className="m-portlet__head-text">
                                            Analísis basado en la API de IBM Watson.
                                            Las preferencias de consumo permiten a los candidatos descubrir que es lo que su <i>timeline</i> de twitter refleja hacia las demas personas, así como descubrir que preferencias de consumo son las que sus seguidores o seguidores de sus contrincantes poseen.
                                            Esto con la finalidad de proveerle mas herramientas a los candidatos para tomar decisiones a la hora de armar su discurso o campaña política.
                                        </h3>
                                        <h2 className="m-portlet__head-label m-portlet__head-label--info">
                                            <span>Comparación de Preferencias de consumo</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="m-portlet__body">
                                <div className="row m-row--no-padding m-row--col-separator-xl">
                                    <div className="col">
                                        <div className="m-widget1 text-center">
                                            <h4>{candidates[this.state.candidate_one].lastName}</h4>
                                        </div>
                                        <div className="text-center">
                                            {consumerNeedsCandidateOne}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="m-widget1 text-center">
                                            <h4>{candidates[this.state.candidate_two].lastName}</h4>
                                        </div>
                                        <div className="text-center">
                                            {consumerNeedsCandidateTwo}
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

export default withRouter(CompareComponent);
