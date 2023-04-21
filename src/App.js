/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.00,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    // Fetch Credits from API
    fetch("https://johnnylaicode.github.io/api/credits.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ creditList: data });
        let creditsTotal = 0;
        this.state.creditList.forEach(credit => {
          creditsTotal += credit.amount;
        });
        this.setState({ accountBalance: creditsTotal });
      })
      .catch((error) => console.error("Error fetching Credits:", error));

    // Fetch Debits from API
    fetch("https://johnnylaicode.github.io/api/debits.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ debitList: data });
        let debitsTotal = 0;
        this.state.debitList.forEach(debit => {
          debitsTotal += debit.amount;
        });
        this.setState((prevState) => ({
          accountBalance: prevState.accountBalance - debitsTotal
        }));
      })
      .catch((error) => console.error("Error fetching Debits:", error));
  }

  addCredit = (description, amount) => {
    const newCredit = {
      id: this.state.creditList.length + 1,
      description: description,
      amount: amount,
      date: new Date().toISOString()
    };
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
      accountBalance: prevState.accountBalance + amount
    }));
  };

  addDebit = (description, amount) => {
    const newDebit = {
      id: this.state.debitList.length + 1,
      description: description,
      amount: amount,
      date: new Date().toISOString()
    };
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
      accountBalance: prevState.accountBalance - amount
    }));
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;