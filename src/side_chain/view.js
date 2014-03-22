namespace('SideChain');

(function(Backbone, $) {
  'use strict';

  SideChain.View = Backbone.View.extend({
    constructor: function(options) {
      options || (options = {});
      this.bindUISelectors();
      this.bindUIEvents();
      Backbone.View.apply(this, arguments);
    },

    bindUISelectors: function() {
      this.$ui = {};
      _.each(this.ui, (function(_this) {
        return function(selector, name) {
          _this.$ui[name] = function() {return _this.$(selector)}
        };
      })(this));
    },

    bindUIEvents: function() {
      var tempEvents = this.events;
      this.events = {};
      _.each(tempEvents, (function(_this) {
        return function(handler, eventTrigger) {
          var mustacheMatcher = /\{\{(.+?)\}\}/g;
          var interpolatedEventTrigger = _.template(eventTrigger, _this.ui, {interpolate: mustacheMatcher})
          _this.events[interpolatedEventTrigger] = handler;
        };
      })(this));
    }
  });
})(window.Backbone, window.jquery);

