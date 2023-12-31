"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateZod_1 = require("../../middlewares/validateZod");
const wishList_controller_1 = require("./wishList.controller");
const wishtList_validation_1 = require("./wishtList.validation");
const router = (0, express_1.Router)();
router.post('/add-new', (0, validateZod_1.validateZod)(wishtList_validation_1.WishListValidation.createWishListZodSchama), (0, auth_1.auth)(), wishList_controller_1.WishListController.createNewWishList);
router.patch('/remove/:id', (0, validateZod_1.validateZod)(wishtList_validation_1.WishListValidation.removeBookWishListZodSchama), (0, auth_1.auth)(), wishList_controller_1.WishListController.removeBook);
router.patch('/:id', (0, validateZod_1.validateZod)(wishtList_validation_1.WishListValidation.changeStatusWishListZodSchama), (0, auth_1.auth)(), wishList_controller_1.WishListController.updateStatus);
router.delete('/:id', auth_1.auth, wishList_controller_1.WishListController.deleteWishListByUserID);
router.get('/:id', (0, auth_1.auth)(), wishList_controller_1.WishListController.getWishListByUserID);
exports.WishListRoutes = router;
