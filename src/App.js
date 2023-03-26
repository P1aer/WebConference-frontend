import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.user.data )

  useEffect(() => {
    dispatch(fetchAuthMe())
  },[dispatch])
  return (
      <RouterProvider router={router(isLoggedIn)}>
        <div className="App"/>
      </RouterProvider>
  );
}

export default App;
