class Form {
    constructor(formId, options = {
        'validate': true,
        'customStyles': false
    }, regex = {
        'name': /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
        'email': /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    }) {
        this.form = document.getElementById(formId);
        this.inputs = this.form.querySelectorAll('input');
        this.validate = options['validate'];
        this.customStyles = options['customStyles'];
        this.regex = regex;
        this.initForm();
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });
    };

    initForm() {
        for (let i = 0; i < this.inputs.length; i++) {
            let type = this.inputs[i].type;
            if (type === 'text' || type === 'email' || type === 'password' || type === 'number' || type === 'datetime') {
                this.initField(this.inputs[i]);
            }
        }
    }

    initField(field) {
        field.container = field.parentNode;
        if (!this.customStyles) {
            field.label = findSibling(field, 'label');
        }
        if (field.value.length > 0) {
            field.label.classList.add('hovering');
        }
        field.addEventListener('focusin', () => {
            if (field.label) {
                field.label.classList.add('hovering');
                field.label.classList.add('focus');
            }
        });
        field.addEventListener('focusout', () => {
            if (field.label) {
                field.label.classList.remove('focus');
                if (field.value.length === 0) {
                    field.label.classList.remove('hovering');
                }
            }
            if (this.validate && field.required) {
                this.validateField(field, false);
            }
        });

    }

    validateForm() {
        for (let i = 0; i < this.inputs.length; i++) {
            let type = this.inputs[i].type;
            if (this.inputs[i].required) {
                if (type === 'text' || type === 'email' || type === 'password' || type === 'number' || type === 'datetime') {
                    if (!this.validateField(this.inputs[i])) return false;
                }
            }
        }
        this.form.submit();
    }

    validateField(field, complete = true) {
        let type = field.dataset.validateType;
        if (field.value.length === 0) {
            if (complete) {
                let message = 'Field is empty';
                this.fieldError(field, message);
            }
            return false;
        } else if (type) {
            if (type) {
                let toValidate = field.value;
                let regex = this.regex[type];
                if (regex.exec(toValidate)) {
                    return true;
                } else {
                    let message = 'Error in field';
                    this.fieldError(field, message);
                }
            }
        } else {
            return true;
        }
    }
    fieldError(field, message) {
        if (!field.container.classList.contains('error')) field.container.classList.add('error');
        if (!findSibling(field, 'small')) {
            field.messageContainer = document.createElement('small');
            field.messageContainer.innerText = message;
            field.container.appendChild(field.messageContainer);
        }
        field.addEventListener('keydown', () => {
            field.container.classList.remove('error');
            field.messageContainer.remove();
        });
    }
}

function findSibling(referenceElem, query) {
    let parent = referenceElem.parentNode;
    return parent.querySelector(query);
}