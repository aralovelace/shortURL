import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import ShortUrlApi from "../apis/ShortUrlApi";


class ShortenedForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            long_url: "",
            short_url: "",
            private: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newUrlItem = {
            long_url: this.state.long_url,
            short_code: this.state.short_url,
            private: this.state.private
        };
        this.setState({
            long_url: "",
            short_url: "",
            private: 0
        });

        this.props.onAdd(newUrlItem);
    }

    render(){
        return (
            <div className="row pb-2">
                <div className="col">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="row">
                                <div className="col-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Long URL (required)"
                                        name="long_url"
                                        required
                                        value={this.state.long_url}
                                        onChange={e =>this.setState( {long_url: e.target.value })}
                                    />
                                </div>
                                <div className="col-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="short_url"
                                        placeholder="Short URL (optional)"
                                        value={this.state.short_url}
                                        maxLength={140}
                                        onChange={e =>  this.setState(  {short_url: e.target.value })}
                                    />
                                </div>
                                <div className="col-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-2"
                                        id="is_it_private"
                                        name="private"
                                        onChange={e =>  this.setState( { private: e.target.checked })}
                                    />
                                    <label className="form-check-label" for="is_it_private">Private?</label>
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary pl-5 pr-5">Shorten</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </div>

        );
    }


}

export default withRouter(ShortenedForm);
