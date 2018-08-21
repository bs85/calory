import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/QueryBuilder';
import ProfileIcon from '@material-ui/icons/Accessible';

import { NavLink } from 'react-router-dom';

const Menu = (close) => (
    <div>
        <NavLink to="/" onClick={close}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </NavLink>
        <NavLink to="/history" onClick={close}>
            <ListItem button>
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="History" />
            </ListItem>
        </NavLink>
        <NavLink to="/profile" onClick={close}>
            <ListItem button>
                <ListItemIcon>
                    <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
        </NavLink>
    </div>
);

export default Menu;
