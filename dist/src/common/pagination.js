"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDTO = void 0;
const zod_1 = require("zod");
class PaginationDTO {
    constructor(defaultLimit = 5, maxLimit = 20) {
        this.QuerySchema = zod_1.z.object({
            limit: zod_1.z.number().min(1).max(20).optional(),
            page: zod_1.z.number().min(1).optional(),
            search: zod_1.z.string().optional(),
            sort: zod_1.z.string().optional(),
        });
        this.defaultLimit = defaultLimit;
        this.maxLimit = maxLimit;
    }
    validateQuery(query) {
        const parsedQuery = this.QuerySchema.safeParse(query);
        if (!parsedQuery.success) {
            throw new Error("Invalid query parameters");
        }
        return parsedQuery.data;
    }
    paginate(query) {
        const { limit = this.defaultLimit, page = 1, search = '', sort = null } = this.validateQuery(query);
        const normalizedLimit = Math.min(limit, this.maxLimit);
        const normalizedPage = Math.max(page, 1);
        const skip = (normalizedPage - 1) * normalizedLimit;
        return {
            limit: normalizedLimit,
            skip,
            sort,
            search,
            data: []
        };
    }
    search(query) {
        return query.search || '';
    }
}
exports.PaginationDTO = PaginationDTO;
