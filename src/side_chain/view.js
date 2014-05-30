namespace('SideChain');

(function(Backbone, $) {
  'use strict';

  SideChain.View = Backbone.View.extend({
    constructor: function(options) {
      options || (options = {});
      _.bindAll(this, 'elSelectorDataToElSelector');
      this.constructUISelectors();
      this.bindUISelectors();
      this.bindUIEvents();
      Backbone.View.apply(this, arguments);
    },
    partialElSelectorDataToPartialElSelector: function(type, value) {
      var separators = {
        'class'  : '.',
        'element': '',
        'id'     : '#',
      };
      if (_.isUndefined(value)) {
        return '';
      } else if (_.isString(separators[type])) {
        var separator = separators[type];
        return separator + (_.isArray(value) ? value : [value]).join(separator);

      } else if (_.contains(['contains', 'eq', 'gt', 'lang', 'lt', 'nth-child', 'nth-last-child', 'nth-last-of-type', 'nth-of-type'], type)) {
        return ':' + type + '(' + value + ')';
      } else if (_.contains(['filter'], type)) {
        return ':' + value;
      } else if (_.contains(['has', 'not'], type)) {
        return ':' + type + '(' + this.selectorDataToSelector(value) + ')';
      } else {
        return '[' + type + '="' + value + '"]';
      }
    },

    elSelectorDataToElSelector: function(elSelectorData) {
      if (_.isString(elSelectorData)) { return elSelectorData;}
      var selector = "";
      var prefixSelectorTypes = ['element', 'id', 'class'];
      var postfixSelectorTypes = ['contains', 'eq', 'gt', 'lang', 'lt', 'nth-child', 'nth-last-child', 'nth-last-of-type', 'nth-of-type'];
      var filterSelectorTypes = ['filter'];
      var selectorArgTypes = ['has', 'not'];
      var fixedTypes = prefixSelectorTypes.concat(postfixSelectorTypes, filterSelectorTypes, selectorArgTypes);
      var otherTypes = _.omit(elSelectorData, fixedTypes);
      var selectorTypes = prefixSelectorTypes.concat(_.keys(otherTypes), postfixSelectorTypes, filterSelectorTypes, selectorArgTypes);
      _.each(selectorTypes, (function(_this) {
        return function(type) {
          selector += _this.partialElSelectorDataToPartialElSelector(type, elSelectorData[type]);
        };
      })(this));
      return selector;
    },

    selectorDataToSelector: function(selectorData) {
      if (_.isString(selectorData)) {
        return selectorData;
      }
      return _.map(
          _.isArray(selectorData) ? selectorData : [selectorData],
          this.elSelectorDataToElSelector
          ).join(' ');
    },

    constructUISelectors: function() {
      this.uiSelectors = {};
      _.each(this.ui, (function(_this) {
        return function(selectorData, name) {
          var selector = _this.selectorDataToSelector(selectorData);
          _this.uiSelectors[name] = selector;
        };
      })(this));
    },

    bindUISelectors: function() {
      this.$ui = {};
      _.each(this.uiSelectors, (function(_this) {
        return function(selector, name) {
          _this.$ui[name] = function() {return _this.$(selector)};
        };
      })(this));
    },

    bindUIEvents: function() {
      var tempEvents = this.events;
      this.events = {};
      _.each(tempEvents, (function(_this) {
        return function(handler, eventTrigger) {
          var mustacheMatcher = /\{\{(.+?)\}\}/g;
          var interpolatedEventTrigger = _.template(eventTrigger, _this.uiSelectors, {interpolate: mustacheMatcher});
          _this.events[interpolatedEventTrigger] = handler;
        };
      })(this));
    }
  });
})(window.Backbone, window.jquery);

