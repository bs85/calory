import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withRouter } from 'react-router-dom';

import Form from 'lib/form';
import { withHttpClient } from 'components/http-client-provider';
import Layout from 'components/layout/credentials';
import { METHOD_USER_ACCOUNT_REQUEST_PASSWORD_RESET } from 'routes';

import {
    PATH_SIGN_IN,
} from 'constants/paths';

import {
    FIELDS,
    RULES,
    FIELD_EMAIL,
} from 'forms/request-password-reset';

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

class RequestPasswordReset extends Component {
    state = {
        form: new Form(
            FIELDS,
            RULES,
            null,
            (form) => this.setState({ form }),
        ),
        done: false,
        saving: false,
        requestError: null,
    }

    handleSubmit = async () => {
        const { httpClient } = this.props;
        const { form } = this.state;

        if (!form.isValid()) {
            return;
        }

        this.setState({
            saving: true,
            requestError: null,
        });

        try {
            await httpClient.dispatch(
                METHOD_USER_ACCOUNT_REQUEST_PASSWORD_RESET,
                form.getData(),
            );

            this.setState({ done: true });
        } catch (error) {
            this.setState({ requestError: error.message });
        } finally {
            this.setState({ saving: false });
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
        const {
            form,
            requestError,
            done,
            saving,
        } = this.state;

        if (done) {
            return (
                <Layout>
                    <Paper className={classes.paper}>
                        Thank you, please check your email for a reset link
                    </Paper>
                </Layout>
            );
        }

        return (
            <Layout>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <form className={classes.form} onSubmit={(event) => { event.preventDefault(); this.handleSubmit(); }}>
                        { form.renderField(
                            FIELD_EMAIL,
                            true,
                            { fullWidth: true },
                            { disabled: saving, autoFocus: true },
                        )}
                        { requestError ? <div className={classes.error}>{ requestError }</div> : null }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Send Reset Link
                        </Button>
                        <Typography align="right" className={classes.resetPassword}>
                            <Button
                                className={classes.joinNowButton}
                                size="small"
                                type="button"
                                color="primary"
                                onClick={() => history.push(PATH_SIGN_IN)}
                            >
                                Sign in
                            </Button>
                        </Typography>
                    </form>
                </Paper>
            </Layout>
        );
    }
}

export default withHttpClient(withRouter(withStyles(styles)(RequestPasswordReset)));
