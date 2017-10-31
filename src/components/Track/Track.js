import React from 'react';
import './Track.css';

class Track extends React.Component{
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
    }
    
    renderAction(isRemoval){
        if(isRemoval){
            return '-';
        }
        else {
            return '+';
        }
    }

    addTrack(){
        
        this.props.onAdd(this.props.track);
        
    }

    render(){
        //console.log(this.props.track)
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3> {this.props.track.name} {console.log(this.props.track.name)}  </h3>
                    <p> {this.props.track.artist}  |  {this.props.track.album} </p>
                </div>
                <a className="Track-action" onAdd={this.props.onAdd} onClick={this.addTrack}> {this.renderAction(this.props.isRemoval)} </a>
          </div>
        );
    }
}

export default Track;