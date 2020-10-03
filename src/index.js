import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import * as serviceWorker from './serviceWorker';
import { MarketValues } from './MarketValues';

function renderApp() {
  import('./App').then(App => {
    ReactDOM.render(
      <React.StrictMode>
        <App.default />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
}

MarketValues.ready(renderApp);

try {
  MarketValues.getBuyValue(51000000000, 'veldspar');
  MarketValues.getBuyValue(51001000000, 'scordite');
  MarketValues.getBuyValue(51002000000, 'pyroxeres');
  MarketValues.getBuyValue(51003000000, 'plagioclase');
  MarketValues.getBuyValue(51004000000, 'omber');
  MarketValues.getBuyValue(51005000000, 'kernite');
  MarketValues.getBuyValue(51006000000, 'jaspet');
  MarketValues.getBuyValue(51007000000, 'hemorphite');
  MarketValues.getBuyValue(51008000000, 'hedbergite');
  MarketValues.getBuyValue(51009000000, 'spodumain');
  MarketValues.getBuyValue(51010000000, 'dark_ochre');
  MarketValues.getBuyValue(51011000000, 'gneiss');
  MarketValues.getBuyValue(51012000000, 'crokite');
  MarketValues.getBuyValue(51013000000, 'bistot');
  MarketValues.getBuyValue(51014000000, 'arkonor');
  MarketValues.getBuyValue(51015000000, 'mercoxit');

  MarketValues.getBuyValue(41000000000, 'tritanium');
  MarketValues.getBuyValue(41000000002, 'pyerite');
  MarketValues.getBuyValue(41000000003, 'mexallon');
  MarketValues.getBuyValue(41000000004, 'isogen');
  MarketValues.getBuyValue(41000000005, 'nocxium');
  MarketValues.getBuyValue(41000000006, 'zydrine');
  MarketValues.getBuyValue(41000000007, 'megacyte');
  MarketValues.getBuyValue(41000000008, 'morphite');
} catch (err) {
  renderApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
