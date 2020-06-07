import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ShortenedForm extends Component {

    handleSubmit(e) {
        e.preventDefault();
    }

    render(){
        return (
            <div className="row pt-5 pb-5">
                <div className="col">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="row">
                                <div className="col-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Long URL (required)"
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Short URL (optional)"
                                        required
                                    />
                                </div>
                                <div className="col-1">
                                    <div className="form-check mt-1">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="is_it_private"
                                    />
                                    <label class="form-check-label" for="is_it_private">Private?</label>
                                    </div>
                                </div>
                                <div className="col-2 right">
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

export default ShortenedForm;
