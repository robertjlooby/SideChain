SideChain
=========

SideChain is a simple extension to Backbone.js that attempts to reduce the duplication of selectors and CSS classes in Backbone views.
SideChain is dependent on jQuery, Underscore.js, and Backbone.js being loaded first.
A SideChain view can be defined with a `ui` object.
The selectors defined in the `ui` object are bound to functions in the view's `$ui` object of the same name that select from inside the view's `el`.
They are also accessible in the `events` object for binding events with those selectors by using mustache (`{{ }}`) interpolation.

```js
var myView = SideChain.View.extend({
  ui: {
    div1: '#div1'
  },
  events: {
    'click {{ div1 }}' : function() { alert('Clicked') }
  },
  template: _.template('<div id="div1"></div>'),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

var view = (new myView()).render();
view.$ui.div1()         // same as view.$('#div1')
view.$ui.div1().click() // alerts 'Clicked'
```

The ui selectors my be specified as a string, an object, or array of objects like:

```js
var myView = SideChain.View.extend({
  ui: {
    div1: '#div1',
    div2: {element: 'input', class: ['error', 'large', 'red']}, //same as 'input.error.large.red'
    div3: [{id: 'title'}, {class: 'price'}, {element: 'form'}, {'data-id': 'password', class: ['hidden', 'special']}] //same as '#title .price form [data-id="password"].hidden.special'
  }
});
```

Any selector type besides `class`, `element`, or `id` will compile to the `[name="value"]` attribute selector.

For those who want to look at the source code, the DSL for the parts of the selector objects, and the strings they compile to is as follows:

```js
ui: {
  div1: [{id: 'the-id', class: ['error', 'blue', 'small']}, {element: 'input' name: 'first_name'}]
          |__________| partialElSelectorData -> partialElSelector
         |_______________________________________________| elSelectorData -> elSelector
        |________________________________________________________________________________________| selectorData -> selector
}
```

The above selector would compile to `'#the-id.error.blue.small input[name="first_name"]'`.

Selectors
========
| Selector                  | JQuery                        | SideChain                        |
|---------------------------|-------------------------------|----------------------------------|
| All                       | *                             | {'element': '*'}                 |
| Animated                  | :animated                     | {'filter': 'animated'}           |
| Attribute Contains Prefix | [name|=value]                 | {'name*=': value}                |
| Attribute Contains        | [name*=value]                 | {'name*=': value}                |
| Attribute Contains Word   | [name~=value]                 | {'name*=': value}                |
| Attribute Ends With       | [name$=value]                 | {'name*=': value}                |
| Attribute Equals          | [name=value]                  | {'name': 'value'}                |
| Attribute Not Equal       | [name!=value]                 | {'name*=': value}                |
| Attribute Starts With     | [name^=value]                 | {'name*=': value}                |
| Button                    | :button                       | {'filter': 'button'}             |
| Checkbox                  | :checkbox                     | {'filter': 'checkbox'}           |
| Checked                   | :checked                      | {'filter': 'checked'}            |
| Child                     | parent > child                | [{parent} '>' {child}]           |
| Class                     | .name                         | {'class': 'name'}                |
| Contains                  | :contains(text)               | {'contains': text}               |
| Descendant                | ancestor descendant           | [{ancestor}, {descendant}]       |
| Disabled                  | :disabled                     | {'filter': 'disabled'}           |
| Element                   | name                          | {'element': 'name'}              |
| Empty                     | :empty                        | {'filter': 'empty'}              |
| Enabled                   | :enabled                      | {'filter': 'enabled'}            |
| Equal                     | :eq(index)                    | {'eq': index}                    |
| Even                      | :even                         | {'filter': 'even'}               |
| File                      | :file                         | {'filter': 'file'}               |
| First Child               | :first-child                  | {'filter': 'first-child'}        |
| First of Type             | :first-of-type                | {'filter': 'first-of-type'}      |
| First                     | :first                        | {'filter': 'first'}              |
| Focus                     | :focus                        | {'filter': 'focus'}              |
| Greater Than              | :gt(index)                    | {'gt': index}                    |
| Has Attribute             | [name]                        | {'name': null}                   |
| Has                       | :has(selector)                | {'has': [selector]}              |
| Header                    | :header                       | {'filter': 'header'}             |
| Hidden                    | :hidden                       | {'filter': 'hidden'}             |
| ID                        | #value                        | {'id': value}                    |
| Image                     | :image                        | {'filter': 'image'}              |
| Input                     | :input                        | {'filter': 'input'}              |
| Lang                      | :lang(value)                  | {'lang': value}                  |
| Last Child                | :last-child                   | {'filter': 'last-child'}         |
| Last of Type              | :last-of-type                 | {'filter': 'last-of-type'}       |
| Last                      | :last                         | {'filter': 'last'}               |
| Less Than                 | :lt(index)                    | {'lt': index}                    |
| Multiple Attribute        | [name=value][name2=value2]    | {'name': value, 'name2': value2} |
| Multiple                  | selector1,selector2,selectorN | [{selector1}, ',', {selector2}]  |
| Next Adjacent             | prev + next                   | [{prev} '+' {next}]              |
| Next Siblings             | prev ~ siblings               | [{prev} '~' {siblings}]          |
| Not                       | :not(selector)                | {'not': [selector]}              |
| Nth Child                 | :nth-child(index)             | {'nth-child': index}             |
| Nth Last Child            | :nth-last-child(index)        | {'nth-last-child': index}        |
| Nth Last of Type          | :nth-last-of-type(index)      | {'nth-last-of-type': index}      |
| Nth of Type               | :nth-of-type(index)           | {'nth-of-type': index}           |
| Odd                       | :odd                          | {'filter': 'odd'}                |
| Only Child                | :only-child                   | {'filter': 'only-child'}         |
| Only of Type              | :only-of-type                 | {'filter': 'only-of-type'}       |
| Parent                    | :parent                       | {'filter': 'parent'}             |
| Password                  | :password                     | {'filter': 'password'}           |
| Radio                     | :radio                        | {'filter': 'radio'}              |
| Reset                     | :reset                        | {'filter': 'reset'}              |
| Root                      | :root                         | {'filter': 'root'}               |
| Selected                  | :selected                     | {'filter': 'selected'}           |
| Submit                    | :submit                       | {'filter': 'submit'}             |
| Target                    | :target                       | {'filter': 'target'}             |
| Text                      | :text                         | {'filter': 'text'}               |
| Visible                   | :visible                      | {'filter': 'visible'}            |
