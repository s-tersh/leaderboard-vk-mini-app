import React from "react";
import ReactDOM from 'react-dom';
import { View, Panel, PanelHeader, PullToRefresh } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';
import Tabletop from 'tabletop';
import { Leaderboards } from "./Leaderboards";

bridge.send("VKWebAppInit", {});

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {},
      fetching: true,
      viewGender: "M",
      viewPage: "Result BSS 20"
    };
    this.loadData = this.loadData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  handlePage = (page, gender) => {
    this.setState({
      viewPage: page,
      viewGender: gender
    });
  }

  onRefresh(e) {
    this.loadData();
    
    this.setState({
      fetching: true
    });
  }

  // get data from gsheets
  componentDidMount() {
    this.loadData();
  }
  
  loadData() {
    Tabletop.init({
    key: '1AqP7BUfuk1Yt_W6qByQDItnrzlHJHYP_3aJG3inKIhw',
    callback: googleData => {
        this.setState({
            data: googleData,
            fetching: false
        }) 
    },
    simpleSheet: false
    });
  }

  render() {
    const { data } = this.state;

    return (
      <View id="leaderboard" activePanel="leaderboard">
        <Panel id="leaderboard">
          <PanelHeader>
              <h3>Лидерборд</h3>
          </PanelHeader>
          <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
            { Object.getOwnPropertyNames(data).length > 0 && this.state.fetching === false ? <Leaderboards data={data} page={this.state.viewPage} gender={this.state.viewGender} onChangePage={this.handlePage} /> : null}
          </PullToRefresh>
        </Panel>
      </View>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));