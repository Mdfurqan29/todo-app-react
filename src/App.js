import { BrowserRouter , Routes , Route } from "react-router-dom";
import SignIn from "./Screens/SignIn/SignIn";
import SignUp from "./Screens/SignUp/SignUp";
import AppPage from "./Screens/AppPage/AppPage";
import "./App.css"
import PageAuth from "./Screens/AuthChecking/PageAuth";
import SiginAuth from "./Screens/AuthChecking/SiginAuth";
import Error from "./Screens/Error/Error";
function App() {
  return (
  <>
<Routes>

<Route element={<PageAuth/>}>
<Route path="/Home" element={<AppPage/>}/>
</Route>

<Route element={<SiginAuth/>}>
<Route index element={<SignIn/>}/>
<Route path="/SignUp" element={<SignUp/>}/>
</Route>

<Route path="*" element={<Error/>}/>

  </Routes>
  </>
  );
}

export default App;
