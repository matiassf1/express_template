import { Request, Response } from 'express';
import { z } from 'zod';

interface PaginationOptions {
    defaultLimit?: number;
    maxLimit?: number;
}

export interface PaginatedResult<T> {
    data: T[];
    limit: number;
    skip: number;
    sort: string | null;
    search: string;
    
}

export class PaginationDTO<T> {
    private readonly defaultLimit: number;
    private readonly maxLimit: number;

    constructor(defaultLimit: number = 5, maxLimit: number = 20) {
        this.defaultLimit = defaultLimit;
        this.maxLimit = maxLimit;
    }

    private readonly QuerySchema = z.object({
        limit: z.number().min(1).max(20).optional(),
        page: z.number().min(1).optional(),
        search: z.string().optional(),
        sort: z.string().optional(),
    });

    private validateQuery(query: any) {
        const parsedQuery = this.QuerySchema.safeParse(query);
        if (!parsedQuery.success) {
            throw new Error("Invalid query parameters");
        }
        return parsedQuery.data;
    }

    paginate(query: any): PaginatedResult<T> {
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

    search(query: any): string {
        return query.search as string || '';
    }
}