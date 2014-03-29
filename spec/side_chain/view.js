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

    it('for an id and a class', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {id: 'the-div', class : 'div1'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('#the-div.div1');
    });

    xit('for an element', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input');
    });

    it('for an element', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {element: 'input'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('input');
    });

    it('for an attribute selector', function() {
      var myView = SideChain.View.extend({
        ui: {div1: {'data-id': 'first name'}}
      });
      var view = new myView();

      expect(view.$ui.div1().selector).toEqual('[data-id="first name"]');
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

