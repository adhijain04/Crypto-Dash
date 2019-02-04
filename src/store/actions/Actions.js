export const changePage = () => {
	return {
		type: 'CHANGE_PAGE_TO_SETTINGS',
		value: "settings",
		firstVisit: true
	}
}

export const changePageToDashboard = (coinSymbols) => (dispatch) => {
	dispatch({ type: 'CHANGE_PAGE_TO_DASHBOARD', value: "dashboard", firstVisit: false });
	dispatch({ type: 'FETCH_COINS_PRICE_PENDING' });
	fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinSymbols}&tsyms=USD&api_key=926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce`, {
		method: "GET",
		mode: 'cors',
		cache: "no-cache",
		credentials: "same-origin",
	}).then((data) => data.json())
		.then((data) => {
			dispatch({ type: 'FETCH_COINS_PRICE_SUCCESS', value: data.DISPLAY });
		}).catch((error) => {
			dispatch({ type: 'FETCH_COINS_PRICE_FAILED', value: error.message });
		})
}

export const settingsPgae = () => {
	return { type: 'SETTINGS_PAGE', value: "settings" }
}

export const dashboardPage = () => {
	return { type: 'DASHBOARD_PAGE', value: "dashboard" }
}

export const requestCoins = () => (dispatch) => {
	dispatch({ type: 'REQUEST_COINS_PENDING' });
	fetch('https://min-api.cryptocompare.com/data/all/coinlist?926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce', {
		method: "GET",
		mode: 'cors',
		cache: "no-cache",
		credentials: "same-origin",
	}).then((data) => data.json())
		.then((data) => {
			dispatch({ type: 'REQUEST_COINS_SUCCESS', value: data.Data });
		}).catch((error) => {
			dispatch({ type: 'REQUEST_COINS_FAILED', value: error.message });
		})
}

export const fetchCoinsPrices = (coinSymbols) => (dispatch) => {
	if (coinSymbols.length > 0) {
		dispatch({ type: 'FETCH_COINS_PRICE_PENDING' });
		fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinSymbols}&tsyms=USD&api_key=926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce`, {
			method: "GET",
			mode: 'cors',
			cache: "no-cache",
			credentials: "same-origin",
		}).then((data) => data.json())
			.then((data) => {
				dispatch({ type: 'FETCH_COINS_PRICE_SUCCESS', value: data.DISPLAY });
				dispatch({ type: 'CONFIRM_FAVOURITES', value: "dashboard", firstVisit: false });
			}).catch((error) => {
				dispatch({ type: 'FETCH_COINS_PRICE_FAILED', value: error.message });
			})

		dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_PENDING' });
		fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${coinSymbols[0]}&tsym=USD&limit=10&api_key=926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce`, {
			method: "GET",
			mode: 'cors',
			cache: "no-cache",
			credentials: "same-origin",
		}).then((data) => data.json())
			.then((data) => {
				dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_SUCCESS', value: data.Data });
			}).catch((error) => {
				dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_FAILED', value: error.message });
			})
	} else {
		dispatch({ type: 'FETCH_COINS_PRICE_FAILED', value: "Failed to confirm, Please Select some coins first!" });
	}
}

export const displayFavouriteCoins = (value, currentFavoriteCoin) => {
	return {
		type: 'displayFavouriteCoins',
		value: value,
		currentFavoriteCoin: currentFavoriteCoin
	}
}

export const addCoinsToFavourite = (coin, i) => {
	return {
		type: "addCoinsToFavourite",
		value: coin,
		index: i,
	}
}
export const removeCoinsFromFavourite = (i) => {
	return {
		type: "removeCoinsFromFavourite",
		value: i
	}
}

export const searchCoinsInput = (input) => {
	return {
		type: "searchCoinsInput",
		value: input.toLowerCase()
	}
}

export const setCurrentFavorite = (coin) => (dispatch) => {
	dispatch({ type: 'setCurrentFavorite', value: coin });
	dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_PENDING' });
	fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=10&api_key=926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce`, {
		method: "GET",
		mode: 'cors',
		cache: "no-cache",
		credentials: "same-origin",
	}).then((data) => data.json())
		.then((data) => {
			dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_SUCCESS', value: data.Data });
		}).catch((error) => {
			dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_FAILED', value: error.message });
		})
}

export const fetchCoinsHistoricData = (coinSymbol) => (dispatch) => {
	dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_PENDING' });
	fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${coinSymbol}&tsym=USD&limit=10&api_key=926abdf018dcc41e252b63e5bac87d9848f3d5611136b407738de0ca6b4f81ce`, {
		method: "GET",
		mode: 'cors',
		cache: "no-cache",
		credentials: "same-origin",
	}).then((data) => data.json())
		.then((data) => {
			dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_SUCCESS', value: data.Data });
		}).catch((error) => {
			dispatch({ type: 'FETCH_COINS_HISTORIC_DATA_FAILED', value: error.message });
		})
}