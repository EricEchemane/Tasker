import React, {useState} from 'react'
import { Button, Popover, Grid, Box, IconButton, Tooltip} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';


function SingleNote(props: any)
{
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return(
        <Grid 
            item
            xs={12} sm={6} md={4} lg={3}
            >
                <Box m={1} className="rounded-1 soft-shadow">

                    <Box p={1} display="flex" alignItems="center"> 

                        <Box ml={2} flex={1} component="h4">{props.title}</Box>

                        <Tooltip title="options" placement="left">
                            <IconButton
                                aria-label="options"
                                aria-describedby={id}
                                onClick={handleClick}
                                >
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
                            }}>
                                
                                <Box>
                                    <Box p={1} display="flex" flexDirection="column">
                                        <Button
                                            size="medium"
                                            style={{ justifyContent: "flex-start" }}
                                            fullWidth>
                                                Pin on top
                                        </Button>
                                        <Button
                                            size="medium"
                                            style={{ justifyContent: "flex-start" }}
                                            fullWidth>
                                                Edit
                                        </Button>
                                        <Button
                                            color="secondary"
                                            size="medium"
                                            style={{ justifyContent: "flex-start" }}
                                            fullWidth>
                                                Delete
                                        </Button>
                                    </Box>
                                </Box>

                        </Popover>

                    </Box>
                    
                    <Box m={1} p={2} style={{position: 'relative', top: "-25px"}} >
                        {props.value}
                    </Box>
                </Box>
        </Grid>
    )
}
export default SingleNote;