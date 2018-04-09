import React, { PropTypes, Component } from 'react';
import { PullToRefreshListView } from 'widget';
import Util from 'util';
import './ResultColumnLess.less';

class ResultColumn extends Component {
	constructor(props, context) {
		super(props, context)
	};
    fetchData() {
        console.log('fetchData')
    };
    renderRow(rowData=[1,2,3,4,5], sectionID, rowID) {
        return (
            <li>1</li>
        )
    };
    render() {
        let style = this.props.style || {};
        return (
            <div className="resultColumn">
				<ul>
					<PullToRefreshListView
						fetchData={this.fetchData}
						renderRow={this.renderRow}
						ref="list"
						first={false}
						useBodyScroll={false}
						style={style}
					/>
				</ul>
                {12}
			</div>
        )
    }
}
module.exports = ResultColumn;