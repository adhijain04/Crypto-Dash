import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as action from '../store/actions/Actions';

class Dashboard extends Component {
	render() {
		let currentFavoriteCoin = this.props.currentFavoriteCoin;
		return (
			!this.props.firstVisit ? (
				this.props.currentCoinHistoricDataError === "" ? (
					<div className='priceGrid-container'>
						<h3 className='coin-price-heading'>Your Favorite Coins Prices</h3>
						{this.props.favoriteCoinsPrices.length > 0 ? (
							<div className='coin-price-grid-container'>
								<div className='coin-price-grid'>
								{this.props.favoriteCoinsPrices.map((prices,i) => {
									let symbol = prices.USD;
									return (
										<div key={i} className={currentFavoriteCoin === symbol.FROMSYMBOL ? 'coin-price-div currentFavoriteCoin' : 'coin-price-div'} onClick={this.props.setCurrentFavorite.bind(this, symbol.FROMSYMBOL)}>
											<div className='coin-price-info'>
												<div className='coin-price-details'>
													<img className='coin-price-image' src={"http://cryptocompare.com" + symbol.IMAGEURL} alt=""/>
													<p className='coin-price-symbol'>{symbol.FROMSYMBOL}</p>
												</div>
												<p className={symbol.CHANGEPCT24HOUR > 0 ? 'coin-price-change-rate-positive' : 'coin-price-change-rate-negative'}>{symbol.CHANGEPCT24HOUR > 0 ? ("+" + symbol.CHANGEPCT24HOUR + '%') : (symbol.CHANGEPCT24HOUR + '%') }</p>
											</div>
											<p className='coin-price'>{symbol.PRICE}</p>
										</div>
									)
								})}
							</div>
							</div>
						) : (
							<div className='loader-container'>
								{this.props.currentCoinHistoricDataError === "" ? <img className='loader' src="/images/loader.svg" alt="loading Coins"/> : null}
								<p>Fetching Prices....</p>
							</div>
						)}
					</div>
				) : (
					<div className='priceGrid-container-error'>
						<img src="/images/error.png" alt=""/>
						<p className='error-message'>{this.props.currentCoinHistoricDataError+ " Coin Prices!" + " Please check your network connection."}</p>
					</div>
				)
			) : (
				<div className='new-priceGrid-container'>
					<h1 className='new-coin-price-heading'>Oops..</h1>
					<h3 className='new-coin-price-heading'>Looks like you haven't selected any coins yet.</h3>
					<h5 className='new-coin-price-heading'>Pleae select some coins in the settings to begin with.</h5>
				</div>
			)
		)
	}
}

const mapStateToProps = (state) => {
	return {
		firstVisit: state.RequestCoinReducer.firstVisit,
		favoriteCoinsPrices: state.RequestCoinReducer.favoriteCoinsPrices,
		currentCoinHistoricDataError: state.RequestCoinReducer.currentCoinHistoricDataError,
		currentFavoriteCoin: state.RequestCoinReducer.currentFavoriteCoin,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentFavorite: (coin) => dispatch(action.setCurrentFavorite(coin))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);