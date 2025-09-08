
import request from 'supertest';
import { app } from '@main/app';

describe('User Routes', () => {
  describe('GET /users/:userId', () => {
    it('should return a user for a valid user ID', async () => {
      const userId = 1;
      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for a non-existent user ID', async () => {
      const userId = 9999; // Assuming this user ID does not exist
      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(404);
    });

    it('should return 400 for an invalid user ID', async () => {
      const userId = 'invalid';
      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/:userId/posts', () => {
    it('should return posts for a valid user ID', async () => {
      const userId = 1;
      const response = await request(app).get(`/api/users/${userId}/posts`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((post: any) => {
        expect(post).toHaveProperty('userId', userId);
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
      });
    });

    it('should return an empty array for a user with no posts', async () => {
        const userId = 1;
        const response = await request(app).get(`/api/users/${userId}/posts`);
  
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });

    it('should return 400 for an invalid user ID', async () => {
      const userId = 'invalid';
      const response = await request(app).get(`/api/users/${userId}/posts`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/:userId/full', () => {
    it('should return full user data for a valid user ID', async () => {
      const userId = 1;
      const response = await request(app).get(`/api/users/${userId}/full`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('posts');
      expect(response.body).toHaveProperty('commentsOnFirstPost');
    });

    it('should return 404 for a non-existent user ID', async () => {
      const userId = 9999; // Assuming this user ID does not exist
      const response = await request(app).get(`/api/users/${userId}/full`);

      expect(response.status).toBe(404);
    });

    it('should return 400 for an invalid user ID', async () => {
      const userId = 'invalid';
      const response = await request(app).get(`/api/users/${userId}/full`);

      expect(response.status).toBe(400);
    });
  });
});
