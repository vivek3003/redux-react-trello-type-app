import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import StagesContainer from './components/StagesContainer.jsx';
import { connect } from 'react-redux'
import '../scss/main.scss';


class Main extends React.Component{
	render(){
		return (
			<div className='main'>
				<Navbar />
				<StagesContainer
                    lists={this.props.lists}
                />
			</div>
		);
	}
}


// Wrap the component to inject dispatch and state into it
export default connect(state => state)(Main)