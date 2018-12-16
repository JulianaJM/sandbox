/**
 * Display a single rule.
 * Rule to display is set with the key `rule` on
 * the component props.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import LikeBtn from './LikeBtnContainer';
import './Rule.css';

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: !props.rule.description,
    };
    this.toggleFolded = this.toggleFolded.bind(this);
  }

  // Update folded state.
  // - If folded is currently `true`, turn it to `false`.
  // - If folded is currently `false`, turn it to `true`.
  toggleFolded() {
    this.setState({
      folded: !this.state.folded,
    });
  }

  render() {
    const rule = this.props.rule;
    const tags = rule.tags.map(tag => <span key={tag} className="badge">{tag}</span>);
    const folded = this.state.folded;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading" role="presentation" onClick={this.toggleFolded}>
          {rule.title}<i className={classNames('pull-right', 'glyphicon', { 'glyphicon-chevron-down': !folded, 'glyphicon-chevron-up': folded })} />
        </div>
        <div className={classNames('panel-body', { hidden: folded })}><p>{rule.description}</p></div>
        <div className="panel-footer">
          <div className="btn-toolbar">
            {tags}
            <div className="btn-group btn-group-xs pull-right">
              <Link className="btn btn-primary" to={`/edit/${rule.id}`} title="Update">
                <i className="glyphicon glyphicon-pencil" />
              </Link>
            </div>
            <div className="btn-group btn-group-xs pull-right">
              <LikeBtn type="up" rule={rule} />
              <LikeBtn type="down" rule={rule} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Rule.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Rule;
