import React, { Component } from 'react';
import NavbarComponent from '../components/navbar'
import { withRouter } from 'react-router-dom';
import DataService from '../services/DataService'
import { PropagateLoader, RingLoader,PulseLoader } from 'react-spinners';
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import VideoAnalysis from './homepageComponents/videoAnalysis'

import ActiveShapePieChart from './charts/ActiveShapePieChart'
import VerticalStackedBarChart from './charts/VerticalStackedBarChart'
import SimpleLineChart from './charts/SimpleLineChart'

class SingleCandidateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidateId: this.props.match.params.id,
            candidate: {
                personalityInsights: {
                    needs: [],
                    consumption_preferences : [],
                },
                personalityInsightsMentions: {
                    needs: [],
                    consumption_preferences : [],
                }
            },
            topStories: [],
            newsSentimentAnalysis: [],
            trends: [],
            loadingStories: true,
            loadingNewsSentimentAnalysis: true,
            loadingTrends: true,
            predictError: "",
            predictionResult: ""
        }

        this.predictTweet = this.predictTweet.bind(this);
    }

    componentDidMount() {
        let self = this;

        let enabledNews                     = true;
        let enabledNewsSentimentAnalysis    = true;
        let enabledTrends                   = true;

        // First Get Candidate
        DataService.getCandidateInfo(this.state.candidateId).then(
            function success(res) {
                self.setState(...self.state, {
                    candidate: res.data
                })

                console.log(res.data)

                // If you got candidate, then get Top News for that candidate
                if(enabledNews) {
                    DataService.getTopStories(`${res.data.firstName} ${res.data.lastName}`).then(
                        function success(res) {
                            self.setState(...self.state, {
                                topStories: res.data.results,
                                loadingStories: false
                            })
                        },
                        function error(err) {
                            console.log("Error getting news sentiment analysis, is the server up or are you using a valid query?")
                            console.error(err)
                        }
                    )
                }
                //console.log("Per "+  res.data.personalityInsights.consumption_preferences);


                // If you got candidate, then get Sentiment Analysis for major news sites
                if(enabledNewsSentimentAnalysis) {


                    DataService.getNewsSentimentAnalysis(`${res.data.firstName} ${res.data.lastName}`).then(
                        function success(res) {
                            self.setState(...self.state, {
                                newsSentimentAnalysis: res.data.results,
                                loadingNewsSentimentAnalysis: false
                            })

                        },
                        function error(err) {
                            console.log("Error getting top stories, is the server up or are you using a valid query?")
                            console.error(err)
                        }
                    )
                }

                // If you got candidate, then get Trends
                if(enabledTrends) {
                    DataService.getTrendsAndAnomalies(`${res.data.firstName} ${res.data.lastName}`).then(
                        function success(res) {
                            console.log("got trends back");
                            console.log(res.data)
                            self.setState(...self.state, {
                                trends: res.data.results,
                                loadingTrends: false
                            })
                        },
                        function error(err) {
                            console.log("Error getting trends, is the server up or are you using a valid query?")
                            console.error(err)
                        }
                    )
                }
                //console.log("Per "+  this.state.candidate);
            },
            function error(err) {
                console.log("Error getting candidate info, is the server up or are you using a valid ID?")
                console.log(err)
            }
        )
    }

    predictTweet() {
        let self = this;
        let tweet = this.refs.predictTweet.value;

        if(!tweet) {
            this.setState(...this.state, {
                predictError: "Por favor ingresa el tweet que quieres predecir."
            })
            return;
        } else {
            this.setState(...this.state, {
                predictError: ""
            })
        }

        this.setState(...this.state, {
            isGettingPrediction: true,
        });

        DataService.predictTweet(tweet, this.state.candidateId).then(
            function success(res) {
                console.log(res);
                self.setState(...self.state, {
                    predictionResult: res.data[2],
                    isGettingPrediction: false,
                });
            },
            function error(res) {
                console.error(res);
                self.setState(...self.state, {
                    isGettingPrediction: false,
                });
            }
        )
    }

    render() {

        var topStoriesList = this.state.topStories.map(function(story) {
            return (

                <div className="m-widget3">
                    <div className="m-widget3__item">
                        <div className="m-widget3__header">
                            <div className="m-widget3__info" style={{paddingLeft: "0"}}>
                                <span className="m-widget3__username">
                                    <a href={story.url} target="_blank">{story.title}</a>
                                </span>
                                <br/>
                                <span className="m-widget3__time">
                                    {story.crawl_date}
                                </span>
                            </div>
                            <span className="m-widget3__status m--font-info">
                                {story.score}
                            </span>
                        </div>
                        <div className="m-widget3__body">
                            <p className="m-widget3__text">
                                {story.host}
                            </p>
                        </div>
                    </div>
                </div>
            )
        });

        var consumerNeeds = this.state.candidate.personalityInsights.consumption_preferences.map(
            function(consumptionPreference) {
                return(
                    consumptionPreference.consumption_preferences.map(
                        function (preference) {
                            return (preference.score != 0 ? <div>{preference.name}</div>: "")
                        })
                )
            }
        )

        var consumerNeedsMentions = this.state.candidate.personalityInsightsMentions.consumption_preferences.map(
            function(consumptionPreference) {
                return(
                    consumptionPreference.consumption_preferences.map(
                        function (preference) {
                            return (preference.score != 0 ? <div>{preference.name}</div>: "")
                        })
                )
            }
        )

        return (
            <div>
                <NavbarComponent/>

                <div className="m-grid__item m-grid__item--fluid  m-grid m-grid--ver-desktop m-grid--desktop 	m-container m-container--responsive m-container--xxl m-page__container m-body">
                    <div className="m-grid__item m-grid__item--fluid m-wrapper">

                        <div className="m-subheader">
                            <div className="d-flex align-items-center">
                                <div className="mr-auto">
                                    <h3 className="m-subheader__title ">
                                        Perfil del Candidato
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

                            <div className="m-portlet">
                                <div className="m-portlet__body m-portlet__body--no-padding">
                                    <div className="row m-row--no-padding m-row--col-separator-xl">

                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1">
                                                <div className="m-widget1__item">
                                                    <div className="row m-row--no-padding align-items-center">
                                                        <div className="col">
                                                            <h3 className="m-widget1__title">Tweets Analizados</h3>
                                                            <span className="m-widget1__desc">Total analizados</span>
                                                        </div>
                                                        <div className="col m--align-right">
                                                            <span className="m-widget1__number m--font-brand">{this.state.candidate.totalTweets}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1">
                                                <div className="m-widget1__item">
                                                    <div className="row m-row--no-padding align-items-center">
                                                        <div className="col">
                                                            <h3 className="m-widget1__title">Puntaje</h3>
                                                            <span className="m-widget1__desc">Basado en analisis</span>
                                                        </div>
                                                        <div className="col m--align-right">
                                                            <span className="m-widget1__number m--font-accent">Pendiente</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1">
                                                <div className="m-widget1__item">
                                                    <div className="row m-row--no-padding align-items-center">
                                                        <div className="col">
                                                            <h3 className="m-widget1__title">Promedio de favs</h3>
                                                            <span className="m-widget1__desc">Promedio por tweet</span>
                                                        </div>
                                                        <div className="col m--align-right">
                                                            <span className="m-widget1__number m--font-success">{this.state.candidate.favAverage}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="m-portlet m-portlet--bordered-semi m-portlet--full-height  m-portlet--rounded-force">
                                        <div className="m-portlet__head m-portlet__head--fit">
                                            <div className="m-portlet__head-caption">
                                            </div>
                                        </div>
                                        <div className="m-portlet__body">
                                            <div className="m-widget19">
                                                <div className="m-widget19__pic m-portlet-fit--top m-portlet-fit--sides" style={{minHeight: "286px"}}>

                                                    {this.state.candidateId === "1" && <img alt="AMLO" src = "/images/amloSmall.jpg"/>}
                                                    {this.state.candidateId === "2" && <img alt="Anaya" src = "/images/anayaSmall.jpg"/>}
                                                    {this.state.candidateId === "3" && <img alt="Meade" src = "/images/meadeSmall.jpg"/>}

                                                    <h3 className="m-widget19__title m--font-light">
                                                        {this.state.candidate.firstName} {this.state.candidate.lastName}
                                                        </h3>
                                                    <div className="m-widget19__shadow">

                                                    </div>
                                                </div>
                                                <div className="m-widget19__content">
                                                    <div className="m-widget19__header">

                                                    </div>
                                                    <div className="m-widget19__body">
                                                        {this.state.candidate.description}
                                                    </div>
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
                                    <div className="m-portlet m-portlet--bordered-semi m-portlet--full-height ">
                                        <div className="m-widget14 text-center">
                                            <div className="m-widget14__header">
                                                <h3 className="m-widget14__title">
                                                    Polaridad de Tweets
                                                </h3>
                                                <span className="m-widget14__desc">
                                                    Tweets negativos vs positivos
                                                </span>
                                                {this.state.candidateName !== "" ?
                                                    <ActiveShapePieChart
                                                        data = {
                                                            [{name: 'Positivos', value: this.state.candidate.positiveTweets},
                                                                {name: 'Negativos', value: this.state.candidate.negativeTweets}]
                                                        }
                                                        colors = {
                                                            ['#34bfa3', '#f4516c']
                                                        }
                                                    />
                                                    :
                                                    "loading..."
                                                }

                                                <hr/>
                                                <h3 className="m-widget14__title">
                                                    WordCloud de Tweets
                                                </h3>
                                                <span className="m-widget14__desc">
                                                    Palabras mas repetidas
                                                </span>
                                                <br/>
                                                <br/>
                                                {this.state.candidateId === "1" && <img alt="AMLO wordcloud" src = "/images/tweets-obrador.png" className="img-fluid"/>}
                                                {this.state.candidateId === "2" && <img alt="Anaya wordcloud" src = "/images/tweets-anaya.png" className="img-fluid" />}
                                                {this.state.candidateId === "3" && <img alt="Meade wordcloud" src = "/images/tweets-meade.png" className="img-fluid"/>}

                                                </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="m-portlet m-portlet--full-height ">

                                        <div className="m-portlet__head">
                                            <div className="m-portlet__head-caption">
                                                <div className="m-portlet__head-title">
                                                    <h3 className="m-portlet__head-text">Top 5 Noticias</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="m-portlet__body">
                                            {this.state.loadingStories ?
                                                <div className="text-center">
                                                    <PulseLoader color={'#00c5dc'} loading={this.state.loadingStories}/>
                                                </div>
                                                :
                                                topStoriesList
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="m-portlet m-portlet--skin-dark m-portlet--bordered-semi m--bg-brand">
                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon">
                                                <i className="flaticon-statistics"></i>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Preferencias de consumo
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                                <div className="m-portlet__body text-center">
                                    <div className="row">
                                        <div className="col">
                                            <h4>Del candidato</h4>
                                            {consumerNeeds}
                                        </div>
                                        <div className="col">
                                            <h4>De sus menciones</h4>
                                            {consumerNeedsMentions}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="m-portlet">
                                <div className="m-portlet__body m-portlet__body--no-padding">
                                    <div className="row m-row--no-padding m-row--col-separator-xl">

                                        <div className="col-md-12 col-lg-12 col-xl-6">
                                            <div className="m-widget1">
                                                <div className="m-widget1__item">
                                                    <div className="row m-row--no-padding align-items-center">
                                                        <div className="col">
                                                            <h3 className="m-widget1__title">Predecir Favoritos</h3>
                                                            <span className="m-widget1__desc">Predice el numero de favoritos dado un tweet</span>
                                                            <textarea className="form-control m-input m-input--solid" id="exampleTextarea" rows="15" ref="predictTweet"/>

                                                            {this.state.predictError ?
                                                                <div className="alert alert-warning" role="alert" style={{marginTop: '5px'}}>
                                                                    <strong>Error</strong> {this.state.predictError}
                                                                </div>
                                                                :
                                                                ""
                                                            }

                                                            <br/>
                                                            <div className="text-right">
                                                                <button type="reset" className="btn btn-success text-right" onClick={this.predictTweet} disabled={this.state.isGettingPrediction}>Predecir</button>
                                                            </div>
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

                                                            {this.state.isGettingPrediction ?
                                                                <div className="text-center">
                                                                    <PulseLoader color={'#00c5dc'} loading={this.state.isGettingPrediction}/>
                                                                </div> :
                                                                ""
                                                            }

                                                            <h3 className="m-widget1__title">Resultado: {this.state.predictionResult}</h3>
                                                            <span className="m-widget1__desc">
                                                                El resultado representa a que centroide pertence el tweet. Puedes usar la grafica para determinar el numero de favoritos que este tweet tendrá.
                                                                Nuestro modelo tuvo un porcentaje de <b>57% de precisión</b>.
                                                            </span>
                                                            {this.state.candidateId === "1" && <img alt="AMLO" src = "/images/lopezobrador_centroides_nuevo.png" className="img-fluid"/>}
                                                            {this.state.candidateId === "2" && <img alt="Anaya" src = "/images/RicardoAnayaC_centroides_nuevo.png" className="img-fluid"/>}
                                                            {this.state.candidateId === "3" && <img alt="Meade" src = "/images/JoseAMeadeK_centroides_nuevo.png" className="img-fluid"/>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <VideoAnalysis
                                positiveYoutubeComments = {this.state.candidate.positiveYoutubeComments}
                                negativeYoutubeComments = {this.state.candidate.negativeYoutubeComments}
                                analyzedVideoId = {this.state.candidate.analyzedVideoId}
                                videoEmotionResults = {this.state.candidate.videoEmotionResults}/>

                            <br/>

                            <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">
                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <h3 className="m-portlet__head-text">
                                                Análisis basado en los tweets del candidato. Esto refleja la personalidad de los ultimos tweets del candidato, es decir, como se ve ante sus seguidores.
                                            </h3>
                                            <h2 className="m-portlet__head-label m-portlet__head-label--danger">
                                                <span>Análisis de Personalidad (Candidato)</span>
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
                                                <RadarChart data={this.state.candidate.personalityInsights.personality}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#8884d8" fill="#8884d8"
                                                           fillOpacity={0.6}/>
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1 text-center">
                                                <h4>Necesidades</h4>
                                            </div>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <RadarChart data={this.state.candidate.personalityInsights.needs}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#F89406" fill="#F89406"
                                                           fillOpacity={0.6}/>
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1 text-center">
                                                <h4>Valores</h4>
                                            </div>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <RadarChart data={this.state.candidate.personalityInsights.values}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#CF000F" fill="#CF000F"
                                                           fillOpacity={0.6}/>
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
                                                Análisis basado en las menciones al candidato, tomadas a lo largo de el semestre Enero-Mayo del 2018. Esto refleja la personalidad de las personas que han mencionado a este candidato.
                                            </h3>
                                            <h2 className="m-portlet__head-label m-portlet__head-label--info">
                                                <span>Análisis de Personalidad (Menciones)</span>
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
                                                <RadarChart data={this.state.candidate.personalityInsightsMentions.personality}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#badc58" fill="#badc58"
                                                           fillOpacity={0.6}/>
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1 text-center">
                                                <h4>Necesidades</h4>
                                            </div>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <RadarChart data={this.state.candidate.personalityInsightsMentions.needs}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#e056fd" fill="#e056fd"
                                                           fillOpacity={0.6}/>
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-4">
                                            <div className="m-widget1 text-center">
                                                <h4>Valores</h4>
                                            </div>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <RadarChart data={this.state.candidate.personalityInsightsMentions.values}>
                                                    <PolarGrid/>
                                                    <PolarAngleAxis dataKey="name"/>
                                                    <PolarRadiusAxis/>
                                                    <Radar name="Mike" dataKey="percentile" stroke="#22a6b3" fill="#22a6b3"
                                                           fillOpacity={0.6}/>
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="m-portlet m-portlet--bordered-semi m-portlet--half-height m-portlet--fit " style={{minHeight: "400px"}}>

                                        <div className="m-portlet__head">
                                            <div className="m-portlet__head-caption">
                                                <div className="m-portlet__head-title">
                                                    <h3 className="m-portlet__head-text">
                                                        Sentimiento por Sitio de Noticias
                                                        &nbsp;

                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="m-portlet__body">
                                            <div className="text-center">
                                                <PulseLoader color={'#00c5dc'} loading={this.state.loadingNewsSentimentAnalysis}/>
                                            </div>
                                            <div className="m-widget20">
                                                {this.state.loadingNewsSentimentAnalysis ? '' : <VerticalStackedBarChart data = {this.state.newsSentimentAnalysis} />}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="m-portlet m-portlet--bordered-semi m-portlet--half-height m-portlet--fit " style={{minHeight: "500px"}}>

                                        <div className="m-portlet__head">
                                            <div className="m-portlet__head-caption">
                                                <div className="m-portlet__head-title">
                                                    <h3 className="m-portlet__head-text">
                                                        Tendencias y Anomalias
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="m-portlet__body">
                                            <div className="text-center">
                                                <PulseLoader color={'#00c5dc'} loading={this.state.loadingTrends}/>
                                            </div>
                                            <div className="m-widget20">
                                                {this.state.loadingTrends ? '' : <SimpleLineChart data={this.state.trends}/>}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {this.state.candidate.frontendId == 1 ?
                                <div className="m-portlet m-portlet--skin-dark m-portlet--bordered-semi">
                                <div className="m-portlet__head">
                                    <div className="m-portlet__head-caption">
                                        <div className="m-portlet__head-title">
                                            <span className="m-portlet__head-icon">
                                                <i className="flaticon-speech-bubble"/>
                                            </span>
                                            <h3 className="m-portlet__head-text">
                                                Generador de Discurso
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                                <div className="m-portlet__body">
                                    Se utiliza una red neuronal para generar un discurso para este candidato. El tipo de red neuronal es llamada Recursiva (que tiene conexiones en cada neurona hacia esa misma neurona) y tambien posee caracteristicas de una LSTM (Long Short-term Memory), esto quiere decir que la red neuronal es capaz de recordar los inputs pasados y las conexiones previas para hacer una predicción mas certera.
                                    <br/>
                                    <br/>
                                    La red neuronal fue entrenada con 3 capas de 400 unidades cada una de manera secuencial, con un documento que contiene los tweets con mas favoritos de ese candidato, la red fue entrenada por 100 épocas que tomó alrededor de 18 horas.
                                    <br/>
                                    <br/>
                                    La idea de esta red neuronal es generar texto basado en esos tweets. Por ejemplo, ese texto puede utilizarse como un discurso político que tenga un alto impacto ya que esta basado en algo que se ha probado que ha tenido efectividad en la población.
                                    <br/>
                                    <br/>
                                    El texto utilizado como input para la red neuronal una vez entrenada fue:
                                    <br/>
                                    <i>
                                    "la mafia del poder quiere calumniar y acusarme de cosas que no he hecho. es un hecho irrefutable que q”
                                    </i>
                                    <br/>
                                    <br/>
                                    El texto generado fue:
                                    <br/>
                                    <i>
                                    "a mafia del poder quiere calumniar y acusarme de cosas que no he hecho. es un hecho irrefutable que seli ma iicie podre reges está la gente "ahora sí" o como lo dice la canción de amaury pérez
                                    No lo van a impedir
                                    El sábado propondré en consejo de morena que se destine 50% del gasto de campaña de 2018 para los damnificados del istmo y del sureste del país.
                                    Buscaremos una relación de amistad y de cooperación con el gobierno de estados unidos, con respeto a nuestro pueblo y a la soberanía. los problemas sociales no se resuelven con muros ni con la militarización de la frontera, ni al muro; sí al respeto mutuo y a la cooperación para el desarrollo terminamos la gira por la frontera, además de reafirmar nuestra postura con relación a estados unidos, dimos a conocer nuestros proyectos para convertir a méxico en una potencia económica y social para el medio rural que se aplicará al triunfo de nuestro movimiento\nno seré mediocre ni mucho menos traidor a la patria. aspiro a seguir el ejemplo de los grandes presidentes de México. hoy iniciamos en tezonapa una gira de 7 días por Veracruz."
                                    </i>
                                    <br/>
                                    <br/>
                                    Es posible observar que la red neuronal ha entendido varios atributos de el discurso y ha aprendido a generar texto basado en un input como lo son los tweets de AMLO. También es posible ver que hay errores de redacción, sobre todo al principio de empezar a generar el texto. Es posible que añadiendo una capa extra e incrementando el numero de unidades por capa se logre un resultado superior.

                                </div>
                            </div>
                                :
                                ""
                            }

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(SingleCandidateComponent);
