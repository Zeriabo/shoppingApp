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
const Movie_1 = __importDefault(require("../../src/models/Movie"));
const movie_1 = __importDefault(require("../../src/services/movie"));
const db_helper_1 = __importDefault(require("../db-helper"));
const nonExistingMovieId = '5e57b77b5744fa0b461c7906';
function createMovie() {
    return __awaiter(this, void 0, void 0, function* () {
        const movie = new Movie_1.default({
            name: 'Shrek 3',
            publishedYear: 2011,
            genres: ['Animation'],
            duration: 90,
            characters: ['Shrek', 'Fiona'],
        });
        return yield movie_1.default.create(movie);
    });
}
describe('movie service', () => {
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
        const movie = yield createMovie();
        expect(movie).toHaveProperty('_id');
        expect(movie).toHaveProperty('name', 'Shrek 3');
        expect(movie).toHaveProperty('duration', 90);
    }));
    it('should get a movie with id', () => __awaiter(void 0, void 0, void 0, function* () {
        const movie = yield createMovie();
        const found = yield movie_1.default.findById(movie._id);
        expect(found.name).toEqual(movie.name);
        expect(found._id).toEqual(movie._id);
    }));
    // Check https://jestjs.io/docs/en/asynchronous for more info about
    // how to test async code, especially with error
    it('should not get a non-existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        return movie_1.default.findById(nonExistingMovieId).catch((e) => {
            expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`);
        });
    }));
    it('should update an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const movie = yield createMovie();
        const update = {
            name: 'Shrek',
            publishedYear: 2001,
        };
        const updated = yield movie_1.default.update(movie._id, update);
        expect(updated).toHaveProperty('_id', movie._id);
        expect(updated).toHaveProperty('name', 'Shrek');
        expect(updated).toHaveProperty('publishedYear', 2001);
    }));
    it('should not update a non-existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const update = {
            name: 'Shrek',
            publishedYear: 2001,
        };
        return movie_1.default.update(nonExistingMovieId, update).catch((e) => {
            expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`);
        });
    }));
    it('should delete an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const movie = yield createMovie();
        yield movie_1.default.deleteMovie(movie._id);
        return movie_1.default.findById(movie._id).catch((e) => {
            expect(e.message).toBe(`Movie ${movie._id} not found`);
        });
    }));
});
//# sourceMappingURL=movie.test.js.map