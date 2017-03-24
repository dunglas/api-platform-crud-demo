import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { create } from '../../actions/foo/create';

class Create extends Component {
  static propTypes = {
    error: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object,
    create: React.PropTypes.func.isRequired,
  };

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    return <div>
      <h1>Create a new Foo</h1>

      {this.props.item && <div className="alert alert-success">Item {this.props.item['@id']} created!</div>}
      {this.props.error && <div className="alert alert-danger">An error occurred.</div>}

      <Form onSubmit={this.props.create} values={this.props.item}/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.foo.create.item,
    error: state.foo.create.error,
    loading: state.foo.create.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: values => dispatch(create(values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
