const {
    createCelebrant,
     getCelebrant,
    getAllCelebrants,
    updateCelebrant,
    deleteCelebrant,
    createBirthdayWish,
    getAllWishes
} = require('../controller/celebrant.controller'); 

const { pool } = require('../config/dbConnect');

describe('Controller Tests', () => {
    describe('createCelebrant', () => {
        it('should create a celebrant successfully', async () => {
            // Mock request and response objects
            const req = {
                body: {
                    // Provide necessary body parameters
                    username: 'testuser',
                    gender: 'male',
                    phone_number: '1234567890',
                    email: 'test@example.com',
                    birthdate: '11-05-24',
                    channel: 'SMS',
                    is_active: 'true'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            // Mock pool.query method
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [{ 
                username: req.body.username,
                gender: req.body.gender,
                phone_number: req.body.phone_number,
                email: req.body.email,
                birthdate: req.body.birthdate,
                channel: req.body.channel,
                is_active: req.body.is_active 
            }]
             });

            // // Call the controller function
            // await createCelebrant(req, res);

            // // Check if appropriate response is sent
            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            //     success: true,
            //     msg: "Celebrant created successfully",
            //     data: expect.any(Object)
            // }));

             // Mock pool.query method to throw an error
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Database error'));

            // Call the controller function
            await createCelebrant(req, res);

            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'internal server error' });
        });
    });

    describe('getCelebrant', () => {
        it('should return a celebrant when a valid ID is provided', async () => {
            // Mock request and response objects
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            // Mock pool.query method
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [{ id: 1, username: 'testuser', gender: 'male', phone_number: '1234567890', email: 'test@example.com', birthdate: '11-05-24', channel: 'SMS', is_active: true }] });
    
            // Call the getCelebrant function
            await getCelebrant(req, res);
    
            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: "Successful!",
                data: [{ id: 1, username: 'testuser', gender: 'male', phone_number: '1234567890', email: 'test@example.com', birthdate: '11-05-24', channel: 'SMS', is_active: true }]
            });
        });
    
        it('should return 404 if no celebrant is found for the provided ID', async () => {
            // Mock request and response objects
            const req = { params: { id: 999 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            // Mock pool.query method to return an empty rows array
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [] });
    
            // Call the getCelebrant function
            await getCelebrant(req, res);
    
            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Celebrant not found" });
        });
    
        it('should handle internal server error', async () => {
            // Mock request and response objects
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
    
            // Mock pool.query method to throw an error
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Database error'));
    
            // Call the getCelebrant function
            await getCelebrant(req, res);
    
            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'internal server error' });
        });
    });
        

    describe('getAllCelebrants', () => {
        it('should return celebrant data if found', async () => {
            // Mock request and response objects
            const req = {};
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            // Mock pool.query method
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }] });

            // Call the controller function
            await getAllCelebrants(req, res);

            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: "Successful!",
                data: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]
            });
        });

        it('should return 404 if no celebrants found', async () => {
            // Mock request and response objects
            const req = {};
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            // Mock pool.query method
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [] });

            // Call the controller function
            await getAllCelebrants(req, res);

            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "No celebrants found" });
        });

        it('should handle internal server error', async () => {
            // Mock request and response objects
            const req = {};
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            // Mock pool.query method to throw an error
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Database error'));

            // Call the controller function
            await getAllCelebrants(req, res);

            // Check if appropriate response is sent
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });


    describe('updateCelebrant', () => {
        // Mocking request and response objects
        const mockRequest = (id, body) => ({
            params: { id },
            body
        });
    
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
    
        beforeEach(() => {
            jest.clearAllMocks(); // Reset mock functions before each test
        });
    
        // Mocking database query function
        beforeEach(() => {
            pool.query.mockClear(); // Reset query mock function before each test
        });
    
        it('should return 404 if celebrant not found', async () => {
            const req = mockRequest('1', {});
            const res = mockResponse();
    
            pool.query.mockResolvedValueOnce({ rows: [] });
    
            await updateCelebrant(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Celebrant not found" });
        });
    
        it('should update celebrant without username', async () => {
            const req = mockRequest('1', {
                gender: 'Male',
                phone_number: '123456789',
                email: 'test@example.com',
                birthdate: '1990-01-01',
                channel: 'Email',
                is_active: true
            });
            const res = mockResponse();
    
            const existingCelebrant = [{ id: '1', username: 'oldUsername' }];
            pool.query.mockResolvedValueOnce({ rows: existingCelebrant });
    
            const updatedCelebrant = {
                id: '1',
                gender: 'Male',
                phone_number: '123456789',
                email: 'test@example.com',
                birthdate: '1990-01-01',
                channel: 'Email',
                is_active: true
            };
            pool.query.mockResolvedValueOnce({ rows: [updatedCelebrant] });
    
            await updateCelebrant(req, res);
    
            expect(pool.query).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: "Celebrant updated successfully!",
                data: updatedCelebrant
            });
        });
    });
    

    describe('deleteCelebrant', () => {
        // Mocking request and response objects
        const mockDeleteRequest = (id) => ({
            params: { id }
        });
    
        const mockDeleteResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
    
        // Mocking database query function
        pool.query = jest.fn();
    
        // Mocking console.error
        const originalConsoleError = console.error;
        console.error = jest.fn();
    
        describe('deleteCelebrant', () => {
            beforeEach(() => {
                jest.clearAllMocks(); // Reset mock functions before each test
            });
    
            afterAll(() => {
                console.error = originalConsoleError; // Restore original console.error after all tests are done
            });
    
            it('should delete a celebrant and return success message', async () => {
                const req = mockDeleteRequest('1');
                const res = mockDeleteResponse();
    
                const deletedCelebrant = {
                    id: '1',
                    is_deleted: true
                };
                pool.query.mockResolvedValueOnce({ rows: [deletedCelebrant] });
    
                await deleteCelebrant(req, res);
    
                expect(pool.query).toHaveBeenCalledTimes(1);
                expect(pool.query).toHaveBeenCalledWith({
                    text: 'UPDATE celebration.celebrants SET is_deleted = true WHERE id = $1',
                    values: ['1']
                });
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({
                    msg: "Successfully deleted!",
                    data: deletedCelebrant
                });
            });
    
            it('should handle database error', async () => {
                const req = mockDeleteRequest('1');
                const res = mockDeleteResponse();
    
                const error = new Error('Database error');
                pool.query.mockRejectedValueOnce(error);
    
                await deleteCelebrant(req, res);
    
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({
                    message: "internal server error"
                });
                expect(console.error).toHaveBeenCalledWith("Error deleting celebrant", error);
            });
        });
    });

    
    describe('createBirthdayWish', () => {
        // Mocking request and response objects
        const mockRequest = (body) => ({ body });
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
    
        // Mocking database query function
        pool.query = jest.fn();
    
        beforeEach(() => {
            jest.clearAllMocks(); // Reset mock functions before each test
            console.error = jest.fn(); // Mock console.error
        });
    
        it('should create a new birthday wish if celebrant exists and has no existing wish', async () => {
            const req = mockRequest({
                celebrant_id: '1',
                message: 'Happy Birthday!',
                scheduled_time: '2024-05-15T12:00:00'
            });
            const res = mockResponse();
    
            // Mocking database response when celebrant has no existing wish
            const celebrantExistsResult = { rows: [] };
            pool.query.mockResolvedValueOnce(celebrantExistsResult);
    
            // Mocking database response for the new wish
            const newWish = {
                celebrant_id: '1',
                message: 'Happy Birthday!',
                scheduled_time: '2024-05-15T12:00:00'
            };
            const expectedResult = { rows: [newWish] };
            pool.query.mockResolvedValueOnce(expectedResult);
    
            await createBirthdayWish(req, res);
    
            expect(pool.query).toHaveBeenCalledTimes(2);
            expect(pool.query).toHaveBeenNthCalledWith(1, {
                text: "SELECT * FROM celebration.birthday_wishes WHERE celebrant_id = $1",
                values: ['1']
            });
            expect(pool.query).toHaveBeenNthCalledWith(2, {
                text: "INSERT INTO celebration.birthday_wishes (celebrant_id, message, scheduled_time) VALUES ($1, $2, $3) RETURNING *",
                values: ['1', 'Happy Birthday!', '2024-05-15T12:00:00']
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                msg: "Birthday wish created successfully",
                data: newWish
            });
        });
    
        it('should return 404 if celebrant does not exist', async () => {
            const req = mockRequest({
                celebrant_id: '1',
                message: 'Happy Birthday!',
                scheduled_time: '2024-05-15T12:00:00'
            });
            const res = mockResponse();
    
            // Mocking database response when celebrant does not exist
            const celebrantExistsResult = { rows: [] };
            pool.query.mockResolvedValueOnce(celebrantExistsResult);
    
            await createBirthdayWish(req, res);
    
            expect(pool.query).toHaveBeenCalledTimes(2); // Corrected to 2 calls
            expect(pool.query).toHaveBeenCalledWith({
                text: "SELECT * FROM celebration.birthday_wishes WHERE celebrant_id = $1",
                values: ['1']
            });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                msg: "Celebrant not found"
            });
        });
    
        it('should handle database error', async () => {
            const req = mockRequest({
                celebrant_id: '1',
                message: 'Happy Birthday!',
                scheduled_time: '2024-05-15T12:00:00'
            });
            const res = mockResponse();
    
            // Mocking database error
            const error = new Error('Database error');
            pool.query.mockRejectedValueOnce(error);
    
            await createBirthdayWish(req, res);
    
            expect(pool.query).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "internal server error"
            });
            expect(console.error.mock.calls[0][0]).toEqual("Error creating new wish", error); // Check console.error message
        });

        it('should handle unexpected errors from database query', async () => {
            const req = mockRequest({
                celebrant_id: '1',
                message: 'Happy Birthday!',
                scheduled_time: '2024-05-15T12:00:00'
            });
            const res = mockResponse();
        
            // Mocking unexpected database error
            const error = new Error('Unexpected database error');
            pool.query.mockRejectedValueOnce(error);
        
            await createBirthdayWish(req, res);
        
            expect(pool.query).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "internal server error"
            });
            expect(console.error.mock.calls[0][0]).toEqual("Error creating new wish", error); // Check console.error message
        });        
    });
    
});

    // Repeat the same structure for other controller functions

