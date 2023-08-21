"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRoutes = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/wish-lists',
        route: wishList_route_1.WishListRoutes,
    },
];
// use
moduleRoutes.forEach(module => {
    router.use(module.path, module.route);
});
exports.ApplicationRoutes = router;
