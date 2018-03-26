import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './dealerPriceLess.less';
import { Tabs,  } from 'antd-mobile';

const tabs = [
    { title: 'First Tab' },
    { title: 'Second Tab' },
    { title: 'Third Tab' },
];

@inject("complateInfo")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class dealerPrice extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            labelname:'name',
        };
    }

    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }


    render() {
        return (
            <div style={{height: '100%'}}>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initalPage={'t2'}
                          renderTabBar={renderTabBar}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of first tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        );
    }
}

module.exports = dealerPrice;
