export const BASE_URL = "http://192.168.0.175:8080";
export const LOGIN_PATH = "/api/auth";
export const REGISTER_PATH = "/api/patient/register";

export const GET_PATIENTS_BY_DOCTOR_EMAIL = "/api/patient/byDoctorEmail/";

export const GET_DOCTOR_BY_ID = "/api/doctor/id/";
export const GET_DOCTOR_BY_EMAIL = "/api/doctor/byEmail/";

export const GET_PATIENT_BY_ID = "/api/patient/id/";
export const GET_PATIENT_BY_EMAIL = "/api/patient/byEmail/";

export const POST_PATIENT_GLUCOSE_START_TIMESTAMP = "/api/glucose/byTimestamp";

export const POST_GLUCOSE_SAVE = "/api/glucose/save";

export const POST_GLUCOSE_COMPUTE = "/api/glucose/compute";

export const PUT_UPDATE_DOCTOR = "/api/doctor/update/id/";
export const PUT_UPDATE_PATIENT = "/api/patient/update/id/";

export const DELETE_PATIENT_BY_ID = "/api/patient/delete/id/";
