import React from "react";
import ReactDOM from 'react-dom';
import { View, Panel, PanelHeader, PanelSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Tabletop from 'tabletop';

import { Leaderboards } from "./Leaderboards";


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  // get data from gsheets
  componentDidMount() {
    Tabletop.init({
    key: '1AqP7BUfuk1Yt_W6qByQDItnrzlHJHYP_3aJG3inKIhw',
    callback: googleData => {
        this.setState({
            data: googleData,
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
          { Object.getOwnPropertyNames(data).length > 0 ? <Leaderboards data={data} /> : <PanelSpinner />}
        </Panel>
      </View>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));