const defaultOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Compare movies ratings'
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Data Comparison'
    }
  },
  legend: {
    reversed: true
  },
  plotOptions: {
    series: {
      stacking: 'normal'
    }
  }
};

export default defaultOptions;
