import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import RuleList from './components/RuleList';
import rules from './data.json';

const domElement = document.getElementById('root');
const reactElement = <RuleList rules={rules} />;

ReactDOM.render(reactElement, domElement);
