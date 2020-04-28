import React, { useState } from "react";
import './App.css';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";

import {Employee} from "./models";

import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);

function makename(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function onCreate() {
  DataStore.save(
    new Employee({
      name: makename(5),
      email: `${makename(5)}@gmail.com`,
      cellphone: String(Math.floor(Math.random() * 10000000000)),
      miscell: "bio"
    })
  );
}

function onDeleteAll() {
  DataStore.delete(Employee, Predicates.ALL);
}

async function listEmployees(setEmployees) {
  const employees = await DataStore.query(Employee, Predicates.ALL);
  setEmployees(employees);
}

const EmployeeData = ({id, name, email, cellphone, children}) => {
  const imgurl = `https://randomuser.me/api/portraits/men/${id}.jpg`
  return (
    <article className="employeedata">
      <img src={imgurl} alt={id}/>
      <h4>ID: {id}</h4>
      <h4>Name: {name}</h4>
      <h4>E-Mail: {email}</h4>
      <h4>Cellphone: {cellphone}</h4>
      {/* <h4>Miscell: {children}</h4> */}
    </article>
  )
}

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   return (
//     <section className="employeelist">
//       <EmployeeData id="1" name="Jon" email="jon@email.com" cellphone="12122234455"> <p>My Bio</p> </EmployeeData>
//       <EmployeeData id="2" name="Jon" email="jon@email.com" cellphone="12122234455"/>
//       <EmployeeData id="3" name="Jon" email="jon@email.com" cellphone="12122234455"/>
//     </section>
//   )
// }

function App() {
  const [employees, setEmployees] = useState([]);
  return (
    <section className="App">
      <div>
          <input type="button" value="NEW" onClick={() => { onCreate(); listEmployees(setEmployees)} } />
          <input type="button" value="DELETE ALL" onClick={() => { onDeleteAll(); listEmployees(setEmployees)} } />
      </div>
      <section className="employeelist">
          {employees.map( (item,i) => {
            return <div key={i}> <EmployeeData id={Math.floor(Math.random() * 100)} name={employees[i].name} email={employees[i].email} cellphone={employees[i].cellphone}/></div>
          } )}
      </section>
    </section>
  );
}

export default App;
