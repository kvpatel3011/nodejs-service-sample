// __tests__/app.test.js
const request = require('supertest');

// Mock winston before requiring app
jest.mock('winston', () => ({
    format: {
        json: jest.fn(),
        combine: jest.fn(),
        timestamp: jest.fn(),
        colorize: jest.fn(),
        simple: jest.fn(),
    },
    createLogger: jest.fn(() => ({
        info: jest.fn(),
        error: jest.fn(),
        add: jest.fn()
    })),
    transports: {
        Console: jest.fn(),
        File: jest.fn()
    }
}));

// Mock prom-client
jest.mock('prom-client', () => ({
    Counter: jest.fn(() => ({
        inc: jest.fn(),
    })),
    collectDefaultMetrics: jest.fn(),
    register: {
        metrics: jest.fn().mockResolvedValue('metrics'),
        contentType: 'text/plain',
    },
}));

// Import app after mocking dependencies
const app = require('../app');

describe('Application Tests', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('Health Check Endpoint', () => {
        it('should return 200 and healthy status', async () => {
            const response = await request(app)
                .get('/health')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual({
                status: 'healthy'
            });
        });
    });

    describe('Main Endpoint', () => {
        it('should return welcome message and environment info', async () => {
            const response = await request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('environment');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('Error Endpoint', () => {
        it('should return 500 status and error message', async () => {
            const response = await request(app)
                .get('/error')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(response.body).toHaveProperty('error');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('CPU Load Endpoint', () => {
        it('should simulate CPU load and return duration', async () => {
            const response = await request(app)
                .get('/cpu-load')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('duration');
            expect(response.body.message).toBe('CPU load simulation completed');
        });
    });

    describe('Metrics Endpoint', () => {
        it('should return prometheus metrics', async () => {
            const response = await request(app)
                .get('/metrics')
                .expect(200);

            expect(response.text).toBe('metrics');
        });
    });
});
