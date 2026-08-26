# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createPackage, createSchedule, updateScheduleStatus, deleteSchedule, createBooking, listPackages, getPackage, listAdditionalServices, listSchedules, getSchedulesByDate } from '@timeless-studio/dataconnect';


// Operation CreatePackage:  For variables, look at type CreatePackageVars in ../index.d.ts
const { data } = await CreatePackage(dataConnect, createPackageVars);

// Operation CreateSchedule:  For variables, look at type CreateScheduleVars in ../index.d.ts
const { data } = await CreateSchedule(dataConnect, createScheduleVars);

// Operation UpdateScheduleStatus:  For variables, look at type UpdateScheduleStatusVars in ../index.d.ts
const { data } = await UpdateScheduleStatus(dataConnect, updateScheduleStatusVars);

// Operation DeleteSchedule:  For variables, look at type DeleteScheduleVars in ../index.d.ts
const { data } = await DeleteSchedule(dataConnect, deleteScheduleVars);

// Operation CreateBooking:  For variables, look at type CreateBookingVars in ../index.d.ts
const { data } = await CreateBooking(dataConnect, createBookingVars);

// Operation ListPackages: 
const { data } = await ListPackages(dataConnect);

// Operation GetPackage:  For variables, look at type GetPackageVars in ../index.d.ts
const { data } = await GetPackage(dataConnect, getPackageVars);

// Operation ListAdditionalServices: 
const { data } = await ListAdditionalServices(dataConnect);

// Operation ListSchedules: 
const { data } = await ListSchedules(dataConnect);

// Operation GetSchedulesByDate:  For variables, look at type GetSchedulesByDateVars in ../index.d.ts
const { data } = await GetSchedulesByDate(dataConnect, getSchedulesByDateVars);


```