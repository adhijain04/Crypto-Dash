import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../store/actions/Actions';

class WelcomeMessage extends Component {
	render() {
		const { favoriteCoins, firstVisit, page, removeCoinsFromFavourite } = this.props;
		return (
			page === "settings" ? (
				<div className='WelcomeMessage-container'>
					{favoriteCoins.length === 0 ? (
						firstVisit === true ? (
							<h1 className='welcome-message'> <img src="/images/logo.png" alt="" /> Welcome to the CryptoDash, <br /> <span style={{ fontSize: '16px' }}>Please Add some coins to begin.</span></h1>
						) : (
								<div className='instruction-message-container'>
									<img className='instruction-image' src="/images/empty.png" alt="" />
									<span className='instruction-message'>Looks Like your favorites are empty, <br />Please Add some coins to begin.</span>
								</div>
							)
					) : (
							<div className='favorite-coins-container'>
								<h3 className='favorite-coins-heading'>Favorite Coins ({favoriteCoins.length})</h3>
								<div className='coin-grid'>
									{favoriteCoins.map((coin, i) => {
										return (
											<div key={i} className='coin-div' onClick={removeCoinsFromFavourite.bind(this, i)}>
												<div className='coin-info'>
													<p className='coin-name'>{coin.FullName}</p>
												</div>
												<img className='coin-image' src={"http://cryptocompare.com" + coin.ImageUrl} alt="" />
												{/* <i id="removeFavCoin" className="fas fa-times"></i> */}
											</div>
										)
									})}
								</div>
							</div>
						)}
				</div>
			) : (null)
		)
	}
}


const mapStateToProps = state => {
	return {
		firstVisit: state.RequestCoinReducer.firstVisit,
		favoriteCoins: state.RequestCoinReducer.favoriteCoins,
		page: state.RequestCoinReducer.page
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removeCoinsFromFavourite: (i) => dispatch(action.removeCoinsFromFavourite(i))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeMessage);
