import React,{Component} from 'react' ;
import PropTypes from 'prop-types';


import './TitleLess.less' ;

class MaskTitle extends Component{


    drawIcon =()=>{

        if(this.props.iconClass!=''){
            return(
                <div className='maskTitleIcon'>
                    <i className={this.props.iconClass}></i>
                </div>
            )
        }else{
            return(
                <div className='maskTitleIcon' >
                    <img src={this.props.iconUrl} />
                </div>
            )
        }
        
    }

    render(){

        return(

            <div className={'maskDiv '+this.props.className}>
                <div className='mask'>
                    <div className='maskTitleDiv'>
                        {
                            this.drawIcon()
                        }
                        <div className='masktitle'>
                            {this.props.titleName}
                        </div>
                    </div>
                </div>
                <div className='maskContent'>
                    {this.props.children}
                </div>
            </div>
        ) ;
    }

    static propTypes = {
        titleName: PropTypes.string.isRequired,
        iconUrl:PropTypes.string,
        iconClass:PropTypes.string,
    }

    static defaultProps = {
        iconUrl:'',
        iconClass:'',
        className:''
    } 
}

module.exports = MaskTitle ; 