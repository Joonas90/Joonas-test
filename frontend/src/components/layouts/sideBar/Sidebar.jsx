import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import Work from '@mui/icons-material/Work';

import './SideBar.scss';

export default function SideBar() {

    const navigate = useNavigate();

    return (
        <div className='sideBar'>


            <List className='nav-menu'>

                <div className='line-div'>
                    <div className='liner'></div>
                </div>

                {/*All Tasks */}
                <ListItem button onClick={() => navigate('/dashboard/allTasks')}>
                    <ListItemIcon>
                        <TaskIcon />
                    </ListItemIcon>
                    <ListItemText primary='All Tasks' />
                </ListItem>

                {/*Tasker Panel */}
                <ListItem button onClick={() => navigate('/dashboard/taskerPanel')}>
                    <ListItemIcon>
                        <Work />
                    </ListItemIcon>
                    <ListItemText primary='Create a Task' />
                </ListItem>

                <div className='line-div'>
                    <div className='liner'></div>
                </div>

            </List>


        </div>
    );
}
