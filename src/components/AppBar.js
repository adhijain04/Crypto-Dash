import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../store/actions/Actions';

let cryptoData = JSON.parse(localStorage.getItem('cryptoDash'));

class AppBar extends Component {

	componentWillMount() {
		let coinSymbols = [];
		if (cryptoData === null) {
			this.props.changePage(); // go to settings
		} else {
			cryptoData.favoriteCoins.map((coin,i) => {
				coinSymbols.push(coin.Symbol);
			});
			this.props.changePageToDashboard(coinSymbols); // go to dashboard
			this.props.displayFavouriteCoins(cryptoData.favoriteCoins, cryptoData.currentFavoriteCoin);
			this.props.fetchCoinsHistoricData(cryptoData.currentFavoriteCoin)


		}
		this.props.coinList();

	}

	render() {
		return (
			<div className='appbar'>
				<div className='logo'>
					<p className='logo-name'>CryptoDash</p>
				</div>
				<div className='appBarOptions'>
					<button name="dashboad" className={this.props.page === 'dashboard' ? "appBarOptionSelected" : "appBarOption"} onClick={this.props.dashboardPage}>Dashboard</button>
					<button name='settings' className={this.props.page === 'settings' ? "appBarOptionSelected" : "appBarOption"} onClick={this.props.settingsPgae}>Settings</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		page: state.RequestCoinReducer.page,
		coinList: state.RequestCoinReducer.coins
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		changePage: () => dispatch(action.changePage()),
		changePageToDashboard: (coinSymbols) => dispatch(action.changePageToDashboard(coinSymbols)),
		settingsPgae: () => dispatch(action.settingsPgae()),
		dashboardPage: () => dispatch(action.dashboardPage()),
		coinList: () => dispatch(action.requestCoins()),
		displayFavouriteCoins: (cryptoData, currentFavoriteCoin) => dispatch(action.displayFavouriteCoins(cryptoData, currentFavoriteCoin)),
		fetchCoinsHistoricData: (currentFavoriteCoin) => (dispatch(action.fetchCoinsHistoricData(currentFavoriteCoin)))

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AppBar);