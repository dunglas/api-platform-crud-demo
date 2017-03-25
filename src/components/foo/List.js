import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { list } from '../../actions/foo/list';

class List extends Component {
  static propTypes = {
    error: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    list: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.list();
  }

  render() {
    return <div>
      <h1>Foos</h1>

      {this.props.loading && <div className="alert alert-info">Loading...</div>}
      {this.props.location.state && this.props.location.state.deleted && <div className="alert alert-success">{this.props.location.state.deleted['@id']} deleted.</div>}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    list: () => dispatch(list())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
