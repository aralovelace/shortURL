import React, {Component} from 'react';
import {Logo} from "./Logo/Logo";
import ReactDOM from 'react-dom';


class Header extends Component {

    render() {
        return (
            <div key="logo" className="mt-5 mb-2 ml-3">
                <Logo />
            </div>
        )
    }

}

export default Header;
