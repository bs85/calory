import React, { Component } from 'react';
import './App.css';

import Dashboard from 'components/dashboard/dashboard';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Dashboard />
            </div>
        );
    }
}

export default App;
