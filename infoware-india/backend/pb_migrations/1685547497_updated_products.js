migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  // remove
  collection.schema.removeField("eq5irxyx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bo9fn87x",
    "name": "images",
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

  // remove
  collection.schema.removeField("bo9fn87x")

  return dao.saveCollection(collection)
})
