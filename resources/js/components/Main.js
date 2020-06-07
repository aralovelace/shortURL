import React, {Component} from 'react';
import ShortenedForm from "./Shortened/ShortenedForm";
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import ClipLoader from "react-spinners/ClipLoader";
import ShortUrlApi from "./apis/ShortUrlApi";
import {withRouter} from "react-router-dom";
import moment from "moment";
import preciseDiff from "moment-precise-range-plugin";


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

    displayDateRange (created_at) {
        const now = new Date();
        const ranges = (moment.preciseDiff(created_at, now, true));
        let preciseDiff = "";
        Object.keys(ranges).map(function(key, index) {

               if (key=='years') {
                   preciseDiff = (ranges[key]>0) ? ranges[key]+ " year" : ""; preciseDiff+=(ranges[key] > 1) ? "s": "";
               } else if (key=='months' && preciseDiff=="") {
                   preciseDiff = (ranges[key]>0) ? ranges[key]+" month" : ""; preciseDiff+=(ranges[key] > 1) ? "s": "";
               } else if (key=='days' && preciseDiff=="") {
                   if (ranges[key]<7) {
                       preciseDiff = (ranges[key] > 0) ? ranges[key] + " day" : "";
                       preciseDiff += (ranges[key] > 1) ? "s" : "";
                   } else {
                       let numWeeks = (ranges[key]/7).toFixed(0);
                       preciseDiff = (numWeeks > 0) ? numWeeks + " week" : "";
                       preciseDiff += (numWeeks > 1) ? "s" : "";

                   }
               } else if (key=='hours' && preciseDiff=="") {
                   preciseDiff = (ranges[key]>0) ? ranges[key]+" hour" : ""; preciseDiff+=(ranges[key] > 1) ? "s": "";
               } else if (key=='minutes' && preciseDiff=="") {
                   preciseDiff = (ranges[key]>0) ? ranges[key]+" minute" : ""; preciseDiff+=(ranges[key] > 1) ? "s": "";
               } else if (key=='seconds' && preciseDiff=="") {
                   preciseDiff = (ranges[key]>0) ? ranges[key]+" second" : ""; preciseDiff+=(ranges[key] > 1) ? "s": "";
               }
        });
        return preciseDiff;
    }

    border(index) {
        return (index==9) ? "entry-content last" : "entry-content";
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
                                    this.state.shortUrls.map((link,index) =>
                                        <div  className={this.border(index)}  >
                                            <ul>
                                                <li><Link to={link.short_code} target="_blank">{window.location.protocol}//{window.location.hostname}/{link.short_code}</Link></li>
                                                <time>{this.displayDateRange(link.created_at)} ago</time>
                                                <li><a href={link.long_url} target="_blank">{link.long_url}</a></li>
                                                <li></li>
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
