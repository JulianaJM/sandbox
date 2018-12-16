/**
 * Layout View.
 * This component will display main header and current active
 * component.
 */

import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import RuleList from './RuleListContainer';
import RuleForm from './RuleFormContainer';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="container">
            <Route exact path="/" component={RuleList} />
            <Route path="/new" component={RuleForm} />
            <Route path="/edit/:id" component={RuleForm} />
          </div>
        </div>
      </div>
    );
  }
}
