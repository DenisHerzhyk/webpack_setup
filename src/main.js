import '@css/style.css';
import Post from './models/post'
import logo from './images/logo.svg'
import * as $ from 'jquery';

const post = new Post('Webpack Post Title', logo)

$('pre').html(post.toString());

console.log('JSON:', Post)