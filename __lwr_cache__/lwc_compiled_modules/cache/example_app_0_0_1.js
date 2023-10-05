import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./app.html";
//import dir from '@salesforce/i18n/dir';
/*
const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];*/
const data = [{
  id: 1,
  name: 'Billy Simonns',
  age: 40,
  email: 'billy@salesforce.com'
}, {
  id: 2,
  name: 'Kelsey Denesik',
  age: 35,
  email: 'kelsey@salesforce.com'
}, {
  id: 3,
  name: 'Kyle Ruecker',
  age: 50,
  email: 'kyle@salesforce.com'
}, {
  id: 4,
  name: 'Krystina Kerluke',
  age: 37,
  email: 'krystina@salesforce.com'
}];
const columns = [{
  label: 'Name',
  fieldName: 'name'
}, {
  label: 'Age',
  fieldName: 'age',
  type: 'number',
  sortable: true,
  cellAttributes: {
    alignment: 'left'
  }
}, {
  label: 'Email',
  fieldName: 'email',
  type: 'email'
}];
class HelloWorldApp extends LightningElement {
  constructor(...args) {
    super(...args);
    this.data = data;
    this.columns = columns;
    this.defaultSortDirection = 'asc';
    this.sortDirection = 'asc';
    this.sortedBy = void 0;
    this.clickedButtonLabel = void 0;
  }
  handleClick(event) {
    this.clickedButtonLabel = event.target.label;
  }
  connectedCallback() {
    /*
    const data = this.generateData({ amountOfRecords: 100 });
    this.data = data;*/
    //console.log(dir);
  }
  /*
      generateData({ amountOfRecords }) {
          return [...Array(amountOfRecords)].map((_, index) => {
              return {
                  name: `Name (${index})`,
                  website: 'www.salesforce.com',
                  amount: Math.floor(Math.random() * 100),
                  phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                  closeAt: new Date(
                      Date.now() + 86400000 * Math.ceil(Math.random() * 20)
                  ),
              };
          });
      }
  
      */

  // Used to sort the 'Age' column
  sortBy(field, reverse, primer) {
    const key = primer ? function (x) {
      return primer(x[field]);
    } : function (x) {
      return x[field];
    };
    return function (a, b) {
      a = key(a);
      b = key(b);
      return reverse * ((a > b) - (b > a));
    };
  }
  onHandleSort(event) {
    const {
      fieldName: sortedBy,
      sortDirection
    } = event.detail;
    const cloneData = [...this.data];
    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.data = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }
}
_registerDecorators(HelloWorldApp, {
  fields: ["data", "columns", "defaultSortDirection", "sortDirection", "sortedBy", "clickedButtonLabel"]
})
export default _registerComponent(HelloWorldApp, {
  tmpl: _tmpl
});