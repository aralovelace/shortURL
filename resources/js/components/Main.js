import React, {Component} from 'react';
import ShortenedForm from "./Shortened/ShortenedForm";
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import ClipLoader from "react-spinners/ClipLoader";
import ShortUrlApi from "./apis/ShortUrlApi";
import {withRouter} from "react-router-dom";
import moment from "moment";
import preciseDiff from "moment-precise-range-plugin";
import FlashMessage from "react-flash-message";



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shortUrls: [],
            error_message:'',
            success_message: '',
            new_short_link: ''
        }
        this.handleAddUrl = this.handleAddUrl.bind(this);
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


    handleAddUrl(urlItem) {

        this.setState( {
            error_message: "",
            success_message: "",
            new_short_link: ""
        });


        ShortUrlApi.add(urlItem).then(response => {
            const resdata = response.data;
            const dataToPush = [resdata.data]

            if (resdata.success) {
                this.setState(prevState => ({
                    shortUrls: dataToPush.concat(prevState.shortUrls),
                    success_message: "Short URL successfully generated!",
                    new_short_link: resdata.data.short_code
                }));
                if (this.state.shortUrls.length > 10) {
                    this.state.shortUrls.splice(-1, 1);
                    this.setState({shortUrls: this.state.shortUrls});
                }

            } else {
                this.setState( { error_message: resdata.error });
            }



        }).catch(err => {
            error_message: 'System Issue. Please Contact us';
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
                   preciseDiff =  ranges[key]+" second"; preciseDiff+=(ranges[key] > 1) ? "s": "";
               }
        });
        return preciseDiff;
    }

    border(index) {
        return (index==(this.state.shortUrls.length-1)) ? "entry-content last" : "entry-content";
    }

    render() {
        return (
            <div className="content">
                <div className="container pt-5">
                    {
                        this.state.error_message?
                            <FlashMessage duration={60000} persistOnHover={true}>
                                <h5 className={"alert alert-danger"}>{this.state.error_message}.</h5>
                            </FlashMessage> : ''
                    }
                    {
                        this.state.success_message?
                            <FlashMessage duration={60000} persistOnHover={true}>
                                <h5 className={"alert alert-success"}>{this.state.success_message}.</h5>
                            </FlashMessage> : ''
                    }

                    <ShortenedForm onAdd={this.handleAddUrl}  />
                    {
                        this.state.new_short_link?
                            <div className="mb-3 mt-2 text-center p-3 bg-info text-white">
                                <h4>Your Short URL is: </h4>
                                <Link className="text-light" to={this.state.new_short_link} target="_blank">{window.location.protocol}//{window.location.hostname}/{this.state.new_short_link}</Link>
                            </div>: ''
                    }

                    <div className="sweet-loading mt-5">
                        <ClipLoader
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                    </div>
                    <div className="pb-5">
                        <h2 className="mb-1">Recent Links</h2>
                        {
                            this.state.shortUrls.length > 0 ? (
                                <div>
                                {
                                    this.state.shortUrls.map((link,index) =>
                                        <div  className={this.border(index)}  >
                                            <ul>
                                                <li key={link.short_code}><Link to={link.short_code} target="_blank">{window.location.protocol}//{window.location.hostname}/{link.short_code}</Link></li>
                                                <time>{this.displayDateRange(link.created_at)} ago</time>
                                                <li key={link.id}><a href={link.long_url} target="_blank">{link.long_url}</a></li>
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
