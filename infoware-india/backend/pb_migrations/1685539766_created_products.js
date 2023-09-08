migrate((db) => {
  const collection = new Collection({
    "id": "zdx1vy7mbiz65ib",
    "created": "2023-05-31 13:29:26.466Z",
    "updated": "2023-05-31 13:29:26.466Z",
    "name": "products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k1i7zolo",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib");

  return dao.deleteCollection(collection);
})
