import { AppModel } from "./AppModel";
import type { Picture, RandomDataResult } from "./AppModelInterfaces";
import { useRandomUserStore } from "./stores/randomUserState";

export interface randomUserResponse{
  picture: string;
  name: string;
  surName: string;
  country: string
}

export interface randomUserResults{
  results: randomUserResponse[];
}

export function setupViewModel(){ 
  const appModel = new AppModel(); 
  const randomUserStore = useRandomUserStore()
  const { updateResponses } = randomUserStore;

  function adaptRandomDataToApp(response :RandomDataResult): randomUserResponse {
    return {
      picture: response.picture.medium,
      name: response.name.first,
      surName: response.name.last,
      country: response.location.country
    }

  }

  appModel.searchRandomData().then(
    (response:RandomDataResult[]) => {
      const adaptedResult: randomUserResponse[] = response.map(adaptRandomDataToApp)
      updateResponses(adaptedResult)
    },
    (reject) => {
      console.log(reject)
    }
  )
}