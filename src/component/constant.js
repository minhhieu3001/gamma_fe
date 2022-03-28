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

export const imageUrls = [
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-0.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-10.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-20.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-30.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-40.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart12-50.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-0.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-10.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-20.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-30.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-40.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myChart2-50.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-0.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-10.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-12.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-14.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-16.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-18.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-2.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-20.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-22.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-24.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-26.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-28.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-30.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-32.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-34.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-36.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-38.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-4.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-40.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-42.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-44.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-46.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-48.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-50.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-52.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-6.png',
  'https://gama-laravel.s3.ap-southeast-1.amazonaws.com/snapshots/20_myDisplay2-8.png',
];
