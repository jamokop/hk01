import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
    api: {
        hint: value => (
            <button
                className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        )
    },
    
    number: {
        rule:value => validator.isNumeric(value),
        hint: () => <span className="form-error is-visible">contains numbers only </span>
    },
    
    cvv: {
        rule:value => validator.isNumeric(value) && value.length >=3 && value.length<=4,
        hint: () => <span className="form-error is-visible">contains three digits or four digits only </span>
    },
    
    creditCard: {
        rule: value => validator.isCreditCard(value),
        hint: () => <span className="form-error is-visible">please enter a valid credit card number</span>
    },
    
    expiryMonth: {
        rule: value => validator.matches(value,/^(0[1-9]|1[0-2])$/),
        hint: () => <span className="form-error is-visible">please enter a valid expiry month (mm)</span>
    },
    
    expiryYear: {
        rule: value => validator.matches(value,/^[0-9]{4}$/),
        hint: () => <span className="form-error is-visible">please enter a valid expiry year (yy)</span>
    },

    required: {
        rule: value => value.toString().trim(),
        hint: () => <span className="form-error is-visible">Required</span>
    },

    email: {
        rule: value => validator.isEmail(value),
        hint: value => <span className="form-error is-visible">{value} is not an Email.</span>
    },

    alpha: {
        rule: value => validator.isAlpha(value),
        hint: () => (
            <span className="form-error is-visible">
                String should contain only letters (a-zA-Z).
            </span>
        )
    },

    password: {
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    }
});