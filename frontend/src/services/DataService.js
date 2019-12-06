import axios from 'axios'

const serverURL = 'http://34.237.236.57:8005'

class DataService {

    static getAllCandidates() {
        let url = `${serverURL}/api/v1/candidates`
        return axios.get(url)
    }

    static getCandidateInfo(id) {
        let url = `${serverURL}/api/v1/candidate/${id}`
        return axios.get(url)
    }

    static getTopStories(query) {
        let url = `${serverURL}/api/v1/discovery/topStories`
        return axios.post(url, {
            query: query
        })
    }

    static getNewsSentimentAnalysis(query) {
        let url = `${serverURL}/api/v1/discovery/newsSentimentAnalysis`
        return axios.post(url, {
            query: query
        })
    }

    static getTrendsAndAnomalies(query) {
        let url = `${serverURL}/api/v1/discovery/trendsAndAnomalies`
        return axios.post(url, {
            query: query
        })
    }

    static predictTweet(tweet, frontendId) {
        let url = `${serverURL}/api/v1/python/predictTweet`
        return axios.post(url, {
            tweet: tweet,
            candidateFrontendId: frontendId
        })
    }

}

export default DataService;
