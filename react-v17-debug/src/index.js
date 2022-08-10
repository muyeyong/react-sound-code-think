import React from 'react';
import './index.css';
import App from './App';
import  ReactDom from "react-dom";


// 并发运行
ReactDom.unstable_createRoot(document.getElementById('root')).render(<App />)

// 同步运行
// ReactDom.render( <App />, document.getElementById('root'))




