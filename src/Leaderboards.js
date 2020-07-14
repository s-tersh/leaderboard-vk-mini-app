import React from 'react';
import { Avatar, View, Panel, Tabs, TabsItem, Cell, HorizontalScroll, List, Group, Counter } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export class Leaderboards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeModal: null,
            activePanel: "results",
            viewGender: this.props.gender,
            viewPage: this.props.page,
            MData: this.props.data["M"].elements,
            WData: this.props.data["W"].elements,
            data: this.props.data[this.props.page + " "  + this.props.gender].elements,
        };

        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.sumReps = this.sumReps.bind(this);
        this.getAvatarURL = this.getAvatarURL.bind(this);
    }

    getAvatarURL(hash) {
        let item = this.props.data["Sportsmens"].elements.filter(item => item["#"] === hash.toString());
        return item[0] ? item[0]["Avatar"] : "empty";
    }

    onChangeGender(e) {
        this.setState({ 
            viewGender: e.currentTarget.dataset.gender,
            data: this.props.data[this.state.viewPage + " " + e.currentTarget.dataset.gender].elements,
        });
        this.props.onChangePage(this.state.viewPage, e.currentTarget.dataset.gender);
    }

    onChangePage(e) {
        this.setState({
            viewPage: e.currentTarget.dataset.page,
            data: this.props.data[e.currentTarget.dataset.page + " " + this.state.viewGender].elements
        });
        this.props.onChangePage(e.currentTarget.dataset.page, this.state.viewGender);
    }

    sumReps(...theArgs) {
        return theArgs.reduce((previous, current) => {
            return previous + current;
        });
    }

    render() {
        const { data, MData, WData, viewGender, viewPage } = this.state;

        return (
            <View activePanel={this.state.activePanel}>
                <Panel id="results">
                    <HorizontalScroll>
                        <Tabs>
                            <TabsItem onClick={this.onChangeGender} selected={viewGender === 'M'} data-gender="M" after={<Counter size="s">{MData.length}</Counter>}>Мужчины</TabsItem>
                            <TabsItem onClick={this.onChangeGender} selected={viewGender === 'W'} data-gender="W" after={<Counter size="s">{WData.length}</Counter>}>Женщины</TabsItem>
                        </Tabs>
                    </HorizontalScroll>
                    <HorizontalScroll>
                        <Tabs>
                            <TabsItem onClick={this.onChangePage} selected={viewPage === "Result BSS 20"} data-page="Result BSS 20">Итог</TabsItem>
                            <TabsItem onClick={this.onChangePage} selected={viewPage === "BSS 20.1"} data-page="BSS 20.1">20.1</TabsItem>
                            <TabsItem onClick={this.onChangePage} selected={viewPage === "BSS 20.2"} data-page="BSS 20.2">20.2</TabsItem>
                            <TabsItem onClick={this.onChangePage} selected={viewPage === "BSS 20.3"} data-page="BSS 20.3">20.3</TabsItem>
                        </Tabs>
                    </HorizontalScroll>
                    <Group>
                        <List>
                            {data.map((item, id) => {
                                let elem;
                                switch(viewPage) {
                                    case "Result BSS 20":
                                        elem = <div key={id} style={{display: 'flex', flexDirection: 'row', paddingLeft: '18px'}}><h4 style={{width: '24px', textAlign: 'center', color: 'darkgray'}}>{item["Место"]}</h4>
                                        <Cell data-index={item["#"]} before={<Avatar src={this.getAvatarURL(item["#"])}></Avatar>} description={item["Сумма баллов"] + " points"}>{item["Участник"]}</Cell>
                                        </div>
                                        break;
                                    case "BSS 20.1":
                                        elem = <div key={id} style={{display: 'flex', flexDirection: 'row', paddingLeft: '18px'}}><h4 style={{width: '24px', textAlign: 'center', color: 'darkgray'}}>{item["Место"]}</h4>
                                        <Cell before={<Avatar src={this.getAvatarURL(item["#"])}></Avatar>} description={item["Повторения 1"] + " reps | " + item["Повторения 2"] + " reps" }>{item["Участник"]}</Cell>
                                        </div>
                                        break;
                                    case "BSS 20.2":
                                        elem = <div key={id} style={{display: 'flex', flexDirection: 'row', paddingLeft: '18px'}}><h4 style={{width: '24px', textAlign: 'center', color: 'darkgray'}}>{item["Место"]}</h4>
                                        <Cell before={<Avatar src={this.getAvatarURL(item["#"])}></Avatar>} description={item["Вес 1"] + " kg | " + item["Вес 2"] + " kg | " + item["Вес 3"] + " kg | " + item["Вес 4"] + " kg"}>{item["Участник"]}</Cell>
                                        </div>
                                        break;
                                    case "BSS 20.3":
                                        elem = <div key={id} style={{display: 'flex', flexDirection: 'row', paddingLeft: '18px'}}><h4 style={{width: '24px', textAlign: 'center', color: 'darkgray'}}>{item["Место"]}</h4>
                                        <Cell before={<Avatar src={this.getAvatarURL(item["#"])}></Avatar>} description={item["Время"] + " / " + item["Повторения"] + " reps"}>{item["Участник"]}</Cell>
                                        </div>
                                        break;
                                    default: break;
                                }
                                return elem;
                            })}
                        </List>
                    </Group>
                </Panel>
            </View>
        );
      }
}