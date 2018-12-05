import React, {Component} from 'react';
import {connect} from 'react-redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Table from './Table';
import toggleDisplayData from '../actions/toggleDisplayData';
import hocLoader from './hocLoader';


class DataComparison extends Component {
  constructor(props) {
    super(props);
    this.optionsToShow = {};
  }

  componentWillReceiveProps(nextProps) {
    const {dataToDisplay} = nextProps;
    this.optionsToShow = ({...nextProps.options});
    this.optionsToShow.series = this.optionsToShow.series
      .slice()
      .filter(serie => dataToDisplay.find(item => (item.name === serie.name)).show);
  };

  onClickHandler({target}) {
    if (target.type === 'checkbox') {
      this.props.toggleDisplayData({name: target.name, show: target.checked});
    }
  }

  render() {
    return (
      <div onClick={event => this.onClickHandler(event)}>
        <Table
          data={this.props.data}
          dataStructure={this.props.dataStructure}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={Object.assign(this.optionsToShow, this.props.defaultOptions)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dataToDisplay: state.remoteDataReducer.dataToDisplay
});

const mapDispatchToProps = dispatch => ({
  toggleDisplayData: toggled => dispatch(toggleDisplayData(toggled))
});

const wrappedDataComparison = hocLoader('data')(DataComparison);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedDataComparison);
