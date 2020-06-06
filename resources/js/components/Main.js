import React, {Component} from 'react';
import ShortenedForm from "./Shortened/ShortenedForm";
import { Link } from 'react-router-dom'
class Main extends Component {

    render() {
        return (
            <div className="content">
                <div className="container">
                    <ShortenedForm />
                    <div className="">
                        <h2>Recent Links</h2>
                        <div className="entry-content">
                            <ul>
                                <li><Link to="">http://hth/exmaple</Link></li>
                                <li>1 week ago</li>
                                <li><Link to="">http://google.com</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


}
export default Main;
