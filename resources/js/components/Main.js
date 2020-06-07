import React, {Component} from 'react';
import ShortenedForm from "./Shortened/ShortenedForm";
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import ClipLoader from "react-spinners/ClipLoader";
import ShortUrlApi from "./apis/ShortUrlApi";
import {withRouter} from "react-router-dom";
import Moment from "react-moment";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shortUrls: []

        }
    }

    componentDidMount()  {
        this.setState({
            loading: true
        });

        ShortUrlApi.getRecent().then(response => {
            const resdata = response.data;
            this.setState({
                shortUrls: resdata.data,
                loading: false
            });
        }).catch(err => {
            error_message: 'There is an error';
        });
    }

    render() {
        return (
            <div className="content">
                <div className="container">
                    <ShortenedForm />
                    <div className="sweet-loading mt-3">
                        <ClipLoader
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                    </div>
                    <div className="pb-5">
                        <h2>Recent Links</h2>
                        {
                            this.state.shortUrls.length > 0 ? (
                                <div>
                                {
                                    this.state.shortUrls.map(link =>
                                        <div className="entry-content">
                                            <ul>
                                                <li><Link to="">{window.location.protocol}//{window.location.hostname}/{link.short_code}</Link></li>
                                                <time><Moment  format="YYYY/MM/DD HH:mm" date={new Date(link.created_at)}/></time>
                                                <li><Link to={link.long_url}>{link.long_url}</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                                </div>
                            ) : <div>No Short URL has been generated yet!</div>
                        }
                    </div>
                </div>
            </div>
        )

    }


}
export default withRouter(Main);
