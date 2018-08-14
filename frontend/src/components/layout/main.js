import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PATH_SIGN_IN } from 'constants/paths';
import MenuItems from 'components/menu';
import { logout } from 'store/user/actions';
import User from 'modules/user-account';

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    drawerPaperCloseMobile: {
        width: 0,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

class MainLayout extends Component {
    state = {
        mainMenuOpen: false,
        userMenuAnchor: null,
    }

    handleToggleMainMenu = (nextState) => {
        const { mainMenuOpen } = this.state;

        this.setState({
            mainMenuOpen: typeof nextState === 'undefined'
                ? !mainMenuOpen
                : nextState,
        });
    }

    handleToggleUserMenu = (userMenuAnchor) => this.setState({ userMenuAnchor })

    handleLogout = () => {
        const { logout, history } = this.props;
        history.push(PATH_SIGN_IN);
    }

    render() {
        const { width, classes, title, userAccount, children, router } = this.props;
        const { mainMenuOpen, userMenuAnchor } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <Menu
                    open={Boolean(userMenuAnchor)}
                    anchorEl={userMenuAnchor}
                    onClose={() => this.handleToggleUserMenu(null)}
                >
                    <MenuList>
                        <div>
                            { User.getFullName(userAccount) }
                        </div>
                        <MenuItem onClick={() => this.handleLogout()}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
                <div
                    className={classes.root}
                >
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, mainMenuOpen && classes.appBarShift)}
                    >
                        <Toolbar
                            disableGutters={!mainMenuOpen}
                            className={classes.toolbar}
                        >
                            <IconButton
                                color="inherit"
                                onClick={() => this.handleToggleMainMenu(true)}
                                className={classNames(
                                    classes.menuButton,
                                    mainMenuOpen && classes.menuButtonHidden
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.title}>
                                { title }
                            </Typography>
                            <Button color="inherit">
                                <Avatar onClick={(event) => this.handleToggleUserMenu(event.currentTarget)}>
                                    { User.getDisplayName(userAccount).substring(0, 1) }
                                </Avatar>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(
                                classes.drawerPaper,
                                !mainMenuOpen && classes.drawerPaperClose,
                                !mainMenuOpen && !isWidthUp('md', width) && classes.drawerPaperCloseMobile
                            ),
                        }}
                        open={mainMenuOpen}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={() => this.handleToggleMainMenu(false)}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            { MenuItems }
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <div className={classes.mainWrapper}>
                            { children }
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default withRouter(
    withWidth()(
        withStyles(styles)(
            connect(null, mapDispatchToProps)(MainLayout),
        ),
    ),
);
