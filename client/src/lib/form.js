import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import mapValues from 'lodash.mapvalues';
import validate from 'validate.js';
import React from 'react';

export default class Form {
    constructor(fields, rules, getInitialData = null, onChange) {
        this.getInitialData = getInitialData;
        this.fields = fields;
        this.rules = rules;
        this.onChange = onChange;

        this.reset();
        this.touchedFields = {};
    }

    handleChange = (field, value) => {
        this.data = {
            ...this.data,
            [field]: value,
        };

        this.dispatchChanges();
    }

    handleBlur = (field) => {
        this.touchedFields[field] = true;

        this.dispatchChanges();
    }

    handleKeyDown = (field, keyCode) => {
        if (keyCode === 13) {
            this.touchedFields[field] = true;
            this.dispatchChanges();
        }
    }

    renderField = (
        fieldName,
        required = true,
        controlProps = {},
        inputProps = {},
        CustomInputComponent = null,
    ) => {
        const {
            data,
            touchedFields,
            fields,
            handleChange,
            handleBlur,
            handleKeyDown,
        } = this;

        /* eslint-disable-next-line react/no-this-in-sfc */
        const validationErrors = this.getValidationErrors();

        const touched = touchedFields[fieldName];
        const error = validationErrors[fieldName]
            ? validationErrors[fieldName][0]
            : null;

        if (CustomInputComponent) {
            return (
                <FormControl
                    margin="normal"
                    {...controlProps}
                    required={required}
                    error={Boolean(touched && error)}
                >
                    <CustomInputComponent
                        value={data[fieldName] || ''}
                        name={fieldName}
                        label={fields[fieldName]}
                        onChange={(value) => handleChange(fieldName, value)}
                        {...inputProps}
                    />
                </FormControl>
            );
        }

        return (
            <FormControl
                margin="normal"
                {...controlProps}
                required={required}
                error={Boolean(touched && error)}
            >
                <InputLabel htmlFor={`field-id-${fieldName}`}>{fields[fieldName]}</InputLabel>
                <Input
                    id={fieldName}
                    value={data[fieldName] || ''}
                    name={fieldName}
                    autoComplete={fieldName}
                    onChange={(event) => handleChange(fieldName, event.target.value)}
                    onBlur={() => handleBlur(fieldName)}
                    onKeyDown={(event) => handleKeyDown(fieldName, event.keyCode)}
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

    dispatchChanges() {
        if (this.onChange) {
            window.setTimeout(() => this.onChange(this));
        }
    }

    reset() {
        this.data = this.getInitialData
            ? { ...this.getInitialData() }
            : mapValues(this.fields, () => null);

        this.touchedFields = {};

        this.dispatchChanges();
    }

    getValidationErrors() {
        return validate(this.getData(), this.rules) || {};
    }

    isValid() {
        return Object.keys(this.getValidationErrors()).length === 0;
    }

    set(fieldName, value) {
        this.data[fieldName] = value;
    }

    get(fieldName) {
        return this.getData()[fieldName];
    }

    getData() {
        return this.data;
    }
}
