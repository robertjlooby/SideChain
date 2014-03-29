SideChain
=========

SideChain is a simple extension to Backbone.js that attempts to reduce the duplication of selectors and CSS classes in Backbone views.
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
