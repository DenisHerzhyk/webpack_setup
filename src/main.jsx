import '@css/style.css';
import './less/style.less';
import './sass/style.sass';
import './sass/style.scss';
import "./models/lodash.js"
//
import Post from './models/post'
import logo from './images/logo.svg'
import * as $ from 'jquery';

const post = new Post('Webpack Post Title', logo)

$('pre').addClass('code').html(post.toString());

async function start() {
    return await new Promise((r) => setTimeout(() => r("Async done"), 2000))
}

start().then((res) => console.log(res));

console.log('JSON:', Post)

import React from 'react';
import * as ReactDOM from 'react-dom/client';

const App = () => (
    <div className="container">
        <h1>Webpack training</h1>
        <div className="logo"></div>
        <pre></pre>
        <div className="less-demo">
            <h2>Less</h2>
        </div>
        <div className="scss-demo">
            <h2>Scss</h2>
        </div>
        <div className="sass-demo">
            <h2>Sass</h2>
        </div>
    </div>
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);