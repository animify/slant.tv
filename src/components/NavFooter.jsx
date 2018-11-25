import React from 'react';
import BaseComponent from './common/BaseComponent';

class NavFooter extends BaseComponent {
  render() {
    return (
<footer>
<div className="contain">
<ul>
<li><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/cindr.io/">Support</a></li>
<li><a rel="noopener noreferrer" target="_blank" href="https://github.com/Aotik/slant.tv/issues">Issues</a></li>
<li><a rel="noopener noreferrer" target="_blank" href="https://github.com/Aotik/slant.tv">Open-source</a></li>
<li className="by">Developed by <a rel="noopener noreferrer" target="_blank" href="https://cindr.io">cindr.io</a></li>
</ul>
</div>
</footer>
);
  }
}

export default NavFooter;
