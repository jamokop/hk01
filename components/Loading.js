import React from 'react';
import ReactLoading from 'react-loading';
class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(()=>this.forceUpdate());
    }
    
    componentWillUnMount() {
        this.unsubscribe();
    } 
    
    
    render() {
        const {store} = this.context;
        const state = store.getState();
        var classname = '';
        if (state.loading.show) {
            classname = 'show';
        } else {
            classname = 'hidden';
        }
        return (
            <div className={classname}>
                <ReactLoading className="vertical-center" type="spin" color="#444" />
            </div>
       );
    }
 }
 
 Loading.contextTypes = { store: React.PropTypes.object };
 
 export default Loading;