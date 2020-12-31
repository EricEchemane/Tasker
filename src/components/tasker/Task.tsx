import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
// icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Task(props: any) {

    // for popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [completed, set_completed] = React.useState(props.completed);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // for popover

    function handle_delete() {
        props.on_delete(props.id)
        handleClose()
    }

    function handle_edit() {
        props.on_edit(props.id)
        handleClose()
    }

    function mark_completed() {
        let tasks = JSON.parse(localStorage.getItem('tasks') || "['']")
        if(completed){
            tasks[props.id] = "true "+tasks[props.id]
            props.on_setTask(tasks)
        }else{
            tasks[props.id] = tasks[props.id].substring(5,tasks[props.id].length)
            props.on_setTask(tasks)
        }
        set_completed(!completed)
        handleClose()
    }

    let mark_btn_text = !completed ? "Undo completed mark" : "Mark as completed"
    let mark_icon = !completed ? <CloseIcon /> : <DoneIcon />

    return (
        <Box p={1} component="li"
            display="flex"
            alignItems="center"
        >

            <Box flex={1} ml={2} display="flex" alignItems="center">
                <Box hidden={completed}><Chip label="Completed" variant="outlined" style={{ color: "green", marginRight: "1rem" }} /></Box>
                {props.task}
            </Box>

            <Tooltip title="options" placement="left">
                <IconButton
                    aria-label="options"
                    aria-describedby={id}
                    onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box>
                    <Box p={1} display="flex" flexDirection="column">
                        <Button
                            onClick={mark_completed}
                            size="small"
                            style={{ justifyContent: "flex-start" }}
                            fullWidth
                            startIcon={mark_icon}>

                            {mark_btn_text}
                        </Button>

                        <Button
                            onClick={handle_edit}
                            size="small"
                            style={{ justifyContent: "flex-start" }}
                            fullWidth
                            startIcon={<EditIcon />}>
                            Edit this task
                            </Button>

                        <Button
                            onClick={handle_delete}
                            size="small"
                            style={{ justifyContent: "flex-start" }}
                            fullWidth
                            color="secondary"
                            startIcon={<DeleteOutlineIcon />}>
                            Delete
                            </Button>
                    </Box>
                </Box>

            </Popover>
        </Box>
    )
}
export default Task;