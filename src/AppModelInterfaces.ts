export interface RandomDataResponse{
  results: RandomDataResult[];
}
export interface RandomDataResult{
  name: Person;
  location: RRLocation;
  picture: Picture;
}

export interface Person{
  title: string;
  first: string;
  last: string;
}

export interface RRLocation{
  country: string;
}

// export interface RRLocation{
//   street: Street;
//   city: string;
//   state: string;
//   country: string;
//   postCode: string;
//   coordinates: Corrdinates;
//   timezone: Timezone
// }
export interface Street{
  number: number;
  name: string;
}
export interface Corrdinates{
  latitude: number;
  longitude: number
}
export interface Timezone{
  offset: string;
  description: string
}

export interface Picture{
  large: string;
  medium: string;
  thumbnail: string
}
// interface GeneralInfo{
//   seed:String;
//   results: number;
//   page: number;
//   version: String
// }