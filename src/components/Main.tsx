import Box from '@material-ui/core/Box'
import NavigationTabs from './NavigationTabs'
import {useState} from 'react'
import Tasker from './tasker/Tasker'
import Note from './note/Note'

function Main(){

    const [active_tab, set_active_tab] = useState(1)

    function change_tab(tab_index: number){
        set_active_tab(tab_index)
    }

    return(
        <Box>
            <NavigationTabs 
                activeTab={1} 
                on_change_tab={change_tab} 
                />
            
            <Box
                hidden={active_tab !== 0}
                style={{height: "90vh",}}
                >
                    <Tasker/>
            </Box>

            <Box
                hidden={active_tab !== 1}
                style={{height: "87vh",}}
                >
                    <Note/>
            </Box>
        </Box>
    )
}
export default Main;