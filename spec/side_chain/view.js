describe('SideChain.View', function() {
  'use strict';

  it('is a Backbone.View', function() {
    var view = new SideChain.View();

    expect(view instanceof Backbone.View).toBeTruthy();
  });

  it('can access its UI elements', function() {
    var myView = SideChain.View.extend({
      ui: {
        div1: '#div1',
        div2: '#div2'
      }
    });
    var view = new myView();

    view.$el.html('<div id="div1"></div><div id="div2"></div>')

    expect(view.$ui.div1()).toEqual(view.$('#div1'));
    expect(view.$ui.div2()).toEqual(view.$('#div2'));
  });

  it('can bind UI selectors in events', function() {
    var callback1 = jasmine.createSpy()
    var callback2 = jasmine.createSpy()
    var myView = SideChain.View.extend({
      ui: {
        div1: '#div1',
        div2: '#div2'
      },
      events: {
        'click {{ div1 }}' : callback1,
        'click {{ div2 }}' : callback2
      },
      render: function() {
        this.$el.html('<div id="div1"></div><div id="div2"></div>');
        return this;
      }
    });
    var view = new myView();

    view.render();
    view.$ui.div1().click()
    view.$ui.div2().click()

    expect(callback1).toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
  });

  it('can handle multiple UI selectors in events', function() {
    var callback1 = jasmine.createSpy()
    var myView = SideChain.View.extend({
      ui: {
        div1: '#div1',
        div2: '#div2'
      },
      events: {
        'click {{ div1 }} {{ div2 }}' : callback1
      },
      render: function() {
        this.$el.html('<div id="div1"><div id="div2"></div></div>');
        return this;
      }
    });
    var view = new myView();

    view.render();
    view.$ui.div2().click();

    expect(callback1).toHaveBeenCalled();
  });

  describe('selectors', function() {
    it('for a single id', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {id : 'div1'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('#div1');
    });

    it('for multiple ids', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {id : ['div1', 'error', 'name']}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('#div1#error#name');
    });

    it('for a single class', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {class : 'div1'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.div1');
    });

    it('for multiple classes', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {class : ['div1', 'error', 'name']}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.div1.error.name');
    });

    it('for nested classes', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{class : 'div1'}, {class : 'inner'}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.div1 .inner');
    });

    it('for child selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{class : 'first'}, '>', {class : 'second'}, '>', {class : 'third'}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.first > .second > .third');
    });

    it('for next adjacent selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{class : 'first'}, '+', {class : 'second'}, '+', {class : 'third'}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.first + .second + .third');
    });

    it('for next sibling selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{class : 'first'}, '~', {class : 'second'}, '~', {class : 'third'}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.first ~ .second ~ .third');
    });

    it('for multiple selectors', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{class : 'first'}, ',', {class : 'second'}, ',', {class : 'third'}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('.first , .second , .third');
    });

    it('for an id and a class', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {id: 'the-div', class : 'div1'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('#the-div.div1');
    });

    it('for an element', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input');
    });

    it('for all elements', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element : '*', filter: 'checked'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('*:checked');
    });

    it('for an index equals selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', eq: 5, 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:eq(5)');
    });

    it('for an index greater than selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', gt: 6, 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:gt(6)');
    });

    it('for an index less than selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', lt: 2, 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:lt(2)');
    });

    it('for a lang selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', lang: 'en', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:lang(en)');
    });

    it('for nth-child selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'nth-child': 7, 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:nth-child(7)');
    });

    it('for nth-last-child selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'nth-last-child': 7, 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:nth-last-child(7)');
    });

    it('for nth-last-of-type selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'nth-last-of-type': '3n + 1', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:nth-last-of-type(3n + 1)');
    });

    it('for nth-of-type selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'nth-of-type': 'even', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:nth-of-type(even)');
    });

    it('for contains selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'contains': 'some text', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:contains(some text)');
    });

    it('for filter :animated selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'filter': 'animated', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:animated');
    });

    it('for filter :button selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'filter': 'button', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:button');
    });

    it('for filter :checkbox selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input', 'filter': 'checkbox', 'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input[data-id="first name"]:checkbox');
    });

    it('for a has selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {has: [{element: 'form', 'class': ['error', 'primary']},
                          {element: 'input', 'data-id': 'card', name: 'first name'},
                          {id: ['blah', 'special']}]}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual(':has(form.error.primary input[data-id="card"][name="first name"] #blah#special)');
    });

    it('for a not selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {not: [{element: 'form', 'class': ['error', 'primary']},
                          {element: 'input', 'data-id': 'card', name: 'first name'},
                          {id: ['blah', 'special']}]}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual(':not(form.error.primary input[data-id="card"][name="first name"] #blah#special)');
    });

    it('for an attribute selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('[data-id="first name"]');
    });

    it('for a has attribute selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {'data-id': null}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('[data-id]');
    });

    it('for an attribute contains prefix selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value|=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value|="Chicago"]');
    });

    it('for an attribute contains selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value*=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value*="Chicago"]');
    });

    it('for an attribute contains word selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value~=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value~="Chicago"]');
    });

    it('for an attribute ends with selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value$=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value$="Chicago"]');
    });

    it('for an attribute not equal with selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value!=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value!="Chicago"]');
    });

    it('for an attribute starts with selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', 'value^=': 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value^="Chicago"]');
    });

    it('for an attribute selector and element', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'option', value: 'Chicago'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('option[value="Chicago"]');
    });

    it('for a complex example', function() {
      var myView = SideChain.View.extend({
        ui: {div1: [{element: 'form', 'class': ['error', 'primary']},
                    {element: 'input', 'data-id': 'card', name: 'first name'},
                    {id: ['blah', 'special']}]}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('form.error.primary input[data-id="card"][name="first name"] #blah#special');
    });
  });
});

