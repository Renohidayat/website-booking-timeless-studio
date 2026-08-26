# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `timeless-studio-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPackages*](#listpackages)
  - [*GetPackage*](#getpackage)
  - [*ListAdditionalServices*](#listadditionalservices)
  - [*ListSchedules*](#listschedules)
  - [*GetSchedulesByDate*](#getschedulesbydate)
  - [*ListVouchers*](#listvouchers)
  - [*CheckVoucher*](#checkvoucher)
- [**Mutations**](#mutations)
  - [*CreatePackage*](#createpackage)
  - [*CreateSchedule*](#createschedule)
  - [*UpdateScheduleStatus*](#updateschedulestatus)
  - [*DeleteSchedule*](#deleteschedule)
  - [*CreateBooking*](#createbooking)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `timeless-studio-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@timeless-studio/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@timeless-studio/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@timeless-studio/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `timeless-studio-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPackages
You can execute the `ListPackages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listPackages(options?: ExecuteQueryOptions): QueryPromise<ListPackagesData, undefined>;

interface ListPackagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPackagesData, undefined>;
}
export const listPackagesRef: ListPackagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPackages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPackagesData, undefined>;

interface ListPackagesRef {
  ...
  (dc: DataConnect): QueryRef<ListPackagesData, undefined>;
}
export const listPackagesRef: ListPackagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPackagesRef:
```typescript
const name = listPackagesRef.operationName;
console.log(name);
```

### Variables
The `ListPackages` query has no variables.
### Return Type
Recall that executing the `ListPackages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPackagesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPackagesData {
  packages: ({
    id: UUIDString;
    namaPaket: string;
    kategori: string;
    hargaDasar: number;
    durasiMenit: number;
    maksOrang: number;
    deskripsi: string;
    isPopular: boolean;
  } & Package_Key)[];
}
```
### Using `ListPackages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPackages } from '@timeless-studio/dataconnect';


// Call the `listPackages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPackages();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPackages(dataConnect);

console.log(data.packages);

// Or, you can use the `Promise` API.
listPackages().then((response) => {
  const data = response.data;
  console.log(data.packages);
});
```

### Using `ListPackages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPackagesRef } from '@timeless-studio/dataconnect';


// Call the `listPackagesRef()` function to get a reference to the query.
const ref = listPackagesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPackagesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.packages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.packages);
});
```

## GetPackage
You can execute the `GetPackage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getPackage(vars: GetPackageVariables, options?: ExecuteQueryOptions): QueryPromise<GetPackageData, GetPackageVariables>;

interface GetPackageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPackageVariables): QueryRef<GetPackageData, GetPackageVariables>;
}
export const getPackageRef: GetPackageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPackage(dc: DataConnect, vars: GetPackageVariables, options?: ExecuteQueryOptions): QueryPromise<GetPackageData, GetPackageVariables>;

interface GetPackageRef {
  ...
  (dc: DataConnect, vars: GetPackageVariables): QueryRef<GetPackageData, GetPackageVariables>;
}
export const getPackageRef: GetPackageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPackageRef:
```typescript
const name = getPackageRef.operationName;
console.log(name);
```

### Variables
The `GetPackage` query requires an argument of type `GetPackageVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPackageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPackage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPackageData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPackageData {
  package?: {
    id: UUIDString;
    namaPaket: string;
    kategori: string;
    hargaDasar: number;
    durasiMenit: number;
    maksOrang: number;
    deskripsi: string;
    isPopular: boolean;
  } & Package_Key;
}
```
### Using `GetPackage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPackage, GetPackageVariables } from '@timeless-studio/dataconnect';

// The `GetPackage` query requires an argument of type `GetPackageVariables`:
const getPackageVars: GetPackageVariables = {
  id: ..., 
};

// Call the `getPackage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPackage(getPackageVars);
// Variables can be defined inline as well.
const { data } = await getPackage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPackage(dataConnect, getPackageVars);

console.log(data.package);

// Or, you can use the `Promise` API.
getPackage(getPackageVars).then((response) => {
  const data = response.data;
  console.log(data.package);
});
```

### Using `GetPackage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPackageRef, GetPackageVariables } from '@timeless-studio/dataconnect';

// The `GetPackage` query requires an argument of type `GetPackageVariables`:
const getPackageVars: GetPackageVariables = {
  id: ..., 
};

// Call the `getPackageRef()` function to get a reference to the query.
const ref = getPackageRef(getPackageVars);
// Variables can be defined inline as well.
const ref = getPackageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPackageRef(dataConnect, getPackageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.package);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.package);
});
```

## ListAdditionalServices
You can execute the `ListAdditionalServices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listAdditionalServices(options?: ExecuteQueryOptions): QueryPromise<ListAdditionalServicesData, undefined>;

interface ListAdditionalServicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAdditionalServicesData, undefined>;
}
export const listAdditionalServicesRef: ListAdditionalServicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAdditionalServices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAdditionalServicesData, undefined>;

interface ListAdditionalServicesRef {
  ...
  (dc: DataConnect): QueryRef<ListAdditionalServicesData, undefined>;
}
export const listAdditionalServicesRef: ListAdditionalServicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAdditionalServicesRef:
```typescript
const name = listAdditionalServicesRef.operationName;
console.log(name);
```

### Variables
The `ListAdditionalServices` query has no variables.
### Return Type
Recall that executing the `ListAdditionalServices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAdditionalServicesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAdditionalServicesData {
  additionalServices: ({
    id: UUIDString;
    namaLayanan: string;
    hargaSatuan: number;
  } & AdditionalService_Key)[];
}
```
### Using `ListAdditionalServices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAdditionalServices } from '@timeless-studio/dataconnect';


// Call the `listAdditionalServices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAdditionalServices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAdditionalServices(dataConnect);

console.log(data.additionalServices);

// Or, you can use the `Promise` API.
listAdditionalServices().then((response) => {
  const data = response.data;
  console.log(data.additionalServices);
});
```

### Using `ListAdditionalServices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAdditionalServicesRef } from '@timeless-studio/dataconnect';


// Call the `listAdditionalServicesRef()` function to get a reference to the query.
const ref = listAdditionalServicesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAdditionalServicesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.additionalServices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.additionalServices);
});
```

## ListSchedules
You can execute the `ListSchedules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listSchedules(options?: ExecuteQueryOptions): QueryPromise<ListSchedulesData, undefined>;

interface ListSchedulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSchedulesData, undefined>;
}
export const listSchedulesRef: ListSchedulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSchedules(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSchedulesData, undefined>;

interface ListSchedulesRef {
  ...
  (dc: DataConnect): QueryRef<ListSchedulesData, undefined>;
}
export const listSchedulesRef: ListSchedulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSchedulesRef:
```typescript
const name = listSchedulesRef.operationName;
console.log(name);
```

### Variables
The `ListSchedules` query has no variables.
### Return Type
Recall that executing the `ListSchedules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSchedulesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSchedulesData {
  schedules: ({
    id: UUIDString;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    statusSlot: string;
  } & Schedule_Key)[];
}
```
### Using `ListSchedules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSchedules } from '@timeless-studio/dataconnect';


// Call the `listSchedules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSchedules();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSchedules(dataConnect);

console.log(data.schedules);

// Or, you can use the `Promise` API.
listSchedules().then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

### Using `ListSchedules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSchedulesRef } from '@timeless-studio/dataconnect';


// Call the `listSchedulesRef()` function to get a reference to the query.
const ref = listSchedulesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSchedulesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.schedules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

## GetSchedulesByDate
You can execute the `GetSchedulesByDate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getSchedulesByDate(vars: GetSchedulesByDateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSchedulesByDateData, GetSchedulesByDateVariables>;

interface GetSchedulesByDateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchedulesByDateVariables): QueryRef<GetSchedulesByDateData, GetSchedulesByDateVariables>;
}
export const getSchedulesByDateRef: GetSchedulesByDateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSchedulesByDate(dc: DataConnect, vars: GetSchedulesByDateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSchedulesByDateData, GetSchedulesByDateVariables>;

interface GetSchedulesByDateRef {
  ...
  (dc: DataConnect, vars: GetSchedulesByDateVariables): QueryRef<GetSchedulesByDateData, GetSchedulesByDateVariables>;
}
export const getSchedulesByDateRef: GetSchedulesByDateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSchedulesByDateRef:
```typescript
const name = getSchedulesByDateRef.operationName;
console.log(name);
```

### Variables
The `GetSchedulesByDate` query requires an argument of type `GetSchedulesByDateVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSchedulesByDateVariables {
  tanggal: string;
}
```
### Return Type
Recall that executing the `GetSchedulesByDate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSchedulesByDateData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSchedulesByDateData {
  schedules: ({
    id: UUIDString;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    statusSlot: string;
  } & Schedule_Key)[];
}
```
### Using `GetSchedulesByDate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSchedulesByDate, GetSchedulesByDateVariables } from '@timeless-studio/dataconnect';

// The `GetSchedulesByDate` query requires an argument of type `GetSchedulesByDateVariables`:
const getSchedulesByDateVars: GetSchedulesByDateVariables = {
  tanggal: ..., 
};

// Call the `getSchedulesByDate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSchedulesByDate(getSchedulesByDateVars);
// Variables can be defined inline as well.
const { data } = await getSchedulesByDate({ tanggal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSchedulesByDate(dataConnect, getSchedulesByDateVars);

console.log(data.schedules);

// Or, you can use the `Promise` API.
getSchedulesByDate(getSchedulesByDateVars).then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

### Using `GetSchedulesByDate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSchedulesByDateRef, GetSchedulesByDateVariables } from '@timeless-studio/dataconnect';

// The `GetSchedulesByDate` query requires an argument of type `GetSchedulesByDateVariables`:
const getSchedulesByDateVars: GetSchedulesByDateVariables = {
  tanggal: ..., 
};

// Call the `getSchedulesByDateRef()` function to get a reference to the query.
const ref = getSchedulesByDateRef(getSchedulesByDateVars);
// Variables can be defined inline as well.
const ref = getSchedulesByDateRef({ tanggal: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSchedulesByDateRef(dataConnect, getSchedulesByDateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.schedules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

## ListVouchers
You can execute the `ListVouchers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listVouchers(options?: ExecuteQueryOptions): QueryPromise<ListVouchersData, undefined>;

interface ListVouchersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVouchersData, undefined>;
}
export const listVouchersRef: ListVouchersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVouchers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVouchersData, undefined>;

interface ListVouchersRef {
  ...
  (dc: DataConnect): QueryRef<ListVouchersData, undefined>;
}
export const listVouchersRef: ListVouchersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVouchersRef:
```typescript
const name = listVouchersRef.operationName;
console.log(name);
```

### Variables
The `ListVouchers` query has no variables.
### Return Type
Recall that executing the `ListVouchers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVouchersData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVouchersData {
  vouchers: ({
    id: UUIDString;
    kodeVoucher: string;
    tipeDiskon: string;
    nilaiDiskon: number;
    tglBerlaku: string;
    tglBerakhir: string;
    kuota: number;
  } & Voucher_Key)[];
}
```
### Using `ListVouchers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVouchers } from '@timeless-studio/dataconnect';


// Call the `listVouchers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVouchers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVouchers(dataConnect);

console.log(data.vouchers);

// Or, you can use the `Promise` API.
listVouchers().then((response) => {
  const data = response.data;
  console.log(data.vouchers);
});
```

### Using `ListVouchers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVouchersRef } from '@timeless-studio/dataconnect';


// Call the `listVouchersRef()` function to get a reference to the query.
const ref = listVouchersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVouchersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vouchers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vouchers);
});
```

## CheckVoucher
You can execute the `CheckVoucher` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
checkVoucher(vars: CheckVoucherVariables, options?: ExecuteQueryOptions): QueryPromise<CheckVoucherData, CheckVoucherVariables>;

interface CheckVoucherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckVoucherVariables): QueryRef<CheckVoucherData, CheckVoucherVariables>;
}
export const checkVoucherRef: CheckVoucherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
checkVoucher(dc: DataConnect, vars: CheckVoucherVariables, options?: ExecuteQueryOptions): QueryPromise<CheckVoucherData, CheckVoucherVariables>;

interface CheckVoucherRef {
  ...
  (dc: DataConnect, vars: CheckVoucherVariables): QueryRef<CheckVoucherData, CheckVoucherVariables>;
}
export const checkVoucherRef: CheckVoucherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the checkVoucherRef:
```typescript
const name = checkVoucherRef.operationName;
console.log(name);
```

### Variables
The `CheckVoucher` query requires an argument of type `CheckVoucherVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CheckVoucherVariables {
  kode: string;
}
```
### Return Type
Recall that executing the `CheckVoucher` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CheckVoucherData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CheckVoucherData {
  vouchers: ({
    id: UUIDString;
    kodeVoucher: string;
    tipeDiskon: string;
    nilaiDiskon: number;
    tglBerlaku: string;
    tglBerakhir: string;
    kuota: number;
  } & Voucher_Key)[];
}
```
### Using `CheckVoucher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, checkVoucher, CheckVoucherVariables } from '@timeless-studio/dataconnect';

// The `CheckVoucher` query requires an argument of type `CheckVoucherVariables`:
const checkVoucherVars: CheckVoucherVariables = {
  kode: ..., 
};

// Call the `checkVoucher()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await checkVoucher(checkVoucherVars);
// Variables can be defined inline as well.
const { data } = await checkVoucher({ kode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await checkVoucher(dataConnect, checkVoucherVars);

console.log(data.vouchers);

// Or, you can use the `Promise` API.
checkVoucher(checkVoucherVars).then((response) => {
  const data = response.data;
  console.log(data.vouchers);
});
```

### Using `CheckVoucher`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, checkVoucherRef, CheckVoucherVariables } from '@timeless-studio/dataconnect';

// The `CheckVoucher` query requires an argument of type `CheckVoucherVariables`:
const checkVoucherVars: CheckVoucherVariables = {
  kode: ..., 
};

// Call the `checkVoucherRef()` function to get a reference to the query.
const ref = checkVoucherRef(checkVoucherVars);
// Variables can be defined inline as well.
const ref = checkVoucherRef({ kode: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = checkVoucherRef(dataConnect, checkVoucherVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vouchers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vouchers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `timeless-studio-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreatePackage
You can execute the `CreatePackage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createPackage(vars: CreatePackageVariables): MutationPromise<CreatePackageData, CreatePackageVariables>;

interface CreatePackageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePackageVariables): MutationRef<CreatePackageData, CreatePackageVariables>;
}
export const createPackageRef: CreatePackageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPackage(dc: DataConnect, vars: CreatePackageVariables): MutationPromise<CreatePackageData, CreatePackageVariables>;

interface CreatePackageRef {
  ...
  (dc: DataConnect, vars: CreatePackageVariables): MutationRef<CreatePackageData, CreatePackageVariables>;
}
export const createPackageRef: CreatePackageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPackageRef:
```typescript
const name = createPackageRef.operationName;
console.log(name);
```

### Variables
The `CreatePackage` mutation requires an argument of type `CreatePackageVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePackageVariables {
  namaPaket: string;
  kategori: string;
  hargaDasar: number;
  durasiMenit: number;
  maksOrang: number;
  deskripsi: string;
  isPopular: boolean;
}
```
### Return Type
Recall that executing the `CreatePackage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePackageData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePackageData {
  package_insert: Package_Key;
}
```
### Using `CreatePackage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPackage, CreatePackageVariables } from '@timeless-studio/dataconnect';

// The `CreatePackage` mutation requires an argument of type `CreatePackageVariables`:
const createPackageVars: CreatePackageVariables = {
  namaPaket: ..., 
  kategori: ..., 
  hargaDasar: ..., 
  durasiMenit: ..., 
  maksOrang: ..., 
  deskripsi: ..., 
  isPopular: ..., 
};

// Call the `createPackage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPackage(createPackageVars);
// Variables can be defined inline as well.
const { data } = await createPackage({ namaPaket: ..., kategori: ..., hargaDasar: ..., durasiMenit: ..., maksOrang: ..., deskripsi: ..., isPopular: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPackage(dataConnect, createPackageVars);

console.log(data.package_insert);

// Or, you can use the `Promise` API.
createPackage(createPackageVars).then((response) => {
  const data = response.data;
  console.log(data.package_insert);
});
```

### Using `CreatePackage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPackageRef, CreatePackageVariables } from '@timeless-studio/dataconnect';

// The `CreatePackage` mutation requires an argument of type `CreatePackageVariables`:
const createPackageVars: CreatePackageVariables = {
  namaPaket: ..., 
  kategori: ..., 
  hargaDasar: ..., 
  durasiMenit: ..., 
  maksOrang: ..., 
  deskripsi: ..., 
  isPopular: ..., 
};

// Call the `createPackageRef()` function to get a reference to the mutation.
const ref = createPackageRef(createPackageVars);
// Variables can be defined inline as well.
const ref = createPackageRef({ namaPaket: ..., kategori: ..., hargaDasar: ..., durasiMenit: ..., maksOrang: ..., deskripsi: ..., isPopular: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPackageRef(dataConnect, createPackageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.package_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.package_insert);
});
```

## CreateSchedule
You can execute the `CreateSchedule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createSchedule(vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface CreateScheduleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
}
export const createScheduleRef: CreateScheduleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSchedule(dc: DataConnect, vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface CreateScheduleRef {
  ...
  (dc: DataConnect, vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
}
export const createScheduleRef: CreateScheduleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createScheduleRef:
```typescript
const name = createScheduleRef.operationName;
console.log(name);
```

### Variables
The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateScheduleVariables {
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  statusSlot: string;
}
```
### Return Type
Recall that executing the `CreateSchedule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateScheduleData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateScheduleData {
  schedule_insert: Schedule_Key;
}
```
### Using `CreateSchedule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSchedule, CreateScheduleVariables } from '@timeless-studio/dataconnect';

// The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`:
const createScheduleVars: CreateScheduleVariables = {
  tanggal: ..., 
  jamMulai: ..., 
  jamSelesai: ..., 
  statusSlot: ..., 
};

// Call the `createSchedule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSchedule(createScheduleVars);
// Variables can be defined inline as well.
const { data } = await createSchedule({ tanggal: ..., jamMulai: ..., jamSelesai: ..., statusSlot: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSchedule(dataConnect, createScheduleVars);

console.log(data.schedule_insert);

// Or, you can use the `Promise` API.
createSchedule(createScheduleVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_insert);
});
```

### Using `CreateSchedule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createScheduleRef, CreateScheduleVariables } from '@timeless-studio/dataconnect';

// The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`:
const createScheduleVars: CreateScheduleVariables = {
  tanggal: ..., 
  jamMulai: ..., 
  jamSelesai: ..., 
  statusSlot: ..., 
};

// Call the `createScheduleRef()` function to get a reference to the mutation.
const ref = createScheduleRef(createScheduleVars);
// Variables can be defined inline as well.
const ref = createScheduleRef({ tanggal: ..., jamMulai: ..., jamSelesai: ..., statusSlot: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createScheduleRef(dataConnect, createScheduleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_insert);
});
```

## UpdateScheduleStatus
You can execute the `UpdateScheduleStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
updateScheduleStatus(vars: UpdateScheduleStatusVariables): MutationPromise<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;

interface UpdateScheduleStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScheduleStatusVariables): MutationRef<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;
}
export const updateScheduleStatusRef: UpdateScheduleStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateScheduleStatus(dc: DataConnect, vars: UpdateScheduleStatusVariables): MutationPromise<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;

interface UpdateScheduleStatusRef {
  ...
  (dc: DataConnect, vars: UpdateScheduleStatusVariables): MutationRef<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;
}
export const updateScheduleStatusRef: UpdateScheduleStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateScheduleStatusRef:
```typescript
const name = updateScheduleStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateScheduleStatus` mutation requires an argument of type `UpdateScheduleStatusVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateScheduleStatusVariables {
  id: UUIDString;
  statusSlot: string;
}
```
### Return Type
Recall that executing the `UpdateScheduleStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateScheduleStatusData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateScheduleStatusData {
  schedule_update?: Schedule_Key | null;
}
```
### Using `UpdateScheduleStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateScheduleStatus, UpdateScheduleStatusVariables } from '@timeless-studio/dataconnect';

// The `UpdateScheduleStatus` mutation requires an argument of type `UpdateScheduleStatusVariables`:
const updateScheduleStatusVars: UpdateScheduleStatusVariables = {
  id: ..., 
  statusSlot: ..., 
};

// Call the `updateScheduleStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateScheduleStatus(updateScheduleStatusVars);
// Variables can be defined inline as well.
const { data } = await updateScheduleStatus({ id: ..., statusSlot: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateScheduleStatus(dataConnect, updateScheduleStatusVars);

console.log(data.schedule_update);

// Or, you can use the `Promise` API.
updateScheduleStatus(updateScheduleStatusVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_update);
});
```

### Using `UpdateScheduleStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateScheduleStatusRef, UpdateScheduleStatusVariables } from '@timeless-studio/dataconnect';

// The `UpdateScheduleStatus` mutation requires an argument of type `UpdateScheduleStatusVariables`:
const updateScheduleStatusVars: UpdateScheduleStatusVariables = {
  id: ..., 
  statusSlot: ..., 
};

// Call the `updateScheduleStatusRef()` function to get a reference to the mutation.
const ref = updateScheduleStatusRef(updateScheduleStatusVars);
// Variables can be defined inline as well.
const ref = updateScheduleStatusRef({ id: ..., statusSlot: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateScheduleStatusRef(dataConnect, updateScheduleStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_update);
});
```

## DeleteSchedule
You can execute the `DeleteSchedule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
deleteSchedule(vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface DeleteScheduleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
}
export const deleteScheduleRef: DeleteScheduleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSchedule(dc: DataConnect, vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface DeleteScheduleRef {
  ...
  (dc: DataConnect, vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
}
export const deleteScheduleRef: DeleteScheduleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteScheduleRef:
```typescript
const name = deleteScheduleRef.operationName;
console.log(name);
```

### Variables
The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteScheduleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSchedule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteScheduleData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteScheduleData {
  schedule_delete?: Schedule_Key | null;
}
```
### Using `DeleteSchedule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSchedule, DeleteScheduleVariables } from '@timeless-studio/dataconnect';

// The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`:
const deleteScheduleVars: DeleteScheduleVariables = {
  id: ..., 
};

// Call the `deleteSchedule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSchedule(deleteScheduleVars);
// Variables can be defined inline as well.
const { data } = await deleteSchedule({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSchedule(dataConnect, deleteScheduleVars);

console.log(data.schedule_delete);

// Or, you can use the `Promise` API.
deleteSchedule(deleteScheduleVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_delete);
});
```

### Using `DeleteSchedule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteScheduleRef, DeleteScheduleVariables } from '@timeless-studio/dataconnect';

// The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`:
const deleteScheduleVars: DeleteScheduleVariables = {
  id: ..., 
};

// Call the `deleteScheduleRef()` function to get a reference to the mutation.
const ref = deleteScheduleRef(deleteScheduleVars);
// Variables can be defined inline as well.
const ref = deleteScheduleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteScheduleRef(dataConnect, deleteScheduleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_delete);
});
```

## CreateBooking
You can execute the `CreateBooking` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookingRef:
```typescript
const name = createBookingRef.operationName;
console.log(name);
```

### Variables
The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookingVariables {
  kodeBooking: string;
  userId: string;
  packageId: UUIDString;
  scheduleId: UUIDString;
  totalHarga: number;
}
```
### Return Type
Recall that executing the `CreateBooking` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookingData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookingData {
  booking_insert: Booking_Key;
}
```
### Using `CreateBooking`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBooking, CreateBookingVariables } from '@timeless-studio/dataconnect';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  kodeBooking: ..., 
  userId: ..., 
  packageId: ..., 
  scheduleId: ..., 
  totalHarga: ..., 
};

// Call the `createBooking()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBooking(createBookingVars);
// Variables can be defined inline as well.
const { data } = await createBooking({ kodeBooking: ..., userId: ..., packageId: ..., scheduleId: ..., totalHarga: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBooking(dataConnect, createBookingVars);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
createBooking(createBookingVars).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

### Using `CreateBooking`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookingRef, CreateBookingVariables } from '@timeless-studio/dataconnect';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  kodeBooking: ..., 
  userId: ..., 
  packageId: ..., 
  scheduleId: ..., 
  totalHarga: ..., 
};

// Call the `createBookingRef()` function to get a reference to the mutation.
const ref = createBookingRef(createBookingVars);
// Variables can be defined inline as well.
const ref = createBookingRef({ kodeBooking: ..., userId: ..., packageId: ..., scheduleId: ..., totalHarga: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookingRef(dataConnect, createBookingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

