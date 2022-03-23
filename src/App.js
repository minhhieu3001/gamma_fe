import { Route, BrowserRouter } from 'react-router-dom';
import { router } from './router';
import 'antd/dist/antd.css';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <>
      <BrowserRouter>
        {router.map((item) => (
          <Route exact path={item.path} component={item.component} />
        ))}
      </BrowserRouter>
    </>
  );
}

export default App;
