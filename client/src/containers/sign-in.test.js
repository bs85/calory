/* global describe, beforeEach, expect, test, jest */

import React from 'react';
import { mount } from 'enzyme';

import { PATH_SIGN_UP, PATH_REQUEST_PASSWORD_RESET } from 'constants/paths';

import { METHOD_USER_ACCOUNT_LOGIN, METHOD_USER_ACCOUNT_GET } from 'routes';

import {
    FIELD_EMAIL,
    FIELD_PASSWORD,
} from 'forms/sign-in';

import { SignIn as Component } from './sign-in';

const VALID_EMAIL = 'info@example.com';
const INVALID_EMAIL = 'bla';

const VALID_PASSWORD = '12345678';

const user = {
    id: 1,
};

// eslint-disable-next-line no-restricted-globals
const nextTick = () => new Promise((resolve) => process.nextTick(resolve));

describe('SignIn', () => {
    let props;
    let mountedComponent;

    const signIn = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <Component {...props} />,
            );
        }

        return mountedComponent;
    };

    const emailField = () => signIn().find(`input[name="${FIELD_EMAIL}"]`);
    const passwordField = () => signIn().find(`input[name="${FIELD_PASSWORD}"]`);
    const signInButton = () => signIn().find('button').findWhere((node) => node.debug() === 'Sign in').parents('button');
    const resetPasswordButton = () => signIn().find('button').findWhere((node) => node.debug() === 'Reset password').parents('button');
    const signUpButton = () => signIn().find('button').findWhere((node) => node.debug() === 'Join Now').parents('button');

    beforeEach(() => {
        const push = jest.fn();
        const dispatch = jest.fn();
        const setAccount = jest.fn();

        props = {
            classes: {},
            history: {
                push,
            },
            httpClient: {
                dispatch,
            },
            setAccount,
        };
        mountedComponent = undefined;
    });

    test('renders a sign-in form', () => {
        expect(emailField()).toHaveLength(1);
        expect(passwordField()).toHaveLength(1);
        expect(signInButton()).toHaveLength(1);
        expect(resetPasswordButton()).toHaveLength(1);
    });

    test('renders a sign-up buttom', () => {
        expect(signUpButton()).toHaveLength(1);
    });

    test('shows an error on invalid email', () => {
        emailField().instance().value = INVALID_EMAIL;
        emailField().simulate('change');
        emailField().simulate('blur');

        const errorNode = signIn().findWhere((node) => node.text() === 'Email is not a valid email');

        expect(errorNode.length).toBeGreaterThan(0);
    });

    test('submit button is initially disabled', () => {
        expect(signInButton().instance().disabled).toBe(true);
    });

    test('submit button enables when form is valid', () => {
        emailField().instance().value = VALID_EMAIL;
        emailField().simulate('change');

        passwordField().instance().value = VALID_PASSWORD;
        passwordField().simulate('change');

        expect(signInButton().instance().disabled).toBe(false);
    });

    test('sign up navigates to the proper page', () => {
        signUpButton().first().simulate('click');

        expect(signIn().props().history.push.mock.calls[0][0]).toEqual(PATH_SIGN_UP);
    });

    test('reset password navigates to the proper page', () => {
        resetPasswordButton().first().simulate('click');

        expect(signIn().props().history.push.mock.calls[0][0]).toEqual(PATH_REQUEST_PASSWORD_RESET);
    });

    test('successful sign-in sets the user account and redirects to root', async () => {
        const { dispatch } = signIn().props().httpClient;

        dispatch.mockImplementation((method) => {
            switch (method) {
                case METHOD_USER_ACCOUNT_LOGIN:
                    return { userId: user.id };

                case METHOD_USER_ACCOUNT_GET: {
                    return user;
                }

                default:
                    return undefined;
            }
        });

        signIn().state().form.set(FIELD_EMAIL, VALID_EMAIL);
        signIn().state().form.set(FIELD_PASSWORD, VALID_PASSWORD);

        signIn().find('form').first().simulate('submit', { preventDefault() {} });

        await nextTick();

        expect(signIn().props().setAccount.mock.calls[0][0]).toBe(user);
        expect(signIn().props().history.push.mock.calls[0][0]).toBe('/');
    });

    test('failed sign in display the error', async () => {
        const { dispatch } = signIn().props().httpClient;

        const errorMessage = 'Woops ERRRROR';

        dispatch.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        signIn().state().form.set(FIELD_EMAIL, VALID_EMAIL);
        signIn().state().form.set(FIELD_PASSWORD, VALID_PASSWORD);

        signIn().find('form').first().simulate('submit', { preventDefault() {} });

        await nextTick();

        expect(signIn().findWhere((node) => node.text() === errorMessage).length).toBeGreaterThan(0);
    });
});
