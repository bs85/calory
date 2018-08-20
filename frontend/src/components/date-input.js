import React, { PureComponent } from 'react';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export const TYPE_DATE = 'DATE';
export const TYPE_TIME = 'TIME';
export const TYPE_DATETIME = 'DATETIME';

class DateInput extends PureComponent {
    render() {
        const {
            value,
            onChange,
            type,
            label,
        } = this.props;

        let Component;
        switch (type) {
            case TYPE_DATETIME:
                Component = DateTimePicker;
                break;
            case TYPE_TIME:
                Component = TimePicker;
                break;
            default:
                Component = DatePicker;
        }

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Component
                    value={value}
                    onChange={onChange}
                    label={label}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DateInput;
