import { DndProvider } from "react-dnd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import { HTML5Backend } from 'react-dnd-html5-backend';
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/user/gallery" component={Gallery} />
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
