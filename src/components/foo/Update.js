import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from './Form';
import { retrieve, update } from '../../actions/foo/update';
import { del } from '../../actions/foo/delete';

class Update extends Component {
  static propTypes = {
    retrieveError: React.PropTypes.bool.isRequired,
    retrieveLoading: React.PropTypes.bool.isRequired,
    updateError: React.PropTypes.bool.isRequired,
    updateLoading: React.PropTypes.bool.isRequired,
    deleteError: React.PropTypes.bool.isRequired,
    deleteLoading: React.PropTypes.bool.isRequired,
    deleted: React.PropTypes.object,
    item: React.PropTypes.object.isRequired,
    retrieve: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    del: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  del = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      this.props.del(this.props.item);
    }
  };

  render() {
    if (this.props.deleted) {
      return <Redirect to={{pathname: '..', state: {deleted: this.props.deleted}}}/>;
    }

    return <div>
      <h1>Edit {this.props.item['@id']} </h1>

      {this.props.location.state && this.props.location.state.created && <div className="alert alert-success">{this.props.location.state.created['@id']} created.</div>}
      {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading) && <div className="alert alert-info">Loading...</div>}
      {(this.props.retrieveError || this.props.updateError || this.props.deleteError) && <div className="alert alert-danger">An error occurred.</div>}

      <Form onSubmit={values => this.props.update(this.props.item, values)} initialValues={this.props.item}/>
      <Link to=".." className="btn btn-default">Back to list</Link>
      <button onClick={this.del} className="btn btn-danger">Delete</button>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    retrieveError: state.foo.update.retrieveError,
    retrieveLoading: state.foo.update.retrieveLoading,
    updateError: state.foo.update.updateError,
    updateLoading: state.foo.update.updateLoading,
    deleteError: state.foo.del.error,
    deleteLoading: state.foo.del.loading,
    deleted: state.foo.del.deleted,
    item: state.foo.update.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    update: (item, values) => dispatch(update(item, values)),
    del: item => dispatch(del(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
