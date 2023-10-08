import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Button from './components/Button';

const App = () => {
  return (
    <div className="flex flex-col">
      Hello, React with Tailwind CSS!
      <Button>Hello</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
