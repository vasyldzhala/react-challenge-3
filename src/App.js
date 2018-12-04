import React, {Component} from 'react';
import {connect} from 'react-redux';
import DataComparison from './components/DataComparison';
import fetchRequest from './actions/fetchRequest';

import dataStructure from './data/dataStructure';
import cast from './data/cast';
import defaultOptions from './data/defaultOptions';

class App extends Component {
  constructor() {
    super();
    this.data = [];

    this.dataStructure = dataStructure;
    this.cast = cast;
    this.defaultOptions = defaultOptions;

  }

  baseUrl = 'http://www.omdbapi.com/?apikey=147c5a62';

  getUrls = (baseUrl, cast) => {
    return cast.map(item => `${baseUrl}&t=${item.Title}&y=${item.Year}`);
  };

  getRatings = resp => {
    const ratings = {};
    resp.Ratings.forEach((r, idx) => ratings[`Ratings${idx}`] = r.Value);
    return ratings;
  };

  setOptions = () => {
    const getCategoriesValue = (value) => this.dataStructure
      .slice()
      .filter(item => item.compare).map(item => item[value]);

    this.options = {
      xAxis: {
        categories: getCategoriesValue('title')
      },
      series: this.data.map(item => {
        const ratioArr = getCategoriesValue('ratio');
        return {
          name: item.Title,
          data: getCategoriesValue('name').map((cat, idx) => parseFloat(item[cat]) * ratioArr[idx])
        };
      })
    };
  };

  componentDidMount() {
    this.props.fetchRequest(this.getUrls(this.baseUrl, this.cast));
  }

  componentWillReceiveProps(nextProps) {
    this.data = nextProps.rowData.map(item => {
      return Object.assign(item, this.getRatings(item));
    });
    this.setOptions();
  }

  render() {
    console.log(this.options);
    return (
      <div>
        <DataComparison
          data={this.data}
          dataStructure={this.dataStructure}
          options={this.options}
          defaultOptions={this.defaultOptions}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rowData: state.remoteDataReducer.data
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (urlArr) => dispatch(fetchRequest(urlArr))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
