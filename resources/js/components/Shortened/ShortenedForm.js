import React, {Component} from 'react';


class ShortenedForm extends Component {

    handleSubmit(e) {
        e.preventDefault();
    }

    render(){
        return (
            <div className="row ">
                <div className="col">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="form-row">
                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Long URL (required)"
                                        required
                                    />
                                </div>

                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Short URL (optional)"
                                        required
                                    />
                                </div>



                                <div className="col-auto">
                                    <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="is_it_private"
                                    />
                                    <label class="form-check-label" for="is_it_private">Private?</label>
                                    </div>
                                </div>



                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary mb-2">Shorten</button>
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
