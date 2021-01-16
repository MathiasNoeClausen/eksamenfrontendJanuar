import React, { useState,useEffect } from "react"
import facade from "./apiFacade";
import bookFacade from "./bookFacade";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './final.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory
  
} from "react-router-dom";

 
const Content = () => {
  return(
      <div>
      <div className="content">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-book">
          <AddBook />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/find-Book">
        <FindBook />
        </Route>
        <Route path="/delete-book">
          <DeleteBook />
        
        </Route>
          <Route>
            <NoMatch/>
          </Route>
      </Switch>
      </div>
    </div>
  )
}

const Header = ({loggedIn}) => {
  return(
      <>
       <ul className="header">
        <li>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>

        </li>
        {loggedIn  && (
          <React.Fragment>
        <li>
          <NavLink activeClassName="active" to="/books">Books</NavLink>
        </li>
        <li>
        <NavLink  activeClassName="active" to="/add-book">Add book</NavLink>

        </li>
        <li>
          <NavLink activeClassName="active" to="/find-book">Find book</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/delete-book">Delete book</NavLink>
        </li>
        </React.Fragment>
        )}
      </ul>

      <hr />
      </>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function AddBook() {
let addBookData = bookFacade.AddBook();
  

  return (

      <div>
      <h2>Add book</h2>
      {addBookData}
      </div>
  );
}


function Books() {
let bookData = bookFacade.GetBooks();
  
  return (
    
    <div>
      <h2>All books</h2>
      {bookData}
    </div>
  )


}

function FindBook() {
  let findBookData = bookFacade.FindBookByTitle();

  return (
    <div>
      <h2>Find book</h2>
      {findBookData}
    </div>
  )
}

function DeleteBook() {
let deleteBookData = bookFacade.DeleteBook();
  return (
    <div>
      <h2>Delete book</h2>
      {deleteBookData}
    </div>
  )

}



const NoMatch = () => {
  let location = useLocation();
  return(
    <div>
      <h3>
        No match for location  <code>{location.pathname}</code>
      </h3>
    </div>
  )
}





function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
    <div>
      <div id="formContent">
      <h2>Login</h2>
      
      <form class="fadeIn second" onChange={onChange} >
        <input placeholder="User Name" class="form-control" id="username" />
        <br></br>
        <div class="fadeIn third"><input type="password" placeholder="Password" class="form-control" id="password" /></div>
        <br></br>
        
        <br></br>

        <div id="formFooter">
        <a class="underlineHover" href="#"><div class="fadeIn fourth"><button class="btn btn-default" onClick={performLogin}>Login</button></div></a>
        </div>
      </form>

    </div></div>
  )
 
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => { facade.fetchData().then(data=> setDataFromServer(data.msg))
    .catch((error) => {
      error.fullError.then((err) => {
        setErrorMessage(err.message)
        console.log("error:" + err)
      })
    })}, [])
 
  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      {errorMessage}
    </div>
  )
 
}
 
function App(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory();

 


 
  const logout = () => {  
    facade.logout()
    setLoggedIn(false)
    history.push("/")
    history.go(0);
 } 
  const login = (user, pass) => { 
    facade.login(user, pass)
    .then(res => {
      setLoggedIn(true)
      setErrorMessage("")  
    }).catch((error) => {
      error.fullError.then((err ) => {
        setErrorMessage(err.message)
        console.log("error: " + err)

      })
    })

    
    ;} 
    if(loggedIn === false) {
  return (
    
    <div class="header">
    
    <Router>
    <Header loggedIn={loggedIn}/>
    <Content bookFacade={props.bookFacade} />
    
   
    <div class="wrapper">
      {!loggedIn ? 
      (<div><LogIn login={login} /> 
      {errorMessage}</div>) :
        (<div>
          <LoggedIn />
          <button class="btn btn-default"onClick={logout}>Logout</button>
          
          
        </div>)}
        
        </div>
        </Router>

    </div>

  )
        } else {
          return (
            <div class="header">
              <Router>
                <Header loggedIn={loggedIn} />
                <Content bookFacade={props.bookFacade} />
                <br></br>
                <button class="btn btn-default" onClick={logout}>Logout</button>
                
                
                </Router>
                </div>
                
          )
        
        }

        }

export default App;
