import validator from 'validator'

export const isCleanDate = date => date.getMilliseconds() + date.getSeconds() + date.getHours() + date.getMinutes() === 0

export const validatePassword = password => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(password)

export const validateUsername = username => /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(username)

export const validateName = name => /^([A-Z][A-Za-z ,.'`-]{1,30})$/.test(name)

export const validateEmail = email => validator.isEmail(email)

export const validateDate = date => date instanceof Date

export const validateDateOnly = date => validateDate(date) && isCleanDate(date)

export const validateDayInWeek = day => day <= 6 && day >= 0

export const validateHour = hour => hour >= 0 && hour <= 23

export const validateMinute = minute => minute >= 0 && minute <= 59

export const validateTime = (hour, minute) => validateHour(hour) && validateMinute(minute)

