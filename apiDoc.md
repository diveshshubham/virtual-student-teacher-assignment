# virtual class

##

> teacher registers

```json - body
{
  "teacherName": "Shubham",
  "teacherMail": "divesh.shubham154+12@gmail.com",
  "password": "1234",
  "about": "T1",
  "dob": "1990-01-09",
  "gender": "MALE",
  "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
}
```

```json - response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjc5OTk5MDMzNzFlYWJkNGQ4ZDNmNiIsImlhdCI6MTY2MzUzOTYwOSwiZXhwIjoxNjYzNjI2MDA5fQ.XX3e3VR356yIK4D4hKuLGPbxkh8f9k-S4euOAcu9jpk",
  "message": "teacher registered"
}
```

Authentication Required : No

This endpoint will registers a new teahcer

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/register`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| teacherName | string | Yes      |             |
| teacherMail | string | Yes      |             |
| password    | string | Yes      |             |
| dob         | Date   | Yes      |             |
| about       | string | Yes      |             |
| gender      | string | Yes      |             |
| avatar      | string | No       |             |

### Headers Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| apikey    | string | Yes      | 123         |

##

> teacher login

```json req body
{
  "teacherMail": "divesh.shubham154+12@gmail.com",
  "password": "1234"
}
```

```json res body
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjc5OTk5MDMzNzFlYWJkNGQ4ZDNmNiIsImlhdCI6MTY2MzUzOTg3NSwiZXhwIjoxNjYzNjI2Mjc1fQ.8bTV_AC17GP5bhzuaD5V6llepQmnfYcWXetZUX4BcRA",
  "responseObj": {
    "teacherMail": "divesh.shubham154+12@gmail.com",
    "teacherName": "Shubham"
  }
}
```

Authentication Required : No

This endpoint will login the teacher

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/login`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| teacherMail | string | Yes      |             |
| password    | string | Yes      |             |

### Headers Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| apikey    | String | Yes      | 123         |

##

> logout teacher

```json req body

```

```json req body
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsImlhdCI6MTY2MzU0MDA4NiwiZXhwIjoxNjYzNTQwMDg3fQ.pON0ph27t2cv1A8kXVScRteY0lJIjg0QGKDE_B8m8To"
}
```

Authentication Required : Yea

This endpoint will logout the teacher

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/logout`

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> student registers

```json - body
{
  "studentName": "shivali",
  "studentMail": "divesh.shubham+12@gmail.com",
  "password": "1234",
  "about": "s12 ",
  "dob": "1990-09-09",
  "gender": "FEMALE",
  "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
}
```

```json - response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjc5ZDlmMDMzNzFlYWJkNGQ4ZDQxZiIsImlhdCI6MTY2MzU0MDYzOSwiZXhwIjoxNjYzNjI3MDM5fQ.PPZ1LT17D22BSqZz2w3oNQABw5eetr9zvpRxpqhjgEk",
  "message": "student registered"
}
```

Authentication Required : No

This endpoint will registers a new student

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/register`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| studentName | string | Yes      |             |
| studentMail | string | Yes      |             |
| password    | string | Yes      |             |
| dob         | Date   | Yes      |             |
| about       | string | Yes      |             |
| gender      | string | Yes      |             |
| avatar      | string | No       |             |

### Headers Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| apikey    | string | Yes      | 123         |

##

> student login

```json req body
{
  "studentMail": "divesh.shubham+12@gmail.com",
  "password": "1234"
}
```

```json res body
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjc5ZDlmMDMzNzFlYWJkNGQ4ZDQxZiIsImlhdCI6MTY2MzU0MDc4OSwiZXhwIjoxNjYzNjI3MTg5fQ.vEvU0WVBfOibQ0i0FwvqC35AjVVcEnWmjsTowntqVDY",
  "responseObj": {
    "studentMail": "divesh.shubham+12@gmail.com",
    "studentName": "shivali"
  }
}
```

Authentication Required : No

This endpoint will login the student

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/student/login`

##

> logout student

```json req body

```

```json req body
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsImlhdCI6MTY2MzU0MDA4NiwiZXhwIjoxNjYzNTQwMDg3fQ.pON0ph27t2cv1A8kXVScRteY0lJIjg0QGKDE_B8m8To"
}
```

Authentication Required : Yea

This endpoint will logout the student

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/student/logout`

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| studentMail | string | Yes      |             |
| password    | string | Yes      |             |

##

> teacher creates assignment

```json - body
{
  "subjectId": "6327a01903371eabd4d8d426",
  "description": "applications of ascal law",
  "isPublished": true,
  "endDate": "2022-09-24",
  "startDate": "2022-09-21",
  "assignmentTitle": "pascal law application",
  "attachments": [
    "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
  ]
}
```

```json - response
{
  "msg": "assignmet created",
  "newAssignment": {
    "subjectId": "6327a01903371eabd4d8d426",
    "createdBy": "6327999903371eabd4d8d3f6",
    "assignmentTitle": "pascal law application",
    "description": "applications of ascal law",
    "attachments": [
      "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
    ],
    "isPublished": true,
    "startDate": "2022-09-18T23:13:59.341Z",
    "endDate": "2022-09-24T00:00:00.000Z",
    "isDeleted": false,
    "_id": "6327a637c8eb7e28a536e336",
    "updatedAt": "2022-09-18T23:13:59.343Z",
    "createdAt": "2022-09-18T23:13:59.344Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will create a new assignment

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/createAssignment`

### Body Parameters

| Parameter       | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| subjectId       | string | Yes      |             |
| description     | string | Yes      |             |
| isPublished     | string | Yes      |             |
| endDate         | Date   | Yes      |             |
| startDate       | Date   | Yes      |             |
| assignmentTitle | string | Yes      |             |
| attachments     | Array  | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> teacher updates assignment

```json - body
{
  "subjectId": "6325f6e363dba5d672387602",
  "description": "derive pascal law",
  "isPublished": true,
  "endDate": "2022-10-17",
  "startDate": "2022-09-27",
  "assignmentTitle": "new bernoullis pascal",
  "attachments": ["array"]
}
```

```json - response
{
  "msg": "assignmet updated"
}
```

Authentication Required : Yes

This endpoint will update assignment by its id

### HTTP Request

`PUT https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/editAssignment/{assignmentId}`

### Body Parameters

| Parameter       | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| subjectId       | string | Yes      |             |
| description     | string | Yes      |             |
| isPublished     | string | Yes      |             |
| endDate         | Date   | Yes      |             |
| startDate       | Date   | Yes      |             |
| assignmentTitle | string | Yes      |             |
| attachments     | Array  | No       |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### Path Parameters

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| assignmentId | String | Yes      |             |

##

> teacher gets assignment with filter SCHEDULED

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a637c8eb7e28a536e336",
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "createdBy": "6327999903371eabd4d8d3f6",
      "assignmentTitle": "new bernoullis pascal",
      "description": "derive pascal law",
      "attachments": [
        "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
      ],
      "isPublished": true,
      "startDate": "2022-09-27T00:00:00.000Z",
      "endDate": "2022-10-17T00:00:00.000Z",
      "isDeleted": false,
      "updatedAt": "2022-09-18T23:25:12.718Z",
      "createdAt": "2022-09-18T23:13:59.344Z",
      "__v": 0
    },
    {
      "_id": "6327a34a03371eabd4d8d458",
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "createdBy": "6327999903371eabd4d8d3f6",
      "assignmentTitle": "pascal law application",
      "description": "applications of ascal law",
      "attachments": [
        "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
      ],
      "isPublished": false,
      "startDate": "2022-09-21T00:00:00.000Z",
      "endDate": "2022-09-24T00:00:00.000Z",
      "isDeleted": false,
      "updatedAt": "2022-09-18T23:01:30.458Z",
      "createdAt": "2022-09-18T23:01:30.458Z",
      "__v": 0
    }
  ],
  "totalCount": 2
}
```

Authentication Required : Yes

This endpoint will fetches assignment by teacher with filter SCHEDULED

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/getAll?pageIndex=1&perPage=25&filter=SCHEDULED`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> teacher gets assignment with filter SCHEDULED

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44a",
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "createdBy": "6327999903371eabd4d8d3f6",
      "assignmentTitle": "pascal law overview",
      "description": "learn pascal law",
      "attachments": [
        "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
      ],
      "isPublished": true,
      "startDate": "2022-09-18T22:58:10.361Z",
      "endDate": "2022-09-20T00:00:00.000Z",
      "isDeleted": false,
      "updatedAt": "2022-09-18T22:58:10.363Z",
      "createdAt": "2022-09-18T22:58:10.363Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will fetches assignment by teacher with filter ONGOING

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/getAll?pageIndex=1&perPage=25&filter=ONGOING`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> teacher gets assignment with by its id

```json - body

```

```json - response
{
  "data": {
    "_id": "6327a28203371eabd4d8d44a",
    "subjectId": {
      "_id": "6327a01903371eabd4d8d426",
      "subjectName": "FLUID MECHANICS"
    },
    "createdBy": "6327999903371eabd4d8d3f6",
    "assignmentTitle": "pascal law overview",
    "description": "learn pascal law",
    "attachments": [
      "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
    ],
    "isPublished": true,
    "startDate": "2022-09-18T22:58:10.361Z",
    "endDate": "2022-09-20T00:00:00.000Z",
    "isDeleted": false,
    "updatedAt": "2022-09-18T22:58:10.363Z",
    "createdAt": "2022-09-18T22:58:10.363Z",
    "__v": 0
  }
}
```

Authentication Required : Yes

This endpoint will fetches assignment by its id

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/{assignmentId}`

### Path Parameters

| Parameter   | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| assinmentId | objectId | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

##

> teacher gets assignment staus with status PENDING by assignment id

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44f",
      "studentId": {
        "_id": "63279cfd03371eabd4d8d404",
        "studentName": "sheetal",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentId": {
        "_id": "6327a28203371eabd4d8d44a",
        "description": "learn pascal law",
        "startDate": "2022-09-18T22:58:10.361Z",
        "endDate": "2022-09-20T00:00:00.000Z"
      },
      "attachments": [],
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "teacherId": "6327999903371eabd4d8d3f6",
      "publishedAt": "2022-09-18T22:58:10.361Z",
      "status": "PENDING",
      "isCompleted": false,
      "endDate": "2022-09-18T00:00:00.000Z",
      "createdAt": "2022-09-18T22:58:10.962Z",
      "updatedAt": "2022-09-18T22:58:10.964Z",
      "__v": 0
    },
    {
      "_id": "6327a28203371eabd4d8d450",
      "studentId": {
        "_id": "63279d6503371eabd4d8d413",
        "studentName": "visahali",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentId": {
        "_id": "6327a28203371eabd4d8d44a",
        "description": "learn pascal law",
        "startDate": "2022-09-18T22:58:10.361Z",
        "endDate": "2022-09-20T00:00:00.000Z"
      },
      "attachments": [],
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "teacherId": "6327999903371eabd4d8d3f6",
      "publishedAt": "2022-09-18T22:58:10.361Z",
      "status": "PENDING",
      "isCompleted": false,
      "endDate": "2022-09-20T00:00:00.000Z",
      "createdAt": "2022-09-18T22:58:10.962Z",
      "updatedAt": "2022-09-18T22:58:10.964Z",
      "__v": 0
    },
    {
      "_id": "6327a28203371eabd4d8d451",
      "studentId": {
        "_id": "63279d7303371eabd4d8d416",
        "studentName": "varsha",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentId": {
        "_id": "6327a28203371eabd4d8d44a",
        "description": "learn pascal law",
        "startDate": "2022-09-18T22:58:10.361Z",
        "endDate": "2022-09-20T00:00:00.000Z"
      },
      "attachments": [],
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "teacherId": "6327999903371eabd4d8d3f6",
      "publishedAt": "2022-09-18T22:58:10.361Z",
      "status": "PENDING",
      "isCompleted": false,
      "endDate": "2022-09-20T00:00:00.000Z",
      "createdAt": "2022-09-18T22:58:10.963Z",
      "updatedAt": "2022-09-18T22:58:10.964Z",
      "__v": 0
    }
  ],
  "totalCount": 3
}
```

Authentication Required : Yes

This endpoint will fetches assignment status by assignmentId with status PENDING

### HTTP Request

`POST https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/status/{assignmentId}?pageIndex=1&perPage=25&filter=PENDING`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      |             |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### path Parameters

| Parameter    | Type      | Required | Description |
| ------------ | --------- | -------- | ----------- |
| assignmentId | object id | Yes      |             |

##

> teacher gets assignment staus with status OVERDUE by assignment id

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44f",
      "studentId": {
        "_id": "63279cfd03371eabd4d8d404",
        "studentName": "sheetal",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentId": {
        "_id": "6327a28203371eabd4d8d44a",
        "description": "learn pascal law",
        "startDate": "2022-09-18T22:58:10.361Z",
        "endDate": "2022-09-20T00:00:00.000Z"
      },
      "attachments": [],
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "teacherId": "6327999903371eabd4d8d3f6",
      "publishedAt": "2022-09-18T22:58:10.361Z",
      "status": "PENDING",
      "isCompleted": false,
      "endDate": "2022-09-18T00:00:00.000Z",
      "createdAt": "2022-09-18T22:58:10.962Z",
      "updatedAt": "2022-09-18T22:58:10.964Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will fetches assignment status by assignmentId with status OVERDUE

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/status/{assignmentId}?pageIndex=1&perPage=25&filter=OVERDUE`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      | OVERDUE     |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### path Parameters

| Parameter    | Type      | Required | Description |
| ------------ | --------- | -------- | ----------- |
| assignmentId | object id | Yes      |             |

##

> teacher gets assignment staus with status SUBMITTED by assignment id

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44e",
      "studentId": {
        "_id": "63279cd903371eabd4d8d401",
        "studentName": "Sanya",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentId": {
        "_id": "6327a28203371eabd4d8d44a",
        "description": "learn pascal law",
        "startDate": "2022-09-18T22:58:10.361Z",
        "endDate": "2022-09-20T00:00:00.000Z"
      },
      "attachments": [],
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "teacherId": "6327999903371eabd4d8d3f6",
      "publishedAt": "2022-09-18T22:58:10.361Z",
      "status": "SUBMITTED",
      "isCompleted": true,
      "endDate": "2022-09-20T00:00:00.000Z",
      "createdAt": "2022-09-18T22:58:10.962Z",
      "updatedAt": "2022-09-18T22:58:10.964Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will fetches assignment status by assignmentId with status SUBMITTED

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/teacher/assignment/status/{assignmentId}?pageIndex=1&perPage=25&filter=OVERDUE`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      | SUBMITTED   |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### path Parameters

| Parameter    | Type      | Required | Description |
| ------------ | --------- | -------- | ----------- |
| assignmentId | object id | Yes      |             |

##

> student gets assignment list with filter ONGOING by teacherId and subjectId

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44a",
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "createdBy": {
        "_id": "6327999903371eabd4d8d3f6",
        "teacherName": "Shubham",
        "teacherMail": "divesh.shubham154+12@gmail.com",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentTitle": "pascal law overview",
      "description": "learn pascal law",
      "attachments": [
        "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
      ],
      "isPublished": true,
      "startDate": "2022-09-18T22:58:10.361Z",
      "endDate": "2022-09-20T00:00:00.000Z",
      "isDeleted": false,
      "updatedAt": "2022-09-18T22:58:10.363Z",
      "createdAt": "2022-09-18T22:58:10.363Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will assignment list with filter ONGOING by teacherId and subjectId

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/student/assignment/getAll/{teacherId}/{subjectId}?pageIndex=1&perPage=25&filter=ONGOING`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      | SUBMITTED   |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### path Parameters

| Parameter | Type      | Required | Description |
| --------- | --------- | -------- | ----------- |
| teacherId | object id | Yes      |             |
| subjectId | object id | Yes      |             |

##

> student gets assignment list with filter ONGOING by teacherId and subjectId

```json - body

```

```json - response
{
  "data": [
    {
      "_id": "6327a28203371eabd4d8d44a",
      "subjectId": {
        "_id": "6327a01903371eabd4d8d426",
        "subjectName": "FLUID MECHANICS"
      },
      "createdBy": {
        "_id": "6327999903371eabd4d8d3f6",
        "teacherName": "Shubham",
        "teacherMail": "divesh.shubham154+12@gmail.com",
        "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
      },
      "assignmentTitle": "pascal law overview",
      "description": "learn pascal law",
      "attachments": [
        "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/sweden%20(copy).json?generation=1663512484795480&alt=media"
      ],
      "isPublished": true,
      "startDate": "2022-09-18T22:58:10.361Z",
      "endDate": "2022-09-20T00:00:00.000Z",
      "isDeleted": false,
      "updatedAt": "2022-09-18T22:58:10.363Z",
      "createdAt": "2022-09-18T22:58:10.363Z",
      "__v": 0
    }
  ],
  "totalCount": 1
}
```

Authentication Required : Yes

This endpoint will assignment by its id

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/student/assignment/{assignmentId}`

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |

### path Parameters

| Parameter    | Type      | Required | Description |
| ------------ | --------- | -------- | ----------- |
| assignmentId | object id | Yes      |             |


##

> student gets assignment status with filter PENDING 

```json - body

```

```json - response
{
    "data": [
        {
            "_id": "6327a28203371eabd4d8d454",
            "studentId": "63279d9f03371eabd4d8d41f",
            "assignmentId": {
                "_id": "6327a28203371eabd4d8d44a",
                "assignmentTitle": "pascal law overview",
                "description": "learn pascal law",
                "startDate": "2022-09-18T22:58:10.361Z",
                "endDate": "2022-09-20T00:00:00.000Z"
            },
            "attachments": [],
            "subjectId": {
                "_id": "6327a01903371eabd4d8d426",
                "subjectName": "FLUID MECHANICS"
            },
            "teacherId": {
                "_id": "6327999903371eabd4d8d3f6",
                "teacherName": "Shubham",
                "teacherMail": "divesh.shubham154+12@gmail.com",
                "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
            },
            "publishedAt": "2022-09-18T22:58:10.361Z",
            "status": "PENDING",
            "isCompleted": false,
            "endDate": "2022-09-20T00:00:00.000Z",
            "createdAt": "2022-09-18T22:58:10.963Z",
            "updatedAt": "2022-09-18T22:58:10.965Z",
            "__v": 0
        }
    ],
    "totalCount": 1
}
```

Authentication Required : Yes

This endpoint fetches student's  assignment status with filter PENDING 

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/student/myAssignments/status?pageIndex=1&perPage=25&filter=PENDING`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      | PENDING   |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |


##

> student gets assignment status with filter PENDING 

```json - body

```

```json - response
{
    "data": [
        {
            "_id": "6327a637c8eb7e28a536e340",
            "studentId": "63279d9f03371eabd4d8d41f",
            "assignmentId": {
                "_id": "6327a637c8eb7e28a536e336",
                "assignmentTitle": "new bernoullis pascal",
                "description": "derive pascal law",
                "startDate": "2022-09-27T00:00:00.000Z",
                "endDate": "2022-10-17T00:00:00.000Z"
            },
            "attachments": [],
            "subjectId": {
                "_id": "6327a01903371eabd4d8d426",
                "subjectName": "FLUID MECHANICS"
            },
            "teacherId": {
                "_id": "6327999903371eabd4d8d3f6",
                "teacherName": "Shubham",
                "teacherMail": "divesh.shubham154+12@gmail.com",
                "avatar": "https://storage.googleapis.com/download/storage/v1/b/minisocialmedia-1c24f.appspot.com/o/Screenshot%20from%202022-09-16%2002-17-06.png?generation=1663539582703582&alt=media"
            },
            "publishedAt": "2022-09-18T23:13:59.341Z",
            "status": "SUBMITTED",
            "isCompleted": true,
            "endDate": "2022-10-17T00:00:00.000Z",
            "createdAt": "2022-09-18T23:13:59.941Z",
            "updatedAt": "2022-09-18T23:25:13.303Z",
            "__v": 0
        }
    ],
    "totalCount": 1
}
```

Authentication Required : Yes

This endpoint fetches student's  assignment status with filter SUBMITTED 

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/student/myAssignments/status?pageIndex=1&perPage=25&filter=SUBMITTED`

### query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| pageIndex | Number | Yes      |             |
| perPage   | Number | Yes      |             |
| filter    | string | Yes      | SUBMITTED   |

### Headers Parameters

| Parameter     | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| apikey        | String | Yes      | 123            |
| Authorization | String | Yes      | Bearer {token} |


##

> student submits assignments 

```json - body
{
    "status":"SUBMITTED",
    "attachments":["some file's link"]
}
```

```json - response
{
    "msg": "assignment submitted"
}
```

Authentication Required : Yes

This endpoint will let student submit assignment

### HTTP Request

`PUT https://shubham-virtual-assignment.herokuapp.com/student/assignment/{assignment_map_id}`

### Body Parameters

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| status | string | Yes      |             |
| attachments | array | No      |             |


### Headers Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| apikey    | string | Yes      | 123         |
| Authorization | String | Yes      | Bearer {token} |



##

> remind teacher for publishing assignment

```json - body
```

```json - response
{
    "msg": "reminder sent"
}
```


This endpoint will remind teacher for publishing assignment

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/notify/teacher/reminder`


##

> to remind student about end date


This endpoint will remind for end date

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/notify/endDate`


##

> auto publish assinment on scheduled date


This endpoint will auto publish assinment on scheduled date

### HTTP Request

`GET https://shubham-virtual-assignment.herokuapp.com/notify/autoPublish`






