migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2uxs82qz",
    "name": "price",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eyozg8yy",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eq5irxyx",
    "name": "images",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "08d8ccvr",
    "name": "category",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  // remove
  collection.schema.removeField("2uxs82qz")

  // remove
  collection.schema.removeField("eyozg8yy")

  // remove
  collection.schema.removeField("eq5irxyx")

  // remove
  collection.schema.removeField("08d8ccvr")

  return dao.saveCollection(collection)
})
