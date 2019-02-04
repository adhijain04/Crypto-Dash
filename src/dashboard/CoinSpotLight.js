import React, { Component } from 'react' ;
import {connect} from 'react-redux';
import * as actions from '../store/actions/Actions'
import HighChartConfig from './HighChartConfig';
import HighChartTheme from './HighChartTheme';
import ReactHighCharts from 'react-highcharts';

import moment from 'moment'

ReactHighCharts.Highcharts.setOptions(HighChartTheme);

let cryptoData = JSON.parse(localStorage.getItem('cryptoDash'));

class CoinSpotLight extends Component {
	render () {
		let chartData
		if(this.props.currentCoinHistoricData.length > 0) {
			chartData = [
			{
				name : this.props.currentFavoriteCoin,
				data : this.props.currentCoinHistoricData.map((data,i) => [
					moment(data.time).format("HH:mm"),
					data.high
				])
			}]
		} else {
			chartData = null
		}
		let spottedCoin;
		{this.props.newFavouriteCoins.map((coin,i) => {
			if(this.props.currentFavoriteCoin === coin.Symbol){
				spottedCoin = coin
			}
		})}
		return (
			!this.props.firstVisit ? (
				spottedCoin ? (
					this.props.currentCoinHistoricDataError === "" ?
					(
						<div className = 'CoinSpotLight-container'>
							<div className='coin-details-container'>
								<h3 className='spottedCoin-name'>{spottedCoin.CoinName}</h3>
								<img className='current-coin-image' src={"http://cryptocompare.com" + spottedCoin.ImageUrl} alt="coin image"/>
							</div>
							<div className='coin-graph-container'>
								{chartData !== null ? <ReactHighCharts id='chart' className='chart' config = {HighChartConfig(chartData)} /> : <p>Fetching Historical Chart Data.....</p>}
							</div>
						</div>
					) : (
						<div className = 'CoinSpotLight-container'>
							<div className='coin-details-container-error'>
								<p className='error-message'>{this.props.currentCoinHistoricDataError+ " Coin Historic Chart Data!"}</p>
							</div>
						</div>
					)
				) : (
					<div className='coin-detail-error-container'>
						<h1 className='coin-error-message'>Ooops...</h1>
						<h3 className='coin-error-message'>No relevant data available for this coin!</h3>
						<p className='coin-error-message'>Try selecting some other coin.</p>
					</div>
				)
			) : null
		)
	}
}

const MapStateToProps = (state) => {
	return {
		firstVisit: state.RequestCoinReducer.firstVisit,
		newFavouriteCoins: state.RequestCoinReducer.newFavouriteCoins,
		currentFavoriteCoin: state.RequestCoinReducer.currentFavoriteCoin,
		currentCoinHistoricData: state.RequestCoinReducer.currentCoinHistoricData,
		currentCoinHistoricDataError: state.RequestCoinReducer.currentCoinHistoricDataError
	}
}

const MapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(MapStateToProps, MapDispatchToProps)(CoinSpotLight);