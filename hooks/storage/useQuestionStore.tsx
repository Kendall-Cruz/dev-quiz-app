import { IQuestion } from '@/interfaces/IQuestion'
import { create } from 'zustand'

interface IQuestionStore {
    questionsFiltered: IQuestion[],
    setQuestionsFiltered:  (questions:IQuestion[]) => void;
}

export const useQuestionStore = create<IQuestionStore>((set) => ({
    questionsFiltered: [],
    setQuestionsFiltered: (questionsFiltered) => set({questionsFiltered})
}))