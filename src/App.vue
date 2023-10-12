<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { setupViewModel, type randomUserResponse } from './AppVireModel';
import { useRandomUserStore } from './stores/randomUserState';
import { computed, ref, watch } from 'vue';

interface Button{
  name: string,
  event(): void
}

const randomUserStore = useRandomUserStore()
const AppViewModel = setupViewModel();
const { results } = storeToRefs(randomUserStore);
AppViewModel;

const headers = computed<string[]>(() => Object.keys(displayedValues.value[0]??{}));
const normalValues = ref<randomUserResponse[]>([]);
const sortedValues = ref<randomUserResponse[]>([]);
const filteredValues = ref<randomUserResponse[]>([]);

const displayedValues = computed<randomUserResponse[]>(()=>{
  if(isShowingSortedValues.value){
    return sortedValues.value;
  }
  if(isShowingFilteredValues.value){
    return filteredValues.value
  }
  return normalValues.value;
});


watch(results,()=>{
  normalValues.value = results.value.slice();
})

function getValuesFromResult(result: randomUserResponse): string[]{
  return Object.values(result)
}

const arePairedRowsColored = ref<boolean>(false)

function sortByPredicate(a:string, b:string):number {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

function removeRow(index:number):void{
  const valueToRemove = displayedValues.value[index]
  let mappedIndex
  if(isShowingSortedValues.value){
    mappedIndex = sortedValues.value.indexOf(valueToRemove)
    sortedValues.value.splice(mappedIndex)
  }
  if(isShowingFilteredValues.value){
    mappedIndex = filteredValues.value.indexOf(valueToRemove)
    filteredValues.value.splice(mappedIndex,1)
  }
  mappedIndex = normalValues.value.indexOf(valueToRemove)
  normalValues.value.splice(mappedIndex,1)
}

const isShowingSortedValues = ref<boolean>(false);
const isShowingFilteredValues = ref<boolean>(false);

const buttons: Button[] = [
  {
    name: 'Color Filters',
    event() {
      arePairedRowsColored.value = !arePairedRowsColored.value
    },
  },
  {
    name: 'Sort by country',
    event(){
      isShowingSortedValues.value = !isShowingSortedValues.value;
      sortedValues.value = normalValues.value.slice().sort((a,b) => sortByPredicate(a.country, b.country));
    }
  },
  {
    name: 'Restore inital values',
    event(){
      isShowingSortedValues.value = false;
      isShowingFilteredValues.value = false;
    }
  },
] 

const message = ref<string>('')

function filterByCountry(country: string): void {
  isShowingFilteredValues.value = country !== '';
  filteredValues.value = normalValues.value.slice().filter((value) => value.country === country);
}

function sortBy(header: String){
  isShowingSortedValues.value = !isShowingSortedValues.value
  switch (header) {
    case 'name':
      sortedValues.value = normalValues.value.slice().sort((a,b) => sortByPredicate(a.name, b.name));
      break;
    case 'surName':
      sortedValues.value = normalValues.value.slice().sort((a,b) => sortByPredicate(a.surName, b.surName));
      break;
    case 'country':
      sortedValues.value = normalValues.value.slice().sort((a,b) => sortByPredicate(a.country, b.country));
      
      break;
    default:
      break;
  }
}

</script>

<template>
  <section class="banner">
    <h1 class="heading">Users list</h1>
    <div class="buttons">
      <button 
      v-for="button in buttons"
      :key="button.name"
      @click="button.event">
        {{ button.name }}
      </button>
      <input @keydown.enter.prevent="filterByCountry(message)" v-model="message" type="text" placeholder="Filter by country" required>
    </div>
    <table class="table">
    <tr>
      <th 
      v-for="header in headers"
      :key="header"
      @:click="sortBy(header)"
      >
        {{header}}
      </th>
      <th>
        Actions
      </th>
    </tr>
    <tr 
      v-for="(result, index) in displayedValues"
      :key="`${result.name}${result.picture}`"
      :class="{colored: (index%2) && arePairedRowsColored}"
      >
      <td>
        <img :src="getValuesFromResult(result)[0]" alt="person">
      </td>
      <td 
      v-for="data in getValuesFromResult(result).slice(1)"
      :key="data">
        {{data}}
      </td>
      <td>
        <button @click="removeRow(index)">Delete</button>
      </td>
    </tr>
  </table>

  </section>
 
</template>

<style scoped lang="scss">

@media (min-width: 1024px) {
  .banner{
    box-sizing: border-box;
    padding: 0 10vw;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: darkgrey;
  }
  .heading{
    padding: 1rem;
    font-size: 4rem;
    color: white;
  }
  .table{
    width: 100%;
  }
  th{
    border: 2px solid black;
    border-collapse: collapse;
    cursor: pointer;
  }
  table, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  tr{
    transition: all 0.3s;
  }
  td{
    text-align: center;
  }
  .colored{
    background-color: lightblue;
  }
}
</style>
./stores/randomUserState