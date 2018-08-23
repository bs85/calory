import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withRouter, Link } from 'react-router-dom';
import * as qs from 'query-string';

import Form from 'lib/form';
import { withHttpClient } from 'components/http-client-provider';
import { PATH_SIGN_IN } from 'constants/paths';
import Layout from 'components/layout/credentials';
import { METHOD_USER_ACCOUNT_RESET_PASSWORD } from 'routes';

import {
    FIELDS,
    RULES,
    FIELD_PASSWORD,
    FIELD_CONFIRM_PASSWORD,
} from 'forms/reset-password';

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
        const { httpClient, location } = this.props;
        const { form } = this.state;

        if (!form.isValid()) {
            return;
        }

        const query = qs.parse(location.search);

        this.setState({
            saving: true,
            requestError: null,
        });

        try {
            await httpClient.dispatch(
                METHOD_USER_ACCOUNT_RESET_PASSWORD,
                query.access_token,
                form,
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
        const { classes, history, location } = this.props;
        const {
            form,
            requestError,
            done,
            saving,
        } = this.state;

        const query = qs.parse(location.search);

        if (!query.access_token) {
            return (
                <Layout>
                    <Paper className={classes.paper}>
                        Something went wrong. Please contact us.
                    </Paper>
                </Layout>
            );
        }

        if (done) {
            return (
                <Layout>
                    <Paper className={classes.paper}>
                        Thank you, please <Link to={PATH_SIGN_IN}>sign in</Link>
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
                            FIELD_PASSWORD,
                            true,
                            { fullWidth: true },
                            { disabled: saving, autoFocus: true, type: 'password' },
                        )}
                        { form.renderField(
                            FIELD_CONFIRM_PASSWORD,
                            true,
                            { fullWidth: true },
                            { disabled: saving, type: 'password' },
                        )}
                        { requestError ? <div className={classes.error}>{ requestError }</div> : null }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Reset password
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

export default withHttpClient(withRouter(withStyles(styles)(SignIn)));
