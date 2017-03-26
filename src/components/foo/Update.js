import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from './Form';
import { success } from '../../actions/foo/create';
import { retrieve, update, reset } from '../../actions/foo/update';
import { del, loading, error } from '../../actions/foo/delete';

class Update extends Component {
  static propTypes = {
    retrieveError: React.PropTypes.bool.isRequired,
    retrieveLoading: React.PropTypes.bool.isRequired,
    updateError: React.PropTypes.bool.isRequired,
    updateLoading: React.PropTypes.bool.isRequired,
    deleteError: React.PropTypes.bool.isRequired,
    deleteLoading: React.PropTypes.bool.isRequired,
    retrieved: React.PropTypes.object,
    updated: React.PropTypes.object,
    deleted: React.PropTypes.object,
    retrieve: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    del: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  del = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      this.props.del(this.props.item);
    }
  };

  render() {
    if (this.props.deleted) {
      return <Redirect to=".."/>;
    }

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    return <div>
      <h1>Edit {item && item['@id']}</h1>

      {this.props.created && <div className="alert alert-success">{this.props.created['@id']} created.</div>}
      {this.props.updated && <div className="alert alert-success">{this.props.updated['@id']} updated.</div>}
      {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading) && <div className="alert alert-info">Loading...</div>}
      {(this.props.retrieveError || this.props.updateError || this.props.deleteError) && <div className="alert alert-danger">An error occurred.</div>}

      {item && <Form onSubmit={values => this.props.update(item, values)} initialValues={item}/>}
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
    created: state.foo.create.created,
    deleted: state.foo.del.deleted,
    retrieved: state.foo.update.retrieved,
    updated: state.foo.update.updated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    update: (item, values) => dispatch(update(item, values)),
    del: item => dispatch(del(item)),
    reset: () => {
      dispatch(reset());
      dispatch(error(false));
      dispatch(loading(false));
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
