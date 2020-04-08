import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ConversationStore from './state/stores/ConversationStore';
import { API_WS_ROOT } from './constants';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)