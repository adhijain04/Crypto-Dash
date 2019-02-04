import React from 'react';
import PriceGrid from './PriceGrid';
import CoinSpotLight from './CoinSpotLight';
import { connect } from 'react-redux'

const index = (props) => {
	return <div>
		<PriceGrid />
		<CoinSpotLight />
	</div>
}

const mapStateToProps = state => {
	return {
	}
}

export default connect(mapStateToProps, null)(index);