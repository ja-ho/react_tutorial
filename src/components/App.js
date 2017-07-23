import React, { Component } from 'react'
import update from 'react-addons-update';

class App extends Component{
	render(){
		return(
			<Contacts/>
		);
	}
}

class Contacts extends Component{
	constructor(props) {
		super(props);
		this.state = {
			contactData: [
				{name:"Abet", phone:"010-0000-0001"},
				{name:"david", phone:"010-0000-0002"},
				{name:"charlie", phone:"010-0000-0003"},
				{name:"licole", phone:"010-0000-0004"}
			],
			selectedKey: -1
		};
		this._insertContact=this._insertContact.bind(this);
		this._isSelected=this._isSelected.bind(this);
		this._onSelect=this._onSelect.bind(this);
		this._removeContact=this._removeContact.bind(this);
	}

	_insertContact(name, phone){
		let newState = update(this.state, {
			contactData: {
				$push: [{"name": name, "phone": phone}]
			}
		});
		this.setState(newState);
	}

	_onSelect(key) {
		if(key==this.state.selectedKey) {
			console.log("key select Cancelled");
			this.setState({
				selectedKey: -1
			});
			return;
		}
		this.setState({
			selectedKey: key
		});
		console.log(key + " is selected");
	}

	_isSelected(key) {
		if(this.state.selectedKey == key) {
			return true;
		}
		else {
			return false;
		}
	}

	_removeContact() {
		if(this.state.selectedKey==-1) {
			console.log("contact not selected");
			return;
		}

		this.setState({
			contactData: update(
				this.state.contactData,
				{
					$splice: [[this.state.selectedKey, 1]]
				}
			),
			selectedKey: -1
		});
	}

	render() {
		return(
			<div>
				<h1>Contacts</h1>
				<ul>
					{this.state.contactData.map((contact, i) => {
						return (<ContactInfo name={contact.name}
											 phone={contact.phone}
											 key={i}
											 contactKey={i}
											 isSelected={this._isSelected(i)}
											 onSelect={this._onSelect}
											 />);
					})}
				</ul>
				<ContactCreator onInsert={this._insertContact}/>
				<ContactRemover onRemove={this._removeContact}/>
			</div>
		);
	}
}

class ContactInfo extends Component {

	handleClick() {
		this.props.onSelect(this.props.contactKey);
	}

	render() {
		let getStyle = (isSelect) => {
			if(!isSelect) return;

			let style = {
				fontWeight: 'bold',
				backgroundColor: '#4efcd8'
			};

			return style;
		}
		return(
			<li style={getStyle(this.props.isSelected)}
				onClick={this.handleClick.bind(this)}>{this.props.name} {this.props.phone}
			</li>

		);
	}

}

class ContactCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:"",
			phone:""
		};
		this.handleChange=this.handleChange.bind(this);
		this.handleClick=this.handleClick.bind(this);
	}

	handleChange(e) {
		let nextState={};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick(e) {
		this.props.onInsert(this.state.name, this.state.phone);
		this.setState({
			name:"",
			phone:""
		});
	}

	render() {
		return(
			<div>
				<p>
					<input type="text"
						   name="name"
						   placeholder="name"
						   value={this.state.name}
						   onChange={this.handleChange}/>
					<input type="text"
						   name="phaone"
						   placeholder="phone"
						   value={this.state.phone}
						   onChange={this.handleChange}/>
					<button onClick={this.handleClick}>
					Insert
					</button>
				</p>
			</div>
		);
	}
}

class ContactRemover extends Component {
	handleClick() {
		this.props.onRemove();
	}

	render() {
		return (
			<button onClick={this.handleClick.bind(this)}>
				Remove selected contact
			</button>
		);
	}
}

export default App;