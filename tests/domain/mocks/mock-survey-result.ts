import { SurveyResultModel, SurveyModel } from '@/domain/models'
import { SaveSurveyResult } from '@/domain/usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 2,
    percent: 60,
    isCurrentAccountAnswer: true
  }, {
    answer: 'other_answer',
    image: 'any_image',
    count: 8,
    percent: 90,
    isCurrentAccountAnswer: true
  }],
  date: new Date()
})

export const mockEmptySurveyResultModel = (survey: SurveyModel): SurveyResultModel => ({
  surveyId: survey.id,
  question: survey.question,
  date: survey.date,
  answers: survey.answers.map(answer => Object.assign({}, answer, {
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }))
})
