import React, { Component } from 'react';

export default prop => ChildComponent => {
  return class hocLoader extends Component {

    isPropsEmpty = () => {
      return this.props[prop].length;
    };

    loaderComponent = () => {
      if (!this.isPropsEmpty()) return <div className="loader">LOADING...</div>
    };

    render() {
      return (
        <div>
          <ChildComponent {...this.props}/>
          {this.loaderComponent()}
        </div>
      )
    }
  }
}
