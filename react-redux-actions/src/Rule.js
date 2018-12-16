import React, { Component } from 'react';
import LikeBtnContainer from './LikeBtnContainer';

class Rule extends Component {
  state = {
    folded: false
  };

  toggleDescription = () => this.setState({ folded: !this.state.folded });

  render() {
    const { title, description, tags, likes, dislikes, id } = this.props;
    const { folded } = this.state;
    return (
      <div className="panel panel-primary">
        <div
          className="panel-heading"
          role="presentation"
          onClick={this.toggleDescription}
        >
          {title}
          <i
            className={`pull-right glyphicon ${
              folded ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
            }`}
          />
        </div>
        <div className="panel-body" hidden={folded}>
          <p>{description}</p>
        </div>
        <div className="panel-footer">
          <div className="btn-toolbar">
            {tags.map(tag => (
              <span className="badge" key={tag}>
                {tag}
              </span>
            ))}
            <div className="btn-group btn-group-xs pull-right">
              <button className="btn btn-primary" title="Update">
                <i className="glyphicon glyphicon-pencil" />
              </button>
            </div>
            <div className="btn-group btn-group-xs pull-right">
              <LikeBtnContainer value={likes} ruleId={id} />
              <LikeBtnContainer value={dislikes} down ruleId={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rule;
