
define(['services/resourceManager/resourceManager'], function(ResourceManager) {
    "use strict";
    describe("ResourceManager", function() {
        it("should start without downloading active", function() {
            expect(ResourceManager.isDownloading).toEqual(false);
        });
        it("should activate downloading afterwards", function() {
            ResourceManager.startDownloading();
            expect(ResourceManager.isDownloading).toEqual(true);

        });
    });

});
