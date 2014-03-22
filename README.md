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

