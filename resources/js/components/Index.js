import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Main from './Main';

 class Index extends Component {

        constructor() {
            super();
        }

        componentWillMount() {
            let state = localStorage['UrlShortenerState'];
            if (state) {
                let UrlShortenerState = JSON.parse(state);
            }
        }

        render() {
            return (
                <div id="app" key="app-url-shortener">
                <BrowserRouter>
                    <Header />
                    <Route component={Main} />
                </BrowserRouter>
                </div>
            )
        };
 }

 export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
