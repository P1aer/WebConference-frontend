import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/userSlice";


window.addEventListener('load', async () => {
/*    if (navigator.serviceWorker) {
        try {
            await navigator.serviceWorker.register('sw.js')
            console.log('Service worker registered')
        }
        catch (error) {
            console.log('Service worker wont register')
        }
    }*/
})
function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.user.data?._id )

  useEffect(() => {
      if (localStorage.getItem('token')) {
          dispatch(fetchAuthMe())
      }
  },[dispatch])
  return (
      <RouterProvider router={router(isLoggedIn)}>
        <div data-testid='app' className="App"/>
      </RouterProvider>
  );
}

export default App;
