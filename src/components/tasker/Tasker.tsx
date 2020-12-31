import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useState } from 'react'
import Task from './Task'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

let first_time = true

function Tasker() {

    const [todo_already_exist, set_todo_already_exist] = useState(false)
    const [todo_input_label, set_todo_input_label] = useState("Add task here")
    const [add_btn_disabled, set_add_btn_disabled] = useState(true)
    const [todo_input_value, set_todo_input_value] = useState("")
    const [index_deletion, set_index_deletion] = useState(-1)

    const [edit_error, set_edit_error] = useState(false)
    const [edit_error_msg, set_edit_error_msg] = useState("Task")

    // =============== local storage for tasks =============
    let local_tasks: string[] = [""]

    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify([""]))
    }
    else local_tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    const [tasks, set_tasks] = useState(local_tasks)

    
    // =============== local storage for tasks =============

    // for dialogue
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose_no = () => {
        setOpen(false);
    };

    const handleClose_yes = () => {
        setOpen(false);

        if (tasks.length === 1) {
            tasks[0] = ""
            set_tasks(tasks)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            return
        }

        let newTasks: string[] = []

        for (let x = 0; x < tasks.length; x++) {
            if (x === index_deletion) continue
            newTasks.push(tasks[x])
        }
        localStorage.setItem("tasks", JSON.stringify(newTasks))
        set_tasks(newTasks)
        window.location.reload()
    };
    // for dialogue

    // for edit dialogue
    const [task_editor_open, set_task_editor_open] = React.useState(false);
    const [edit_index, set_edit_index] = React.useState(-1);
    const [edit_value, set_edit_value] = React.useState("");

    const handleClickOpen_task_editor = (index: number) => {
        set_edit_index(index)
        set_edit_value(tasks[index])
        set_task_editor_open(true);
    };
    const handleClose_task_editor = () => {

        for (const each of tasks) {
            if (edit_value.replace(/\s/g, '').toLowerCase() === each.replace(/\s/g, '').toLowerCase()) {
                set_edit_error(true)
                set_edit_error_msg("This task already exist.")
                return
            } else {
                set_edit_error(false)
                set_edit_error_msg("Task")
            }
        }

        let TaskCopy = tasks;
        TaskCopy[edit_index] = edit_value;
        localStorage.setItem("tasks", JSON.stringify(TaskCopy))
        set_tasks(TaskCopy)
        set_task_editor_open(false);
        set_edit_error(false)
        set_edit_error_msg("Task")
    };
    // for edit dialogue

    function handle_add_todo(event: any) {
        // set_tasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
        // update input value
        const value = event.target.value
        set_todo_input_value(value)

        // check validity of task
        if (value.trim().length <= 3) {
            set_add_btn_disabled(true)
            return
        } else set_add_btn_disabled(false)

        // check duplicate task
        for (let task of tasks) {

            if (task.replace(/\s/g, '').toLowerCase() === value.replace(/\s/g, '').toLowerCase()) {
                set_todo_already_exist(true)
                set_todo_input_label("This task is already in the list.")
                set_add_btn_disabled(true)
                break
            } else {
                set_todo_already_exist(false)
                set_todo_input_label("Add task here")
                set_add_btn_disabled(false)
            }
        }
    }

    function add_todo() {
        window.location.reload()
        let tasks_local = JSON.parse(localStorage.getItem('tasks') || "['']")

        if (tasks_local[tasks_local.length - 1].length === 0) tasks_local.pop()

        set_todo_input_value("")
        set_add_btn_disabled(true)
        
        tasks_local = [todo_input_value,...tasks_local]

        localStorage.setItem("tasks", JSON.stringify(tasks_local))
        set_tasks(tasks_local)
    }

    function handle_keyup(event: any) {
        if (event.keyCode === 13) {
            // check validity of task
            if (todo_input_value.trim().length <= 3) {
                set_add_btn_disabled(true)
                return
            } else set_add_btn_disabled(false)

            // check duplicate task
            for (const task of tasks) {
                if (task.replace(/\s/g, '').toLowerCase() === todo_input_value.replace(/\s/g, '').toLowerCase()) {
                    set_todo_already_exist(true)
                    set_todo_input_label("This task is already in the list.")
                    set_add_btn_disabled(true)
                    return
                } else {
                    set_todo_already_exist(false)
                    set_todo_input_label("Add task here")
                    set_add_btn_disabled(false)
                }
            }
            add_todo()
        }
    }

    function delete_todo(index: number) {
        set_index_deletion(index)
        handleClickOpen()
    }

    function cancel_edit() {
        set_task_editor_open(false)
        set_edit_value("")
        set_edit_error(false)
        set_edit_error_msg("Task")
    }

    function handle_edit(event: any) {
        const value = event.target.value
        set_edit_value(value)
    }

    function set_task_fromChild(obj: any){
        localStorage.setItem('tasks',JSON.stringify(obj))
        set_tasks(obj)
    }

    
    let Task_to_render: any;

    if (tasks[0].length === 0){
        // alert(0)
        Task_to_render = (<Box p={2} textAlign="center"  >You have no task.</Box>)
    }
    else {
        let local_tasks = JSON.parse(localStorage.getItem('tasks') || "['']")
        Task_to_render = local_tasks.map((task: string, index: number) => <Task task={task.startsWith("true") ? task.substring(5,task.length):task} key={index} id={index} completed={!task.startsWith("true")} on_delete={delete_todo} on_edit={handleClickOpen_task_editor} on_setTask={set_task_fromChild} />)
    }


    return (
        <Grid
            container xs={10} sm={7} md={9} lg={4}
            className="neum-shadow centered rounded-1">

            <Box display="flex" className="center-hor" p={4} width="100%">

                <TextField
                    error={todo_already_exist}
                    id="outlined-error-helper-text"
                    label={todo_input_label}
                    variant="outlined"
                    fullWidth
                    value={todo_input_value}
                    onChange={handle_add_todo}
                    onKeyUp={handle_keyup}
                />

                <Button
                    onClick={add_todo}
                    variant="contained" color="primary"
                    disabled={add_btn_disabled}
                >
                    Add
                </Button>
            </Box>

            <Box
                mb={4}
                className="shadow center-hor ul rounded-1" width="85%"
                style={{
                    listStyle: "none",
                    maxHeight: "50vh",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                }}>

                {Task_to_render}

            </Box>

            {/* For Delete Dialogue */}
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>{tasks[index_deletion]}</b>
                        <br />
                    Are you sure you want to delete this task?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_no} color="primary">
                        No
                </Button>
                    <Button onClick={handleClose_yes} color="primary" autoFocus>
                        Yes
                </Button>
                </DialogActions>
            </Dialog>

            {/* Task Editor */}
            <Dialog open={task_editor_open} onClose={handleClose_task_editor} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        error={edit_error}
                        margin="dense"
                        id="task_edited"
                        label={edit_error_msg}
                        type="text"
                        fullWidth
                        value={edit_value}
                        onChange={handle_edit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel_edit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose_task_editor} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default Tasker;