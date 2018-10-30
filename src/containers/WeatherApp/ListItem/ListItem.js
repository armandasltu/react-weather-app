import React, {Component} from 'react';
import './ListItem.scss';

class ListItem extends Component {

  state = {
    isVisible: false
  };

  handleClick = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    let content = null;
    if (this.state.isVisible) {
      content = <div className="list-item__content">
        {this.props.children}
      </div>;
    }

    const iconStyle = {
      backgroundImage: 'url(' + this.props.icon + ')'
    };

    return <div className="list-item" onClick={this.handleClick}>
      <div className="list-item__header">
        {this.props.title}
        <div className="list-item__icon" style={iconStyle}></div>
      </div>
      {content}
    </div>;
  }

}

export default ListItem;