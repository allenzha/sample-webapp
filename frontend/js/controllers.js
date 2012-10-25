

define(["controllers/user",
        "controllers/page",
        "controllers/tag"
//        "controllers/session"
       ],
    function(
        userController,
        pageController,
        tagController
//        sessionController
    ) {

    return {
        user: userController,
        page: pageController,
        tag: tagController
//        session: sessionController
        //TODO: add other controllers here
    };
});