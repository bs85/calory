import mapValues from 'lodash.mapvalues';
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withHttpClient } from 'components/http-client-provider';
import Layout from 'components/layout/credentials';
import { setAccount } from 'store/user/actions';
import { METHOD_USER_ACCOUNT_LOGIN, METHOD_USER_ACCOUNT_GET } from 'routes';

import {
    NetworkError,
    AuthenticationError,
} from 'lib/http-client';

import {
    PATH_RESET_PASSWORD,
    PATH_SIGN_UP,
} from 'constants/paths';

import {
    FIELDS,
    FIELD_EMAIL,
    FIELD_PASSWORD,
} from 'forms/sign-in';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    joinNow: {
        marginBottom: theme.spacing.unit,
    },
    resetPassword: {
        marginTop: theme.spacing.unit,
    },
});

class SignIn extends Component {
    state = {
        form: mapValues(
            FIELDS,
            () => '',
        ),
        requestError: null,
    }

    handleSubmit = async () => {
        const { setAccount, history, httpClient } = this.props;
        const { form } = this.state;

        try {
            const { userId } = await httpClient.dispatch(
                METHOD_USER_ACCOUNT_LOGIN,
                form,
            );

            const account = await httpClient.dispatch(
                METHOD_USER_ACCOUNT_GET,
                userId,
            );

            setAccount(account);
            history.push('/');
        } catch (error) {
            if (error instanceof NetworkError) {
                this.setState({ requestError: 'Network error. Please try again' });
            } else if (error instanceof AuthenticationError) {
                this.setState({ requestError: 'Invalid credentials' });
            } else {
                this.setState({ requestError: error.message });
            }
        }
    }

    handleFieldChange = (fieldName, value) => {
        const { form } = this.state;

        this.setState({
            form: {
                ...form,
                [fieldName]: value,
            },
        });
    }

    render() {
        const { classes, history } = this.props;
        const { form, requestError } = this.state;

        return (
            <Layout>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <form className={classes.form} onSubmit={(event) => { event.preventDefault(); this.handleSubmit(); }}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={FIELD_EMAIL}>{FIELDS[FIELD_EMAIL]}</InputLabel>
                            <Input
                                id={FIELD_EMAIL}
                                value={form[FIELD_EMAIL]}
                                name={FIELD_EMAIL}
                                autoComplete={FIELD_EMAIL}
                                autoFocus
                                onChange={(event) => this.handleFieldChange(FIELD_EMAIL, event.target.value)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={FIELD_PASSWORD}>{FIELDS[FIELD_PASSWORD]}</InputLabel>
                            <Input
                                name={FIELD_PASSWORD}
                                value={form[FIELD_PASSWORD]}
                                type={FIELD_PASSWORD}
                                id={FIELD_PASSWORD}
                                autoComplete={FIELD_PASSWORD}
                                onChange={(event) => this.handleFieldChange(FIELD_PASSWORD, event.target.value)}
                            />
                        </FormControl>
                        { requestError ? <div className={classes.error}>{ requestError }</div> : null }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                        <Typography align="right" className={classes.resetPassword}>
                            <Button
                                className={classes.joinNowButton}
                                size="small"
                                type="button"
                                color="primary"
                                onClick={() => history.push(PATH_RESET_PASSWORD)}
                            >
                                Reset password
                            </Button>
                        </Typography>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <Typography className={classes.joinNow} variant="subheading" align="center">
                        Not a member yet?
                    </Typography>
                    <Button
                        className={classes.joinNowButton}
                        fullWidth
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push(PATH_SIGN_UP)}
                    >
                        Join Now
                    </Button>
                </Paper>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setAccount: (account) => dispatch(setAccount(account)),
});

export default withHttpClient(withRouter(withStyles(styles)(connect(null, mapDispatchToProps)(SignIn))));
