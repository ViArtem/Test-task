### Tests project

#### Stacks

1. express
2. mongoDB (mongoose)
3. xml2js
4. body-parser
5. joi

---

#### Functionality

The server can store, delete, edit, and retrieve car data.

Data format for sending to the server: xml, json.
Data format returned by the server: json.

Number of records in the database per request: not limited.

---

### Quick start

#### Start the server:

```JS
npm install
```

```JS
node src/server.js
```

---

### Example of the request format

#### Create car (Method: post)

`Json:`

```JSON
{
    "Date": "31.02.2023",
    "BrandName": "Ferrari",
    "Price": 44000
}
```

```JSON
{}  // Default value will be automatically set on the server
```

`XML:`

```XML
<Document>
  <Car>
    <Date>10.01.2004</Date>
    <BrandName>Alpha Romeo Brera</BrandName>
    <Price>5000</Price>
  </Car>
  <Car>
    <Date>11.10.2008</Date>
    <BrandName>Honda Accord</BrandName>
    <Price>10000</Price>
  </Car>
</Document>
```

```XML
<Document>
  <Car>
    <Date>11.10.2008</Date>
    <BrandName>Alpha Romeo Brera</BrandName>
    <Price>7700</Price>
  </Car>
</Document>
```

```XML
<Document>
<!-- Default value will be automatically set on the server -->
</Document>
```

#### Edit car (Method: put)

`Json:`

```JSON
{
    "Id": "64fdc873bcdc8e74ac0aaf53",
    "Date": "31.02.2023",
    "BrandName": "Ferrari",
    "Price": 44000
}
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
        "Date": "31.02.2023",
        "BrandName": "Ferrari",
        "Price": 44000
    }
]
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
        "Date": "31.02.2023",
        "BrandName": "Ferrari",
        "Price": 44000
    },
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
        "Date": "31.02.2023",
        "BrandName": "Ferrari",
        "Price": 44000
    }
    // Unlimited number of Car objects
]
```

`XML:`

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6858b</Id>
    <Date>11.10.2008</Date>
    <BrandName>Alpha Romeo Brera</BrandName>
    <Price>7700</Price>
  </Car>
</Document>
```

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6855b</Id>
    <Date>10.01.2004</Date>
    <BrandName>Alpha Romeo Brera</BrandName>
    <Price>5000</Price>
  </Car>
    <Car>
    <Id>64fdc873bcdc8e74ac0aaf52</Id>
    <Date>11.10.2008</Date>
    <BrandName>Honda Accord</BrandName>
    <Price>10000</Price>
  </Car>

  <!-- Unlimited number of Car tags -->
</Document>
```

#### Delete car (Method: delete)

`Json:`

```JSON
{
    "Id": "64fdc873bcdc8e74ac0aaf53",
}
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    }
]
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    },
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    }

    // Unlimit
]
```

`XML:`

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6858b</Id>
  </Car>
</Document>
```

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6858b</Id>
    <Id>64fd8fa48274aa36b6e6858b</Id>
  </Car>
</Document>
```

#### Get car by Id (Method: get)

`Json:`

```JSON
{
    "Id": "64fdc873bcdc8e74ac0aaf53",
}
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    }
]
```

```JSON
[
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    },
    {
        "Id": "64fdc873bcdc8e74ac0aaf53",
    }

    // Unlimit
]
```

`XML:`

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6858b</Id>
  </Car>
</Document>
```

```XML
<Document>
  <Car>
    <Id>64fd8fa48274aa36b6e6858b</Id>
    <Id>64fd8fa48274aa36b6e6858b</Id>
  </Car>
</Document>
```
