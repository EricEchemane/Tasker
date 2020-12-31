import React, {useState} from 'react'
import {Box, Grid, TextField, Button, Fab, Tooltip} from '@material-ui/core'
import {Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle } from '@material-ui/core'
import SingleNote from './Single_note'
import AddIcon from '@material-ui/icons/Add';

function Note()
{
    const [add_note_value, set_add_note_value] = useState("asds")
    const [label, set_label] = useState("Add note here")
    const [note_error, set_note_error] = useState(false)
    const [button_disabled, set_button_disabled] = useState(true)

    const [title_value, set_title_value] = useState("")
    const [content_value, set_content_value] = useState("")

    const [open, setOpen] = React.useState(false);

    const [notes, set_notes] = useState([] as any)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => { 
        set_title_value('')
        set_content_value('')
        setOpen(false);
    };

    function add_note()
    {   
        const temp_notes = [...notes,{'title': title_value, 'value': content_value, 'pinned': false }]
        set_notes(temp_notes)
        set_title_value('')
        set_content_value('')
        setOpen(false);
    }

    // ============ event listeners ====================================

    // add note input
    function handle_add_note_change(event: any)
    {   
        const value = event.target.value;
        set_add_note_value(value)

        if(value.trim().length <= 3) 
        {
            set_button_disabled(true)
        }
        else{
            set_button_disabled(false)
        }
    }

    function handle_add_title(event: any)
    {   
        const value = event.target.value
        set_title_value(value)
    }

    function handle_add_content(event: any)
    {   
        const value = event.target.value
        set_content_value(value)
    }

    // add note button
    // ============ event listeners ====================================

    let render; 
    if(notes.length === 0) render = <Box className="centered">What's in your mind?</Box>
    else
        render = notes.map((note: any)=><SingleNote value={note.value} title={note.title} />)

    return(
        <Grid
            container
            xs={12}
            style={{paddingTop: '1rem', marginTop: '10px', overflowY: 'scroll'}}
            >
                <Tooltip title="Add note">
                    <Fab 
                        onClick={handleClickOpen}
                        color="primary" aria-label="add" 
                        style={{position: 'absolute', bottom: '2rem', right: '2rem'}}>
                        <AddIcon/>
                    </Fab>
                </Tooltip>
                
                {render}

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Add note</DialogTitle>
                    <DialogContent >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="email"
                            fullWidth
                            value={title_value}
                            onChange={handle_add_title}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Content"
                            type="email"
                            fullWidth
                            value={content_value}
                            onChange={handle_add_content}
                            multiline
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={add_note} color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
        </Grid>
    )
}

export default Note;