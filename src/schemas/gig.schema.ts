import {
    name,
    nonNumericTitle,
    schema,
    IsObjectId,
    looseSchema,
} from '../utils/schema.util';

const budget = {
    type: 'number',
    minimum: 5,
};

const gig = {
    title: nonNumericTitle(1, 30),
    description: { type: 'string' },
    budget,
    type: { type: 'string' },
    preferredTechnologies: { type: 'array', items: { type: 'string' } },
    active: { type: 'boolean' },
};

const metadata = {
    type: 'object',
    properties: {
        token: { type: 'string' },
    },
};

const store = {
    summary: 'creates a new gig and store it',
    consumes: ['application/json'],
    body: schema(gig),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
                message: { type: 'string' },
                metadata,
            },
        },
    },
};

const findOne = {
    summary: 'returns a gig from the database',
    consumes: ['application/json'],
    params: schema({ _id: { type: 'string' } }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: gig,
                },
                message: { type: 'string' },
            },
        },
    },
};

const find = {
    summary: 'returns gigs from the database',
    consumes: ['application/json'],
    querystring: looseSchema({
        title: nonNumericTitle(1, 30),
        description: { type: 'string' },
        type: { type: 'string' },
        userId: { type: 'string' },
        preferredTechnologies: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        active: { type: 'boolean' },
    }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: gig,
                        required: ['title', 'description', 'active'],
                    },
                },
                metadata,
            },
        },
    },
};

const update = {
    summary: 'update an existing gig',
    consumes: ['application/json'],
    body: looseSchema(
        { title: nonNumericTitle(1, 15), description: { type: 'string' } },
        [{ required: ['title'] }, { required: ['description'] }],
    ),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

export default { store, find, findOne, update };
