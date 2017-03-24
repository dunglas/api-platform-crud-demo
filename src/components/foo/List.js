import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { list } from '../../actions/foo/list';

class List extends Component {
  static propTypes = {
    error: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.listFetch();
  }

  render() {
    if (this.props.error) {
      return <div>An error occurred.</div>;
    }

    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    return <div>
      <div className="table-responsive">
          <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Bar</th>
            </tr>
          </thead>
          <tbody>
          {this.props.items.map(item =>
            <tr className={item['@id']} key={item['@id']}>
              <td>{item['@id']}</td>
              <td>{item['bar']}</td>
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
    listFetch: () => dispatch(list())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
