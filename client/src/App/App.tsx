import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { getToken } from "tools";
import { useSelector } from "tools/hooks";
import BaseRouter from "../routes";
import { fetchUser } from "store/auth/actionCreators";

const App: React.FC = () => {
  const token = !!getToken();
  const user = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.fetchUserError);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
      if (error) {
        history.push("/login");
      }
    }
  });

  return (
    <Router>
      <BaseRouter />
    </Router>
  );
};

export default App;
