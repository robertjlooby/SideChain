describe("SideChain.View", function() {
  "use strict";

  it("is a Backbone.View", function() {
    var view = new SideChain.View();
    expect(view instanceof Backbone.View).toBeTruthy();
  });
});
