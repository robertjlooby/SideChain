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
    view.$ui.div2().click()

    expect(callback1).toHaveBeenCalled()
  });
});

