import React from 'react';
import '../../scss/components/Card.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Card';
    }
    render() {
        return <div className='Card'
                    draggable='true'
                    onDrag={e => this.onDrag(e)}
                    onDragStart={e => this.onDragStart(e)}
                    ref = {ref => this.cardRef = ref} >
                    {this.props.text}
                </div>;
    }
    onDrag(e){
        console.log(e.pageX, e.pageY);
        this.cardRef.style.top = e.pageX;
        this.cardRef.style.left =  e.pageY;
    }
    onDragStart(e){
        console.log('start',e)
        this.cardRefClone = this.cardRef.cloneNode(true);
        this.cardRefClone.id = 'dragged-card';
        var viewportOffset = this.getOffsetRect(this.cardRef);//.getBoundingClientRect();

        if(this.cardRef.nextSibling) {
            this.cardRef.parentNode.insertBefore(this.cardRefClone, this.cardRef.nextSibling);
        } else {
            this.cardRef.parentNode.appendChild(this.cardRefClone);
        }

        this.cardRef.className = this.cardRef.className + ' being-dragged';
        this.cardRef.style.top = viewportOffset.top;
        this.cardRef.style.left = viewportOffset.left;
        this.cardRef.style.width = viewportOffset.width;
    }
    getOffsetRect(elem) {
    // (1)
        var box = elem.getBoundingClientRect()

        var body = document.body
        var docElem = document.documentElement

        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0
        var clientLeft = docElem.clientLeft || body.clientLeft || 0

        // (4)
        var top  = box.top +  scrollTop - clientTop
        var left = box.left + scrollLeft - clientLeft

        return { top: `${Math.round(top)}px`, left: `${Math.round(left)}px`, width:`${box.right - box.left}px`, height:`${box.bottom - box.top}px`  }
    }

}

export default Card;
