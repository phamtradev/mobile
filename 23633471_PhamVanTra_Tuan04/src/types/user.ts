/**
 * Kiểu dữ liệu suy ra từ JSON của https://jsonplaceholder.typicode.com/users/1
 * Cấu trúc lồng nhau nên tách thành nhiều interface nhỏ thay vì một interface phẳng.
 */

export interface GeoLocation {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
}
