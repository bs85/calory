import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import _ from 'lodash';
import React, { Component } from 'react';
import validate from 'validate.js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from 'components/layout/credentials';
import { setAccount } from 'store/user/actions';

import {
    queryAPI,
    ROUTE_SIGN_UP,
    NetworkError,
    AuthenticationError,
} from 'lib/api';

import {
    FIELDS,
    FIELD_FIRSTNAME,
    FIELD_LASTNAME,
    FIELD_EMAIL,
    FIELD_PASSWORD,
    FIELD_CONFIRM_PASSWORD,
    RULES,
    SAMPLE_DATA,
} from 'forms/sign-up';

const styles = (theme) => ({
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
        marginTop: theme.spacing.unit,
    },
    joinNowButton: {
        marginLeft: theme.spacing.unit,
    },
});

class SignIn extends Component {
    state = {
        form: _.mapValues(
            FIELDS,
            () => '',
        ),
        touchedFields: _.mapValues(
            FIELDS,
            () => false,
        ),
        validationErrors: {},
        requestError: null,
    }

    handleSubmit = async () => {
        const { setAccount, history } = this.props;
        const { form } = this.state;

        const validationErrors = validate(form, RULES);

        if (validationErrors) {
            this.setState({ validationErrors });
            return;
        }

        try {
            const result = await queryAPI(
                ROUTE_SIGN_UP,
                form,
            );

            const account = JSON.parse(result.body);

            setAccount(account);
            history.push('/welcome');
        } catch (requestError) {
            if (requestError instanceof NetworkError) {
                this.setState({ requestError: 'Network requestError. Please try again' });
            } else if (requestError instanceof AuthenticationError) {
                this.setState({ requestError: 'Invalid credentials' });
            } else {
                this.setState({ requestError: requestError.message });
            }
        }
    }

    handleFieldChange = (fieldName, value) => {
        const { form } = this.state;

        const newForm = {
            ...form,
            [fieldName]: value,
        };

        this.setState({
            form: newForm,
            validationErrors: validate(newForm, RULES) || {},
        });
    }

    handleFieldTouched = (fieldName) => {
        const { touchedFields } = this.state;

        this.setState({
            touchedFields: {
                ...touchedFields,
                [fieldName]: true,
            },
        });
    }

    handleSampleData = () => {
        this.setState({
            form: SAMPLE_DATA,
        });
    }

    renderField = ({
        fieldName,
        required = true,
        controlProps = {},
        inputProps = {},
    }) => {
        const { form, touchedFields, validationErrors } = this.state;

        const touched = touchedFields[fieldName];
        const error = validationErrors[fieldName]
            ? validationErrors[fieldName][0]
            : null;

        return (
            <FormControl
                margin="normal"
                {...controlProps}
                required={required}
                error={Boolean(touched && error)}
            >
                <InputLabel htmlFor={`field-id-${fieldName}`}>{FIELDS[fieldName]}</InputLabel>
                <Input
                    id={fieldName}
                    value={form[fieldName]}
                    name={fieldName}
                    autoComplete={fieldName}
                    onChange={(event) => this.handleFieldChange(fieldName, event.target.value)}
                    onBlur={() => this.handleFieldTouched(fieldName)}
                    {...inputProps}
                />
                { touched && error
                    ? (
                        <FormHelperText error>
                            { error }
                        </FormHelperText>
                    ) : null }
            </FormControl>
        );
    }

    render() {
        const { classes, history } = this.props;
        const { form, requestError } = this.state;

        return (
            <Layout>
                <Avatar className={classes.avatar}>
                    <Icon />
                </Avatar>
                <form className={classes.form} onSubmit={(event) => { event.preventDefault(); this.handleSubmit(); }}>
                    { this.renderField({
                        fieldName: FIELD_FIRSTNAME,
                        inputProps: { autoFocus: true },
                    })}
                    { this.renderField({
                        fieldName: FIELD_LASTNAME,
                    })}
                    { this.renderField({
                        fieldName: FIELD_EMAIL,
                        controlProps: { fullWidth: true },
                    })}
                    { this.renderField({
                        fieldName: FIELD_PASSWORD,
                        inputProps: { type: 'password' },
                        controlProps: { fullWidth: true },
                    })}
                    { this.renderField({
                        fieldName: FIELD_CONFIRM_PASSWORD,
                        inputProps: { type: 'password' },
                        controlProps: { fullWidth: true },
                    })}
                    { requestError ? <div className={classes.requestError}>{ requestError }</div> : null }
                    <Button
                        type="button"
                        fullWidth
                        variant="raised"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.handleSampleData()}
                    >
                        Dummy Data
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="raised"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                    <Typography align="right" className={classes.joinNow}>
                        Already a member?
                        <Button
                            className={classes.joinNowButton}
                            size="small"
                            type="button"
                            color="primary"
                            onClick={() => history.push('/sign-in')}
                        >
                            Sign in
                        </Button>
                    </Typography>
                </form>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setAccount: (account) => dispatch(setAccount(account)),
});

export default withRouter(withStyles(styles)(connect(null, mapDispatchToProps)(SignIn)));