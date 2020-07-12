import React from 'react';
import { Avatar, View, Panel, PanelHeader, Tabs, TabsItem, Cell, HorizontalScroll } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export class Leaderboards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeModal: null,
            activePanel: "results",
            viewGender: "M",
            viewPage: "Result BSS 20",
            data: this.props.data["Result BSS 20 M"].elements,
        };

        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.sumReps = this.sumReps.bind(this);
    }
    
    onChangeGender(e) {
        this.setState({ 
            viewGender: e.currentTarget.dataset.gender,
            data: this.props.data[this.state.viewPage + " " + e.currentTarget.dataset.gender].elements,
        });
    }

    onChangePage(e) {
        this.setState({
            viewPage: e.currentTarget.dataset.page,
            data: this.props.data[e.currentTarget.dataset.page + " " + this.state.viewGender].elements
        });
    }

    sumReps(...theArgs) {
        return theArgs.reduce((previous, current) => {
            return previous + current;
        });
    }

    render() {
        const { data, viewGender, viewPage } = this.state;

        return (
            <View activePanel={this.state.activePanel}>
                <Panel id="results">
                    <HorizontalScroll>
                        <Tabs>
                            <TabsItem onClick={this.onChangeGender} selected={viewGender === 'M'} data-gender="M">Мужчины</TabsItem>
                            <TabsItem onClick={this.onChangeGender} selected={viewGender === 'W'} data-gender="W">Женщины</TabsItem>
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

                    {data.map((item, id) => {
                        let elem;
                        switch(viewPage) {
                            case "Result BSS 20":
                                elem = <Cell key={id} data-index={item["#"]} before={<Avatar><h3>{item["Место"]}</h3></Avatar>} description={item["Сумма баллов"] + " points"}>{item["Участник"]}</Cell>
                                break;
                            case "BSS 20.1":
                                elem = <Cell key={id} before={<Avatar><h3>{item["Место"]}</h3></Avatar>} description={this.sumReps(parseInt(item["Повторения 1"]), parseInt(item["Повторения 2"])) === 0 ? "0 reps" : this.sumReps(parseInt(item["Повторения 1"]), parseInt(item["Повторения 2"])) + " reps"}>{item["Участник"]}</Cell>
                                break;
                            case "BSS 20.2":
                                elem = <Cell key={id} before={<Avatar><h3>{item["Место"]}</h3></Avatar>} description={item["Суммарный вес"] + " kilos"}>{item["Участник"]}</Cell>
                                break;
                            case "BSS 20.3":
                                elem = <Cell key={id} before={<Avatar><h3>{item["Место"]}</h3></Avatar>} description={item["Время"] + " | " + item["Повторения"] + " reps"}>{item["Участник"]}</Cell>
                                break;
                            default: break;
                        }
                        return elem;
                    })}
                </Panel>
            </View>
        );
      }
}