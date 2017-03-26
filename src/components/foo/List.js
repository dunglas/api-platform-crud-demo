import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { list, reset } from '../../actions/foo/list';
import { success } from '../../actions/foo/delete';

class List extends Component {
  static propTypes = {
    error: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    deletedItem: React.PropTypes.object,
    list: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.list();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return <div>
      <h1>Foos</h1>

      {this.props.loading && <div className="alert alert-info">Loading...</div>}
      {this.props.deletedItem && <div className="alert alert-success">{this.props.deletedItem['@id']} deleted.</div>}
      {this.props.error && <div className="alert alert-danger">An error occurred.</div>}

      <div className="table-responsive">
          <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Bar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.items.map(item =>
            <tr className={item['@id']} key={item['@id']}>
              <td>{item['@id']}</td>
              <td>{item['bar']}</td>
              <td><Link to={`edit/${encodeURIComponent(item['@id'])}`}><span className="glyphicon glyphicon-pencil"/></Link></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <Link to="create" className="btn btn-default">Create</Link>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.foo.list.items,
    error: state.foo.list.error,
    loading: state.foo.list.loading,
    deletedItem: state.foo.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    list: () => dispatch(list()),
    reset: () => {
      dispatch(reset());
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
