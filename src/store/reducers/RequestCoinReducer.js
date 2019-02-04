import { toast } from "react-toastify";

const initialState = {
	coins: [],
	isPending: false,
	favoriteCoins: [],
	filteredCoins: [],
	disabled: false,
	page: "settings",
	firstVisit: true,
	fetchingCoinsError: "",
	fetchingPricesError: "",
	searchCoinsInput: "",
	favoriteCoinsPrices: [],
	currentFavoriteCoin: '',
	currentCoinHistoricData: [],
	currentCoinHistoricDataError: '',
	newFavouriteCoins: [],
	favoriteCoinsIndex: []
}

const RequestCoinReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REQUEST_COINS_SUCCESS":
			return {
				...state,
				isPending: false,
				coins: action.value,
				filteredCoins: action.value
			}
		case "REQUEST_COINS_FAILED":
			return {
				...state,
				fetchingCoinsError: action.value,
				isPending: false,
			}
		case 'FETCH_COINS_PRICE_PENDING':
			return {
				...state,
				isPending: true
			}
		case 'FETCH_COINS_PRICE_SUCCESS':
			return {
				...state,
				isPending: false,
				favoriteCoinsPrices: Object.values(action.value),
				fetchingPricesError: ""
			}
		case 'FETCH_COINS_PRICE_FAILED':
			return {
				...state,
				fetchingPricesError: action.value,
				isPending: false,
			}
		case 'addCoinsToFavourite':
			let favoriteCoins = [...state.favoriteCoins];
			let flag = false;
			for (let i = 0; i < favoriteCoins.length; i++) {
				if (action.value.Id === favoriteCoins[i].Id) {
					flag = true;
					toast.success("This coin is already in the favourites coins.")
					return {
						...state,
						favoriteCoinsIndex: state.favoriteCoinsIndex.concat(action.index)
					}
				}
			}
			if (flag === false) {
				return {
					...state,
					favoriteCoins: state.favoriteCoins.concat(action.value),
					fetchingPricesError: ""
				}
			}
		case "removeCoinsFromFavourite":
			const newFavouriteCoins = [...state.favoriteCoins];
			newFavouriteCoins.splice(action.value, 1);
			return {
				...state,
				favoriteCoins: newFavouriteCoins
			}
		case "CONFIRM_FAVOURITES":
			localStorage.setItem('cryptoDash', JSON.stringify({ favoriteCoins: state.favoriteCoins, currentFavoriteCoin: state.favoriteCoins[0].Symbol }));
			return {
				...state,
				page: action.value,
				firstVisit: action.firstVisit,
				currentFavoriteCoin: state.favoriteCoins[0].Symbol,
				newFavouriteCoins: state.favoriteCoins
			}
		case 'displayFavouriteCoins':
			return {
				...state,
				favoriteCoins: state.favoriteCoins.concat(action.value),
				newFavouriteCoins: state.favoriteCoins.concat(action.value),
				currentFavoriteCoin: action.currentFavoriteCoin
			}
		case "CHANGE_PAGE_TO_SETTINGS":
			return {
				...state,
				page: action.value,
				firstVisit: action.firstVisit,
			}
		case "CHANGE_PAGE_TO_DASHBOARD":
			return {
				...state,
				page: action.value,
				firstVisit: action.firstVisit,
			}
		case "SETTINGS_PAGE":
			return {
				...state,
				page: action.value,
			}
		case "DASHBOARD_PAGE":
			return {
				...state,
				page: action.value,
			}
		case 'searchCoinsInput':
			let filteredCoins = state.coins;
			let filteredCoin = Object.values(filteredCoins).filter(filteredCoin => {
				if (filteredCoin.CoinName.toLowerCase() && filteredCoin.CoinName.toLowerCase().indexOf(action.value) > -1) {
					return filteredCoin
				}
			});
			filteredCoins = filteredCoin
			return {
				...state,
				searchCoinsInput: action.value,
				filteredCoins
			}
		case 'setCurrentFavorite':
			localStorage.setItem('cryptoDash', JSON.stringify({ favoriteCoins: state.favoriteCoins, currentFavoriteCoin: action.value }));
			return {
				...state,
				currentFavoriteCoin: action.value
			}
		case 'FETCH_COINS_HISTORIC_DATA_SUCCESS':
			return {
				...state,
				currentCoinHistoricData: state.currentCoinHistoricData.concat(action.value),
				isPending: false,
				currentCoinHistoricDataError: ""
			}
		case 'FETCH_COINS_HISTORIC_DATA_FAILED':
			return {
				...state,
				currentCoinHistoricDataError: action.value,
				isPending: false,
			}
		default:
			return state
	}
}

export default RequestCoinReducer