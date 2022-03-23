import { uniqueId } from 'lodash';

export const projectTreeConst = [
  {
    id: uniqueId(),
    name: 'Project 1',
    includes: [
      { id: uniqueId(), name: 'ThaiHa.sbp' },
      { id: uniqueId(), name: 'ThaiHa.dbh' },
      { id: uniqueId(), name: 'ThaiHa.csv' },
    ],
    models: [
      { id: uniqueId(), name: 'herd-final.gaml' },
      { id: uniqueId(), name: 'herd-test.gaml' },
    ],
  },
  {
    id: uniqueId(),
    name: 'Project 2',
    includes: [
      { id: uniqueId(), name: 'ThaiHa.sbp' },
      { id: uniqueId(), name: 'ThaiHa.dbh' },
      { id: uniqueId(), name: 'ThaiHa.csv' },
    ],
    models: [
      { id: uniqueId(), name: 'herd-final.gaml' },
      { id: uniqueId(), name: 'herd-test.gaml' },
    ],
  },
  {
    id: uniqueId(),
    name: 'Project 3',
    includes: [
      { id: uniqueId(), name: 'ThaiHa.sbp' },
      { id: uniqueId(), name: 'ThaiHa.dbh' },
      { id: uniqueId(), name: 'ThaiHa.csv' },
    ],
    models: [
      { id: uniqueId(), name: 'herd-final.gaml' },
      { id: uniqueId(), name: 'herd-test.gaml' },
    ],
  },
  {
    id: uniqueId(),
    name: 'Project 4',
    includes: [
      { id: uniqueId(), name: 'ThaiHa.sbp' },
      { id: uniqueId(), name: 'ThaiHa.dbh' },
      { id: uniqueId(), name: 'ThaiHa.csv' },
    ],
    models: [
      { id: uniqueId(), name: 'herd-final.gaml' },
      { id: uniqueId(), name: 'herd-test.gaml' },
    ],
  },
  {
    id: uniqueId(),
    name: 'Project 5',
    includes: [
      { id: uniqueId(), name: 'ThaiHa.sbp' },
      { id: uniqueId(), name: 'ThaiHa.dbh' },
      { id: uniqueId(), name: 'ThaiHa.csv' },
    ],
    models: [
      { id: uniqueId(), name: 'herd-final.gaml' },
      { id: uniqueId(), name: 'herd-test.gaml' },
    ],
  },
];

export const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Streetddddddddddddddddddddddddd',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];
