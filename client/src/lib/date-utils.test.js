/* global describe, test, expect */

import {
    getMinutesFromTime,
    getDateInstanceFromTime,
    getDateInstanceFromMinutes,
    getTimeFromMinutes,
    getMinutesFromDateInstance,
    getDateFromDateInstance,
    getTimestampFromDateInstance,
    getEffectiveDate,
} from './date-utils';

const dataset = [{
    timestamp: '2018-01-01T00:00:00.000',
    localTimestamp: '2018-01-01T00:00:00',
    date: '2018-01-01',
    timeWithSeconds: '00:00:00',
    timeWithoutSeconds: '00:00',
    totalMinutes: 0,
    hours: 0,
    minutes: 0,
}, {
    timestamp: '2018-01-01T12:05:00.000',
    localTimestamp: '2018-01-01T12:05:00',
    date: '2018-01-01',
    timeWithSeconds: '12:05:00',
    timeWithoutSeconds: '12:05',
    totalMinutes: 725,
    hours: 12,
    minutes: 5,
}, {
    timestamp: '2018-01-01T23:59:59.999',
    localTimestamp: '2018-01-01T23:59:59',
    date: '2018-01-01',
    timeWithSeconds: '23:59:99',
    timeWithoutSeconds: '23:59',
    totalMinutes: 1439,
    hours: 23,
    minutes: 59,
}, {
    timestamp: '2018-01-01T12:00:00',
    localTimestamp: '2018-01-01T12:00:00',
    date: '2018-01-01',
    timeWithSeconds: '12:00:00',
    timeWithoutSeconds: '12:00',
    totalMinutes: 720,
    hours: 12,
    minutes: 0,
}];

const effectiveDateDataset = [{
    date: new Date('2018-01-01T00:00:00'),
    startOfDay: 0,
    year: 2018,
    month: 0,
    day: 1,
}, {
    date: new Date('2018-01-01T00:00:00'),
    startOfDay: 10,
    year: 2017,
    month: 11,
    day: 31,
}, {
    date: new Date('2018-01-01T23:59:59'),
    startOfDay: 10,
    year: 2018,
    month: 0,
    day: 1,
}, {
    date: new Date('2018-01-01T12:00:00'),
    startOfDay: '12:00',
    year: 2018,
    month: 0,
    day: 1,
}, {
    date: new Date('2018-01-01T12:00:00'),
    startOfDay: '13:00',
    year: 2017,
    month: 11,
    day: 31,
}];

describe('getMinutesFromTime', () => {
    test.each(
        dataset.map((row) => [row.timeWithSeconds, row.totalMinutes]),
    )(
        '%s has %d minutes',
        (timeWithSeconds, totalMinutes) => expect(getMinutesFromTime(timeWithSeconds)).toBe(totalMinutes),
    );
});

describe('getDateInstanceFromTime', () => {
    test.each(
        dataset.map((row) => [row.timeWithSeconds, row.hours, row.minutes]),
    )(
        '%s returns a date with %d hours and %d minutes',
        (timeWithSeconds, hours, minutes) => {
            expect(getDateInstanceFromTime(timeWithSeconds).getMinutes()).toBe(minutes);
            expect(getDateInstanceFromTime(timeWithSeconds).getHours()).toBe(hours);
        },
    );
});

describe('getDateInstanceFromMinutes', () => {
    test.each(
        dataset.map((row) => [row.totalMinutes, row.hours, row.minutes]),
    )(
        '%d total minutes returns a date with %d hours and %d minutes',
        (totalMinutes, hours, minutes) => {
            expect(getDateInstanceFromMinutes(totalMinutes).getMinutes()).toBe(minutes);
            expect(getDateInstanceFromMinutes(totalMinutes).getHours()).toBe(hours);
        },
    );
});

describe('getTimeFromMinutes', () => {
    test.each(
        dataset.map((row) => [row.totalMinutes, row.timeWithoutSeconds]),
    )(
        '%d total minutes formats to %s',
        (totalMinutes, timeWithoutSeconds) => (
            expect(getTimeFromMinutes(totalMinutes)).toBe(timeWithoutSeconds)
        ),
    );
});

describe('getMinutesFromDateInstance', () => {
    test.each(
        dataset.map((row) => [row.timestamp, row.totalMinutes]),
    )(
        '%s has %d total minutes',
        (timestamp, totalMinutes) => (
            expect(getMinutesFromDateInstance(new Date(timestamp))).toBe(totalMinutes)
        ),
    );
});

describe('getDateFromDateInstance', () => {
    test.each(
        dataset.map((row) => [row.timestamp, row.date]),
    )(
        '%s parses to %s',
        (timestamp, date) => (
            expect(getDateFromDateInstance(new Date(timestamp))).toBe(date)
        ),
    );
});

describe('getTimestampFromDateInstance', () => {
    test.each(
        dataset.map((row) => [row.timestamp, row.localTimestamp]),
    )(
        '%s parses to %s',
        (timestamp, localTimestamp) => (
            expect(getTimestampFromDateInstance(new Date(timestamp))).toBe(localTimestamp)
        ),
    );
});

describe('getEffectiveDate', () => {
    test.each(
        effectiveDateDataset.map((row) => [row.date, row.startOfDay, row.year, row.month, row.day]),
    )(
        '%s when the day starts at %s parses to year %s, month %s, day %s',
        (
            date,
            startOfDay,
            year,
            month,
            day,
        ) => {
            const effectiveDate = getEffectiveDate(startOfDay, date);
            expect(effectiveDate.getFullYear()).toBe(year);
            expect(effectiveDate.getMonth()).toBe(month);
            expect(effectiveDate.getDate()).toBe(day);
        },
    );
});
