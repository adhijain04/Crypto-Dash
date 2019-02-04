import React, { Component } from 'react';
import Settings from './settings';
import Dashboard from './dashboard';
import AppBar from './components/AppBar';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        {this.props.page === "settings" ? (<Settings />) : (<Dashboard />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		page : state.RequestCoinReducer.page
	}
}

export default connect(mapStateToProps,null)(App);
