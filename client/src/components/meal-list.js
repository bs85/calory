import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import React, { Component } from 'react';
import moment from 'moment';

import Meal from 'modules/meal';
import { getTimeFromMinutes } from 'lib/date-utils';

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class MealList extends Component {
    renderActions(meal) {
        const { onDelete, onEdit } = this.props;

        if (!onDelete && !onEdit) return null;

        return (
            <TableCell numeric>
                { onEdit ? <Button onClick={() => onEdit(meal)}><EditIcon /></Button> : null }
                { onDelete ? <Button onClick={() => onDelete(meal)}><DeleteIcon /></Button> : null }
            </TableCell>
        );
    }

    render() {
        const {
            meals,
            classes,
            title,
            onEdit,
            onDelete,
            showDate,
        } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{ title }</TableCell>
                            { showDate ? <TableCell numeric>Date</TableCell> : null }
                            <TableCell numeric>Time</TableCell>
                            <TableCell numeric>Calories</TableCell>
                            { onEdit || onDelete ? <TableCell /> : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { meals.map((meal) => (
                            <TableRow key={Meal.getId(meal)}>
                                <TableCell component="th" scope="row">
                                    {Meal.getDescription(meal)}
                                </TableCell>
                                { showDate ? <TableCell numeric>{moment(Meal.getEffectiveDate(meal)).format('ddd MMM DD YYYY')}</TableCell> : null }
                                <TableCell numeric>{getTimeFromMinutes(Meal.getTime(meal))}</TableCell>
                                <TableCell numeric>{Meal.getTotalCalories(meal)}</TableCell>
                                { this.renderActions(meal) }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(MealList);
