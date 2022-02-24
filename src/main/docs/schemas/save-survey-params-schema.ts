export const SaveSurveyParamsSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    }
  },
  required: ['answer']
}
