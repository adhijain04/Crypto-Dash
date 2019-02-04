import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton'
import { connect } from 'react-redux'

const index = (props) => {
	return <div><WelcomeMessage />{props.page === "settings" ? <ConfirmButton /> : null}</div>
}

const mapStateToProps = state => {
	return {
		page: state.RequestCoinReducer.page
	}
}

export default connect(mapStateToProps, null)(index);