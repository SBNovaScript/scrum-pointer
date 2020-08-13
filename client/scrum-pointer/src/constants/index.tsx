export const serverURL = 'http://localhost:3030';

export const githubURL = serverURL + '/oauth/github';
export const googleURL = serverURL + '/oauth/google';

export type Point = 1 | 3 | 5 | 8 | 13 | 21;

export const AllPoints: Array<Point> = [
    1,
    3,
    5,
    8,
    13,
    21
];