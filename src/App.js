import { Route, BrowserRouter } from 'react-router-dom';
import { router } from './router';
import 'antd/dist/antd.min.css';
import 'react-notifications-component/dist/theme.css';
import { connect } from 'react-redux';
import { Spin } from 'antd';

function App(props) {
  const { isLoading } = props;
  return (
    <>
      <BrowserRouter>
        <Spin spinning={isLoading}>
          {router.map((item) => (
            <Route exact path={item.path} component={item.component} />
          ))}
        </Spin>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {})(App);
