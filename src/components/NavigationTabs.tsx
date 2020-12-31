import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {useState} from 'react'

function NavigationTabs(props: any){

    const [value, set_value] =  useState(props.activeTab)

    function handleChange(event: React.ChangeEvent<{}>, newValue: number){
        set_value(newValue)
        props.on_change_tab(newValue)
    }

    return(
        <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="shadow"
      >
        <Tab label="Tasker" />
        <Tab label="Note" />
      </Tabs>
    )
}
export default NavigationTabs;