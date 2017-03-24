import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { retrieve, update } from '../../actions/foo/update';

class Update extends Component {
  static propTypes = {
    retrieveError: React.PropTypes.bool.isRequired,
    retrieveLoading: React.PropTypes.bool.isRequired,
    updateError: React.PropTypes.bool.isRequired,
    updateLoading: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object.isRequired,
    retrieve: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  render() {
    if (this.props.retrieveError) {
      return <div>An error occurred.</div>;
    }

    if (this.props.retrieveLoading || this.props.updateLoading) {
      return <div>Loading...</div>;
    }

    return <div>
      <h1>Edit {this.props.item['@id']} </h1>

      {this.props.updateError && <div className="alert alert-danger">An error occurred.</div>}
      <Form onSubmit={values => this.props.update(this.props.item, values)} initialValues={this.props.item}/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    retrieveError: state.foo.update.retrieveError,
    retrieveLoading: state.foo.update.retrieveLoading,
    updateError: state.foo.update.updateError,
    updateLoading: state.foo.update.updateLoading,
    item: state.foo.update.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    update: (item, values) => dispatch(update(item, values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
