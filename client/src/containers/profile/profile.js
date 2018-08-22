import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'lib/form';
import { setAccount } from 'store/user/actions';
import { success } from 'store/notification/actions';
import { withHttpClient } from 'components/http-client-provider';
import UserAccount from 'modules/user-account';
import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';
import Section from 'components/layout/section';

import {
    METHOD_USER_ACCOUNT_SAVE_PROFILE,
    METHOD_USER_ACCOUNT_CHANGE_PASSWORD,
} from 'routes';

import {
    FIELD_OLD_PASSWORD,
    FIELD_NEW_PASSWORD,
    FIELD_CONFIRM_NEW_PASSWORD,
    FIELDS as PASSWORD_FIELDS,
    RULES as PASSWORD_RULES,
} from 'forms/change-password';

import {
    FIELD_CALORIES_TARGET,
    FIELDS as PROFILE_FIELDS,
    RULES as PROFILE_RULES,
} from 'forms/profile';

const styles = (theme) => ({
    submit: {
        marginTop: theme.spacing.unit,
        minWidth: '200px',
    },
});

class Profile extends Component {
    state = {
        profileForm: new Form(
            PROFILE_FIELDS,
            PROFILE_RULES,
            () => ({
                /* eslint-disable-next-line react/destructuring-assignment */
                [FIELD_CALORIES_TARGET]: UserAccount.getCaloriesTarget(this.props.userAccount),
            }),
            (profileForm) => this.setState({ profileForm }),
        ),
        profileSaving: false,
        profileError: null,
        passwordForm: new Form(
            PASSWORD_FIELDS,
            PASSWORD_RULES,
            null,
            (passwordForm) => this.setState({ passwordForm }),
        ),
        passwordSaving: false,
        passwordError: null,
    }

    handleChangePassword = async () => {
        const { httpClient, success } = this.props;
        const { passwordForm } = this.state;

        if (!passwordForm.isValid()) {
            return;
        }

        this.setState({
            passwordSaving: true,
            passwordError: null,
        });

        try {
            await httpClient.dispatch(
                METHOD_USER_ACCOUNT_CHANGE_PASSWORD,
                passwordForm.getData(),
            );

            success('Password changed');

            passwordForm.reset();
        } catch (error) {
            this.setState({ passwordError: error.message });
        } finally {
            this.setState({ passwordSaving: false });
        }
    }

    handleChangeProfile = async () => {
        const {
            httpClient,
            userAccount,
            setAccount,
            success,
        } = this.props;

        const { profileForm } = this.state;

        if (!profileForm.isValid()) {
            return;
        }

        this.setState({
            profileSaving: true,
            profileError: null,
        });

        try {
            const account = await httpClient.dispatch(
                METHOD_USER_ACCOUNT_SAVE_PROFILE,
                UserAccount.getId(userAccount),
                profileForm.getData(),
            );

            success('Profile updated');

            setAccount(account);

            profileForm.reset();
        } catch (error) {
            this.setState({ profileError: error.message });
        } finally {
            this.setState({ profileSaving: false });
        }
    }

    render() {
        const {
            passwordForm,
            profileForm,
            profileError,
            profileSaving,
            passwordError,
            passwordSaving,
            validationErrors,
        } = this.state;

        const { classes, userAccount } = this.props;

        console.log(validationErrors);

        return (
            <Layout
                title="Profile"
                userAccount={userAccount}
            >
                <Section>
                    <Typography variant="title">
                        Your Eating Habits
                    </Typography>
                    <form onSubmit={(event) => { event.preventDefault(); this.handleChangeProfile(); }}>
                        { profileForm.renderField(
                            FIELD_CALORIES_TARGET,
                            true,
                            { fullWidth: true },
                            { disabled: profileSaving },
                        )}
                        { profileError ? <div className={classes.requestError}>{ profileError }</div> : null }
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            { profileSaving ? 'Saving...' : 'Save' }
                        </Button>
                    </form>
                </Section>

                <Section>
                    <Typography variant="title">
                        Change your password
                    </Typography>
                    <form onSubmit={(event) => { event.preventDefault(); this.handleChangePassword(); }}>
                        { passwordForm.renderField(
                            FIELD_OLD_PASSWORD,
                            true,
                            { fullWidth: true },
                            { type: 'password', disabled: passwordSaving },
                        )}
                        { passwordForm.renderField(
                            FIELD_NEW_PASSWORD,
                            true,
                            { fullWidth: true },
                            { type: 'password', disabled: passwordSaving },
                        )}
                        { passwordForm.renderField(
                            FIELD_CONFIRM_NEW_PASSWORD,
                            true,
                            { fullWidth: true },
                            { type: 'password', disabled: passwordSaving },
                        )}
                        { passwordError ? <div className={classes.error}>{ passwordError }</div> : null }
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={passwordSaving || !passwordForm.isValid()}
                        >
                            { passwordSaving ? 'Saving...' : 'Save' }
                        </Button>
                    </form>
                </Section>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

const mapDispatchToProps = (dispatch) => ({
    setAccount: (account) => dispatch(setAccount(account)),
    success: (message) => dispatch(success(message)),
});

export default withHttpClient(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)));
