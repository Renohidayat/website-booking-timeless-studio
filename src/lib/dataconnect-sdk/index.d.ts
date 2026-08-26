import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AdditionalService_Key {
  id: UUIDString;
  __typename?: 'AdditionalService_Key';
}

export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

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

export interface CheckVoucherVariables {
  kode: string;
}

export interface CreateBookingData {
  booking_insert: Booking_Key;
}

export interface CreateBookingVariables {
  kodeBooking: string;
  userId: string;
  packageId: UUIDString;
  scheduleId: UUIDString;
  totalHarga: number;
}

export interface CreatePackageData {
  package_insert: Package_Key;
}

export interface CreatePackageVariables {
  namaPaket: string;
  kategori: string;
  hargaDasar: number;
  durasiMenit: number;
  maksOrang: number;
  deskripsi: string;
  isPopular: boolean;
}

export interface CreateScheduleData {
  schedule_insert: Schedule_Key;
}

export interface CreateScheduleVariables {
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  statusSlot: string;
}

export interface DeleteScheduleData {
  schedule_delete?: Schedule_Key | null;
}

export interface DeleteScheduleVariables {
  id: UUIDString;
}

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

export interface GetPackageVariables {
  id: UUIDString;
}

export interface GetSchedulesByDateData {
  schedules: ({
    id: UUIDString;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    statusSlot: string;
  } & Schedule_Key)[];
}

export interface GetSchedulesByDateVariables {
  tanggal: string;
}

export interface ListAdditionalServicesData {
  additionalServices: ({
    id: UUIDString;
    namaLayanan: string;
    hargaSatuan: number;
  } & AdditionalService_Key)[];
}

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

export interface ListSchedulesData {
  schedules: ({
    id: UUIDString;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    statusSlot: string;
  } & Schedule_Key)[];
}

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

export interface Package_Key {
  id: UUIDString;
  __typename?: 'Package_Key';
}

export interface Schedule_Key {
  id: UUIDString;
  __typename?: 'Schedule_Key';
}

export interface UpdateScheduleStatusData {
  schedule_update?: Schedule_Key | null;
}

export interface UpdateScheduleStatusVariables {
  id: UUIDString;
  statusSlot: string;
}

export interface Voucher_Key {
  id: UUIDString;
  __typename?: 'Voucher_Key';
}

interface CreatePackageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePackageVariables): MutationRef<CreatePackageData, CreatePackageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePackageVariables): MutationRef<CreatePackageData, CreatePackageVariables>;
  operationName: string;
}
export const createPackageRef: CreatePackageRef;

export function createPackage(vars: CreatePackageVariables): MutationPromise<CreatePackageData, CreatePackageVariables>;
export function createPackage(dc: DataConnect, vars: CreatePackageVariables): MutationPromise<CreatePackageData, CreatePackageVariables>;

interface CreateScheduleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
  operationName: string;
}
export const createScheduleRef: CreateScheduleRef;

export function createSchedule(vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;
export function createSchedule(dc: DataConnect, vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface UpdateScheduleStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScheduleStatusVariables): MutationRef<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateScheduleStatusVariables): MutationRef<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;
  operationName: string;
}
export const updateScheduleStatusRef: UpdateScheduleStatusRef;

export function updateScheduleStatus(vars: UpdateScheduleStatusVariables): MutationPromise<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;
export function updateScheduleStatus(dc: DataConnect, vars: UpdateScheduleStatusVariables): MutationPromise<UpdateScheduleStatusData, UpdateScheduleStatusVariables>;

interface DeleteScheduleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
  operationName: string;
}
export const deleteScheduleRef: DeleteScheduleRef;

export function deleteSchedule(vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;
export function deleteSchedule(dc: DataConnect, vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface CreateBookingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  operationName: string;
}
export const createBookingRef: CreateBookingRef;

export function createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;
export function createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface ListPackagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPackagesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPackagesData, undefined>;
  operationName: string;
}
export const listPackagesRef: ListPackagesRef;

export function listPackages(options?: ExecuteQueryOptions): QueryPromise<ListPackagesData, undefined>;
export function listPackages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPackagesData, undefined>;

interface GetPackageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPackageVariables): QueryRef<GetPackageData, GetPackageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPackageVariables): QueryRef<GetPackageData, GetPackageVariables>;
  operationName: string;
}
export const getPackageRef: GetPackageRef;

export function getPackage(vars: GetPackageVariables, options?: ExecuteQueryOptions): QueryPromise<GetPackageData, GetPackageVariables>;
export function getPackage(dc: DataConnect, vars: GetPackageVariables, options?: ExecuteQueryOptions): QueryPromise<GetPackageData, GetPackageVariables>;

interface ListAdditionalServicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAdditionalServicesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAdditionalServicesData, undefined>;
  operationName: string;
}
export const listAdditionalServicesRef: ListAdditionalServicesRef;

export function listAdditionalServices(options?: ExecuteQueryOptions): QueryPromise<ListAdditionalServicesData, undefined>;
export function listAdditionalServices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAdditionalServicesData, undefined>;

interface ListSchedulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSchedulesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSchedulesData, undefined>;
  operationName: string;
}
export const listSchedulesRef: ListSchedulesRef;

export function listSchedules(options?: ExecuteQueryOptions): QueryPromise<ListSchedulesData, undefined>;
export function listSchedules(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSchedulesData, undefined>;

interface GetSchedulesByDateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchedulesByDateVariables): QueryRef<GetSchedulesByDateData, GetSchedulesByDateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSchedulesByDateVariables): QueryRef<GetSchedulesByDateData, GetSchedulesByDateVariables>;
  operationName: string;
}
export const getSchedulesByDateRef: GetSchedulesByDateRef;

export function getSchedulesByDate(vars: GetSchedulesByDateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSchedulesByDateData, GetSchedulesByDateVariables>;
export function getSchedulesByDate(dc: DataConnect, vars: GetSchedulesByDateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSchedulesByDateData, GetSchedulesByDateVariables>;

interface ListVouchersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVouchersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVouchersData, undefined>;
  operationName: string;
}
export const listVouchersRef: ListVouchersRef;

export function listVouchers(options?: ExecuteQueryOptions): QueryPromise<ListVouchersData, undefined>;
export function listVouchers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVouchersData, undefined>;

interface CheckVoucherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckVoucherVariables): QueryRef<CheckVoucherData, CheckVoucherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CheckVoucherVariables): QueryRef<CheckVoucherData, CheckVoucherVariables>;
  operationName: string;
}
export const checkVoucherRef: CheckVoucherRef;

export function checkVoucher(vars: CheckVoucherVariables, options?: ExecuteQueryOptions): QueryPromise<CheckVoucherData, CheckVoucherVariables>;
export function checkVoucher(dc: DataConnect, vars: CheckVoucherVariables, options?: ExecuteQueryOptions): QueryPromise<CheckVoucherData, CheckVoucherVariables>;

