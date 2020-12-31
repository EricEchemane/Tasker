import {useState} from 'react';
import Login from './components/Login'
import Main from './components/Main'

function App(props: any)
{
    const [isLogin, set_isLogin] = useState(false)

    function handle_login(){
        set_isLogin(true)
    }

    if(localStorage.getItem('tasker') !== null)
        return <Main/>
    else return <Login on_submit={handle_login} />
    // return <Main />
}
export default App;