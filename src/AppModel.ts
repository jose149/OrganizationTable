import type { RandomDataResponse, RandomDataResult } from "./AppModelInterfaces";




export class AppModel{
  constructor(){}

  public searchRandomData():Promise<RandomDataResult[]>{

    const randomDataRequest = this.getRandomDataURL();

    const options: RequestInit = {
      method: "GET",
    }
    
    return fetch(randomDataRequest, options)
    .then((response) => response.json())
    .then((response: RandomDataResponse) => response.results)
  }

  private getRandomDataURL():string{
    const baseURL= 'https://randomuser.me/api/'
    const resultsNumber = 100;
    const includedFields = ['name', 'location', 'picture']
    const parametersURL ='?format=json' + '&results=' + resultsNumber + '&inc=' + includedFields.toString()

    return  baseURL + parametersURL;
  }
}