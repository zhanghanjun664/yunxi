import React, {PropTypes, Component} from 'react'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    componentWillMount() {//完成：插入真实 DOM前
        window.app.router = this.props.router;
        if('/' === '' + this.props.location.pathname){
            window.app.routerRedirect('/home');
        }
        //console.log('App>>componentWillMount')
    }

    componentDidMount() {//插入完成真实 DOM
        // console.log('App>>componentDidMount')
    }

    componentWillReceiveProps(nextProps) {
        // console.log('App>>componentWillReceiveProps')
    }

    render() {
        console.log(this.props)
        return (this.props.children);
    }
}
module.exports = App;