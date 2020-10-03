export const serverURL = 'http://localhost:3030';

export const githubURL = serverURL + '/oauth/github';
export const googleURL = serverURL + '/oauth/google';

export type Point = 1 | 2 | 3 | 5 | 8 | 13 | 21;

export const INVALID_POINT = -1;

export const INVALID_TITLE = '';

export const AllPoints: Array<Point> = [
    1,
    2,
    3,
    5,
    8,
    13,
    21
];