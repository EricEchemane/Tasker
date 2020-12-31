import {useState} from 'react'
import { Grid } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import CEO from '../assets/CEO.jpg'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login(props: any){

    const [user_msg_error, set_userMsgError] = useState("")
    const [pass_msg_error, set_passMsgError] = useState("")

    const [user_error, set_user_error] = useState(false)
    const [pass_error, set_pass_error] = useState(false)

    const [username, set_username] = useState("")
    const [password, set_password] = useState("")

    const [form_border,set_form_border] = useState("primary")
    const [avatar_border,set_avatar_border] = useState("white")

    function handle_username_change(event: any){
        set_username(event.target.value)
    }

    function handle_password_change(event: any){
        set_password(event.target.value)
    }

    function handle_login_click(){
        if(username !== "swe"){
            set_userMsgError("Incorrect username")
            set_user_error(true)
            set_form_border("warning")
        }else{
            set_userMsgError("")
            set_user_error(false)

            if(password !== "echemane"){
                set_passMsgError("Incorrect password")
                set_pass_error(true)
                set_form_border("warning")
                return
            }else{
                set_passMsgError("")
                set_pass_error(false)
            }

            set_avatar_border("success")
            set_form_border("success")

            localStorage.setItem('tasker',JSON.stringify({'username': 'swe', 'password': 'echemane'}));

            setTimeout(()=>{
                props.on_submit()
            },1000)
        }
    }

    function handle_keyUp(event: any){
        if(event.keyCode === 13) handle_login_click()
    }

    return(
        <Grid 
            container xs={10} sm={4} lg={3}
            className={"rounded centered shadow border-top-" + form_border}
            direction="column"
            justify="center"
            alignItems="center"
            > <br/><br/>
            
            <Box m={2}> 
                <Avatar 
                    alt="Eric Echemane" src={CEO}
                    className={"shadow border-" + avatar_border}
                    style={{transform: "scale(1.5)"}} />
            </Box>

            <Box p={2} component="h2">
                Is that you sir?
            </Box>

            <TextField 
                error={user_error} label="Username" 
                value={username} id="standard-required" 
                required={false} type="text"
                helperText={user_msg_error} style={{width: "70%"}}
                onChange={handle_username_change}
                onKeyUp={handle_keyUp}
            />
            <br/>

            <TextField
                error={pass_error} label="Password" 
                value={password} id="standard-password-input" 
                required={false} type="password"
                helperText={pass_msg_error} style={{width: "70%"}}
                onChange={handle_password_change}
                onKeyUp={handle_keyUp}
            />
            <br/><br/>

            <Button 
                variant="contained" color="primary"
                onClick={handle_login_click}
            >
                   Log in
            </Button>
            <br/><br/>
        </Grid>
    )
}

export default Login;