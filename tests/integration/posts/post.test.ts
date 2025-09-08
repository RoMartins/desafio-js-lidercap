
import request from 'supertest';
import { app } from '@main/app';

describe('Post Routes', () => {
  it('should return comments for a valid post ID', async () => {
    const postId = 1;
    const response = await request(app).get(`/api/posts/${postId}/comments`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((comment: any) => {
      expect(comment).toHaveProperty('postId', postId);
      expect(comment).toHaveProperty('id');
      expect(comment).toHaveProperty('name');
      expect(comment).toHaveProperty('email');
      expect(comment).toHaveProperty('body');
    });
  });

  it('should return 404 for a post with no comments', async () => {
    const postId = 9999; // Assuming this post ID does not exist
    const response = await request(app).get(`/api/posts/${postId}/comments`);

    expect(response.status).toBe(404);
  });

  it('should return 400 for an invalid post ID', async () => {
    const postId = 'invalid';
    const response = await request(app).get(`/api/posts/${postId}/comments`);

    expect(response.status).toBe(400);
  });
});
