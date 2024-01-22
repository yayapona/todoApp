import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

const t = localStorage.getItem('TOKEN');

export const httpOptionsToken = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${t}`,
  }),
};
export const httpOptionsupload = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data; boundary=something',
    'Access-Control-Allow-Origin': '*',
  }),
};
export const httpOptionsPoi = {
  headers: new HttpHeaders({
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
  }),
};
