# Formjs

A form validation script with support for my custom MD styles, regex &amp; more.

Inputs that are to be validated must have the `required` attribute.

## How-to

- Download the JS file and link to it in your HTML document.
```html
<script src="path/to/form.js"></script>
```

### Initialize

- Initialize the script with your form's id.
```html
<script>
  let form = new Form('id', {});
</script>
```

- Apply the options you want
```html
<script>
  let form = new Form({ formId: 'id' });
</script>
```

### Regex

You can use custom regex by giving your input the data-validate-type attribute.
```html
<input type="text" name="input" required data-validate-type="myCustomRegex">
```

Then set the regex when you initialize the form.
```html
<script>
  let form = new Form({
    formId: 'id',
    regex: {
      myCustomRegex: /ab+c/
    }
  });
</script>
```

The script includes two built-in regex: name & email.

### Options

You can apply your own options if there are things you would like to enable/disable.
```javascript
validate // Toggle validation (default: true)
```
```javascript
customStyles // By default the script works with MD floating labels, but it can be disabled (default: false)
```
```javascript
errors: {
  // Here you can write you own error messages:
  errorEmpty: 'Message when empty',
  errorIncorrect: 'Message when input is incorrect'
}
```

#### Example
```html
<script>
  let form = new Form({
    formId: 'id',
    validate: false,
    customStyles: true,
    errors: {
      errorEmpty: 'There is nothing here',
      errorIncorrect: 'This is also wrong'
    }
  });
</script>
```


