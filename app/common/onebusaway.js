
var API_URL = 'http://api.pugetsound.onebusaway.org/api/where/'
//TODO: Add real API KEY to config file
var API_KEY = '1234'

let oneBusAway = {
  _urlForQueryAndPage: function(): string {
    return API_URL + 'agencies-with-coverage.json?key=' + API_KEY
  },
  
  fetchAgencies: function() {
    if (resultsCache.data) {
      if (!LOADING) {
        this.setState({
          dataSource: this.getDataSource(resultsCache.data),
          isLoading: false
        });
      } else {
        this.setState({ isLoading: true });
      }
      return;
    }

    LOADING = true;
    resultsCache.data = null;
    this.setState({
      isLoading: true,
      isLoadingTail: false,
    });

    fetch(this._urlForQueryAndPage())
      .then((response) => response.json())
      .then((responseData) => {
        let agencies = responseData.data.references.agencies
        LOADING = false;
        resultsCache.data = agencies;

        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(agencies),
        });
      })
      .catch((error) => {
        LOADING = false;
        resultsCache.data = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .done();
  },
}

module.exports = oneBusAway;
