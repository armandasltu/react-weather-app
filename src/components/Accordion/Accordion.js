import React, {Component} from 'react';
import './Accordion.scss';

class Accordion extends Component {
  state = {
    isVisible: false
  };

  handleClick = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    let content = null;
    if (this.state.isVisible) {
      content = <div className="accordion_item__content">
        {this.props.children.length > 0 ? this.props.children : 'No results.'}
      </div>;
    }
    return <div className={this.state.isVisible ? 'accordion active' : 'accordion'}>
      <div className="accordion_item">
        <div className="accordion_item__header" onClick={this.handleClick}>
          {this.props.title}
        </div>
        {content}
      </div>
    </div>;
  }
}

export default Accordion;