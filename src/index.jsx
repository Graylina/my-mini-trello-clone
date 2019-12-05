import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import store from './store';

import Header from './components/Header/Header';
import BoardsContainer from './components/BoardsContainer/BoardsContainer';
import ActiveBoard from './components/ActiveBoard/ActiveBoard';

const MainContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #333;
`;

const Main = () => {
  return (
    <Router basename="/my-mini-trello-clone">
      <MainContainer>
        <Header />
        <Switch>
          <Route exact path="/" component={BoardsContainer} />
          <Route path="/board/:boardId" component={ActiveBoard} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </MainContainer>
    </Router>
  );
};

store.subscribe(() => {
  localStorage.setItem(
    'boardsList',
    JSON.stringify(store.getState().boardsList)
  );
});

console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
