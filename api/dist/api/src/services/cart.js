"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const getCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."cart" ORDER BY id ASC');
    return response.rows;
});
const getPaidCarts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT "cart".id as cartId,"product"."title","cartDetails"."price","cartDetails"."created_at" FROM public."cart",public."cartDetails",public."product" WHERE "userId"=$1  AND "cart".id="cartId" AND "paid"=true And "cartDetails"."productId"="product".id order by "cartId"', [userId]);
    return response.rows;
});
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.client
        .query('SELECT * FROM public."cart" where id= $1', [id])
        .then((results) => {
        if (results.rows == 0) {
            return 'no cart';
        }
        else {
            return results.rows;
        }
    })
        .catch((err) => {
        return err;
    });
});
const getSingleCartByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.client
        .query('SELECT * FROM public."cart" where "userId"= $1 And "paid"=false ', [
        id,
    ])
        .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        if (results.rows == 0) {
            return false;
        }
        else {
            return results.rows;
        }
    }))
        .catch((err) => {
        return err;
    });
});
const getUserCart = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.client
        .query('SELECT id FROM public."user" where email= $1', [email])
        .then((result) => {
        if (result.rows == 0) {
            return 'no user with this email';
        }
        else {
            return getSingleCartByUserId(result.rows[0].id);
        }
    })
        .catch((err) => {
        return err;
    });
});
const createCart = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    //create cart details obj and in database
    const paid = cart.paid || false;
    const userId = cart.userId;
    const err = {
        errorMessage: '',
    };
    return yield server_1.client
        .query('SELECT FROM public."cart" WHERE "userId"=$1 And "paid"=false ', [
        userId,
    ])
        .then((results) => {
        if (results.rows == 0) {
            server_1.client
                .query('INSERT INTO  public."cart" (  paid, "userId") VALUES($1,$2)', [paid, userId])
                .then((results) => {
                return results;
            });
        }
        else {
            err.errorMessage = 'Cart for user id: ' + userId + ' already exists!';
            return err;
        }
    })
        .catch((err) => {
        return err;
    });
});
function deleteCart(id) {
    const err = {
        errorMessage: '',
    };
    const query = server_1.client.query('SELECT FROM public."cart" WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            server_1.client
                .query('DELETE FROM public."cart" where id= $1', [id])
                .then((result) => {
                return result;
            });
        }
        else {
            err.errorMessage = 'Cart is not found';
            return err;
        }
    });
    return query;
}
const updateCart = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const err = {
        message: 'cart not found!',
    };
    const res = {
        updated: false,
    };
    return server_1.client
        .query('SELECT * FROM public."cart" where id= $1', [id])
        .then((selectRes) => {
        if (selectRes.rows.length > 0) {
            let paid = update.paid;
            if (paid == null) {
                paid = selectRes.rows[0].title;
            }
            server_1.client
                .query('UPDATE  public."cart" SET paid=$1 where id= $2', [paid, id])
                .then((res) => {
                return res.rowCount;
            });
        }
        else {
            return err;
        }
    })
        .catch((err) => {
        return err;
    });
});
const payCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const err = {
        message: 'cart not found!',
    };
    return server_1.client
        .query('SELECT * FROM public."cart" where id= $1', [id])
        .then((selectRes) => {
        if (selectRes.rows.length > 0) {
            let paid = true;
            server_1.client
                .query('UPDATE  public."cart" SET paid=$1 where id= $2', [paid, id])
                .then((res) => {
                return res.rowCount;
            });
        }
        else {
            return err;
        }
    })
        .catch((err) => {
        return err;
    });
});
exports.default = {
    getCarts,
    getSingleCart,
    getUserCart,
    createCart,
    deleteCart,
    updateCart,
    getSingleCartByUserId,
    payCart,
    getPaidCarts,
};
//# sourceMappingURL=cart.js.map