import React from 'react'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from  './pages/login'
import Admin from './admin'
import Common from './common'
import Home from './pages/Home'
import Button from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/spin'
import Notifications from './pages/ui/notification'
import Messages from './pages/ui/message'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Rich from './pages/rich/index'
import NotMatch from './pages/nomatch/index'
import OrderDetail from './pages/order/detail'
import Bar from './pages/echarts/bar'
import PermissionUser from './pages/permission/index'

export default class NoMatch extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/common" render={() =>
              <Common>
                <Switch>
                  <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                </Switch>
              </Common>
            }/>
            {/*箭头函数没有加大括号，自身就会返回return，入托加了的话，就得手动添加return*/}
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/ui/buttons" component={Button}/>
                  <Route path="/ui/modals" component={Modals}/>
                  <Route path="/ui/loadings" component={Loadings}/>
                  <Route path="/ui/notification" component={Notifications}/>
                  <Route path="/ui/messages" component={Messages}/>
                  <Route path="/ui/tabs" component={Tab}/>
                  <Route path="/ui/gallery" component={Gallery}/>
                  <Route path="/ui/carousel" component={Carousel}/>
                  <Route path="/form/login" component={FormLogin}/>
                  <Route path="/form/reg" component={FormRegister}/>
                  <Route path="/table/basic" component={BasicTable}/>
                  <Route path="/table/high" component={HighTable}/>
                  <Route path="/city" component={City}/>
                  <Route path="/order" component={Order}/>
                  <Route path="/rich" component={Rich}/>
                  <Route path="/charts/bar" component={Bar}/>
                  <Route path="/permission" component={PermissionUser}/>
                  <Redirect to="/home"/>
                  <Route component={NotMatch}></Route>
                </Switch>
              </Admin>
            }/>
          </Switch>
        </App>
      </Router>
    );
  }
}