import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as action from '../store/actions/Actions';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ConfirmButton extends Component {
	render() {
		let coinList = Object.values(this.props.filteredCoins).slice(0, 100);
		let coinSymbols = [];
		// let flag = false;
		this.props.favoriteCoins.map((coin, i) => {
			coinSymbols.push(coin.Symbol);
		});
		// this.props.favoriteCoinsIndex.map((coinindex, i) => {
		// 	coinList.map((coin, index) => {
		// 		if (coinindex == index) {
		// 			flag = true
		// 		}
		// 		return flag
		// 	})
		// })
		return (
			<div className='component-container'>
				<ToastContainer position="bottom-center" autoClose={2500} hideProgressBar={true} closeOnClick={false} newestOnTop={false} pauseOnHover={true} draggable={true} />
				<div className='coins-container'>
					<div className='filters-container'>
						<h3 className='coin-heading'>Coin List ({coinList.length})</h3>
						<div className='search-container'>
							<label className='search-label' htmlFor="">Search</label>
							<input className='search-input' placeholder='Enter coin name' type="text" onChange={this.props.searchCoinsInput} />
							{/*<button className='search-button'>Search</button>*/}
						</div>
					</div>
					<div className='coin-grid'>
						{coinList.length > 0 ? (
							coinList.map((coin, i) => {
								return (
									<div key={i} className='coin-div' onClick={this.props.addCoinsToFavourite.bind(this, coin, i)}>
										<div className='coin-info'>
											<p className='coin-name'>{coin.FullName}</p>
										</div>
										<img className='coin-image' src={"http://cryptocompare.com" + coin.ImageUrl} alt="" />
									</div>
								)
							})
						) : (
								this.props.fetchingCoinsError === "" ? (
									<div className='loader-container'>
										<img className='loader' src="/images/loader.svg" alt="loading Coins" />
										<p>Fetching Coins....</p>
									</div>
								) : (
										<div className='error-container'>
											<img src="/images/error.png" className='error-image' alt="" />
											<p className='error-message'>{this.props.fetchingCoinsError} coins, <br />Please check your network connection.</p>
										</div>
									)
							)}
					</div>
				</div>
				<div className={(this.props.isPending) ? 'confirmButton confirmButton-disabled' : 'confirmButton'} disabled={(this.props.isPending) ? true : false} onClick={this.props.fetchCoinsPrices.bind(this, coinSymbols)}>
					{this.props.fetchingPricesError === "" ? (
						this.props.isPending ? (
							<div className='loader-container'>
								<p style={{ margin: '0px' }}>Conforming Settings....</p>
							</div>
						) : ("Confirm Favorites")
					) : this.props.fetchingPricesError}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		coins: state.RequestCoinReducer.coins,
		isPending: state.RequestCoinReducer.isPending,
		firstVisit: state.RequestCoinReducer.firstVisit,
		favoriteCoins: state.RequestCoinReducer.favoriteCoins,
		filteredCoins: state.RequestCoinReducer.filteredCoins,
		fetchingCoinsError: state.RequestCoinReducer.fetchingCoinsError,
		favoriteCoinsIndex: state.RequestCoinReducer.favoriteCoinsIndex,
		fetchingPricesError: state.RequestCoinReducer.fetchingPricesError,
		favoriteCoinsPrices: state.RequestCoinReducer.favoriteCoinsPrices,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCoinsPrices: (coinSymbols) => dispatch(action.fetchCoinsPrices(coinSymbols)),
		addCoinsToFavourite: (coin, i) => dispatch(action.addCoinsToFavourite(coin, i)),
		searchCoinsInput: (event) => dispatch(action.searchCoinsInput(event.target.value))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmButton);