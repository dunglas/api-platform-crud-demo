import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
  render() {
    const { handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bar">Bar</label>
          <Field name="bar" component="input" type="text" className="form-control" placeholder="bar" /*required={true}*//>
          <span className="help-block">The description...</span>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>;
  }
}

export default reduxForm({form: 'foo', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
