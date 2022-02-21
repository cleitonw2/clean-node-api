import request from 'supertest'
import app from '@/main/config/app'

describe('Survey Routes', () => {
  describe('PUT /surveys/:suveyId/results', () => {
    test('Should return 403 if save survey result without accessToken', async () => {
      const response = await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
      expect(response.status).toEqual(403)
    })
  })
})
