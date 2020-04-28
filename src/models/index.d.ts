import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Employee {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly cellphone: string;
  readonly miscell: string;
  constructor(init: ModelInit<Employee>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee>) => MutableModel<Employee> | void): Employee;
}