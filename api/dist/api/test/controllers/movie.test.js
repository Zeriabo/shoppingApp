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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const db_helper_1 = __importDefault(require("../db-helper"));
const nonExistingMovieId = '5e57b77b5744fa0b461c7906';
function createMovie(override) {
    return __awaiter(this, void 0, void 0, function* () {
        let movie = {
            name: 'Angrybirds 2',
            publishedYear: 2019,
            rating: 3.5,
            duration: 120,
            genres: ['Animation', 'Game'],
            characters: ['Red', 'Chuck', 'Bomb'],
        };
        if (override) {
            movie = Object.assign(Object.assign({}, movie), override);
        }
        return yield supertest_1.default(app_1.default).post('/api/v1/movies').send(movie);
    });
}
describe('movie controller', () => {
    let mongodHelper;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongodHelper = yield db_helper_1.default();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongodHelper.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongodHelper.closeDatabase();
    }));
    it('should create a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield createMovie();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Angrybirds 2');
    }));
    it('should not create a movie with wrong data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default)
            .post('/api/v1/movies')
            .send({
            name: 'Angrybirds 2',
            publishedYear: 2019,
            // These fields should be included
            // rating: 3.5,
            // duration: 120,
            genres: ['Animation', 'Game'],
            characters: ['Red', 'Chuck', 'Bomb'],
        });
        expect(res.status).toBe(400);
    }));
    it('should get back an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createMovie();
        expect(res.status).toBe(200);
        const movieId = res.body._id;
        res = yield supertest_1.default(app_1.default).get(`/api/v1/movies/${movieId}`);
        expect(res.body._id).toEqual(movieId);
    }));
    it('should not get back a non-existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).get(`/api/v1/movies/${nonExistingMovieId}`);
        expect(res.status).toBe(404);
    }));
    it('should get back all movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield createMovie({
            name: 'Angrybirds 1',
            publishedYear: 2016,
        });
        const res2 = yield createMovie({
            name: 'Angrybirds 2',
            publishedYear: 2019,
        });
        const res3 = yield supertest_1.default(app_1.default).get('/api/v1/movies');
        expect(res3.body.length).toEqual(2);
        expect(res3.body[0]._id).toEqual(res1.body._id);
        expect(res3.body[1]._id).toEqual(res2.body._id);
    }));
    it('should update an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createMovie();
        expect(res.status).toBe(200);
        const movieId = res.body._id;
        const update = {
            name: 'Angrybirds 1',
            publishedYear: 2016,
        };
        res = yield supertest_1.default(app_1.default).put(`/api/v1/movies/${movieId}`).send(update);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Angrybirds 1');
        expect(res.body.publishedYear).toEqual(2016);
    }));
    it('should delete an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createMovie();
        expect(res.status).toBe(200);
        const movieId = res.body._id;
        res = yield supertest_1.default(app_1.default).delete(`/api/v1/movies/${movieId}`);
        expect(res.status).toEqual(204);
        res = yield supertest_1.default(app_1.default).get(`/api/v1/movies/${movieId}`);
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=movie.test.js.map