import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyModel } from '../models/survey'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
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
    percent: 60
  }, {
    answer: 'other_answer',
    image: 'any_image',
    count: 8,
    percent: 90
  }],
  date: new Date()
})

export const mockEmptySurveyResultModel = (survey: SurveyModel): SurveyResultModel => ({
  surveyId: survey.id,
  question: survey.question,
  date: survey.date,
  answers: survey.answers.map(answer => Object.assign({}, answer, {
    count: 0,
    percent: 0
  }))
})
