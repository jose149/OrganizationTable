import { defineStore, type Store } from 'pinia'
import type { RandomDataResponse, RandomDataResult } from '@/AppModelInterfaces'
import type { randomUserResponse, randomUserResults } from '@/AppVireModel';

export interface RandomData{
  results: RandomDataResult[];
}

export type UseRandomUserStore = Store<"randomUser", RandomData, {}, {
  getResponses(response: RandomDataResponse): void;
}>

export const useRandomUserStore = defineStore(
{
  id: 'randomUser',
  state: (): randomUserResults => (
    {
      results: []
    }
  ),
  actions: {
    updateResponses(response: randomUserResponse[]): void{
      console.log('updateResponses: ', response)
      this.results = response;
    }
  }
}
)
