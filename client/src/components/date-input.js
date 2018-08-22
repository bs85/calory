import React, { PureComponent } from 'react';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import {
    getDateInstanceFromMinutes,
    getMinutesFromDateInstance,
    getDateFromDateInstance,
} from 'lib/date-utils';

export const TYPE_DATE = 'DATE';
export const TYPE_TIME = 'TIME';
export const TYPE_DATETIME = 'DATETIME';

class DateInput extends PureComponent {
    onChange = (date) => {
        const { type, onChange } = this.props;

        let value;
        switch (type) {
            case TYPE_TIME:
                value = date ? getMinutesFromDateInstance(date.toDate()) : null;
                break;
            case TYPE_DATE:
                value = date ? getDateFromDateInstance(date.toDate()) : null;
                break;
            default:
                value = date;
        }

        onChange(value);
    }

    render() {
        const {
            value,
            type,
            label,
        } = this.props;

        let date;
        let Component;
        switch (type) {
            case TYPE_DATETIME:
                Component = DateTimePicker;
                date = value;
                break;
            case TYPE_TIME:
                date = value ? getDateInstanceFromMinutes(value) : value;
                Component = TimePicker;
                break;
            case TYPE_DATE:
                date = value;
                Component = DatePicker;
                break;
            default:
                throw new Error(`invalid type: ${type}`);
        }

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Component
                    value={date}
                    onChange={this.onChange}
                    label={label}
                    clearable
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DateInput;
