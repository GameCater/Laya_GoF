{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "qolspto8",
      "_$type": "Sprite",
      "name": "Player",
      "x": 518,
      "y": 524,
      "width": 56,
      "height": 54,
      "_gcmds": [
        {
          "_$type": "DrawRectCmd",
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "percent": true,
          "lineWidth": 1,
          "lineColor": "#000000",
          "fillColor": "rgba(90, 95, 246, 1)"
        }
      ],
      "_$comp": [
        {
          "_$type": "a51a9993-7212-4529-af9d-4d56a3c8a7a3",
          "scriptPath": "../src/Player.ts",
          "speed": 5,
          "bulletPrefab": {
            "_$uuid": "f4214af3-a6b4-4c47-9a10-704468171dc9",
            "_$type": "Prefab"
          }
        },
        {
          "_$type": "RigidBody",
          "type": "kinematic",
          "linearVelocity": {
            "_$type": "Vector2"
          }
        },
        {
          "_$type": "BoxCollider",
          "isSensor": true
        }
      ],
      "_$child": [
        {
          "_$id": "ivoh7h8v",
          "_$prefab": "f4214af3-a6b4-4c47-9a10-704468171dc9",
          "name": "Bullet",
          "active": true,
          "x": 45,
          "y": 18,
          "width": 40,
          "height": 20,
          "pivotX": 0,
          "pivotY": 0,
          "scaleX": 1,
          "scaleY": 1,
          "skewX": 0,
          "skewY": 0,
          "rotation": 0,
          "visible": false,
          "alpha": 1,
          "zOrder": 0,
          "blendMode": null,
          "mouseEnabled": false,
          "mouseThrough": false,
          "hitTestPrior": false,
          "drawCallOptimize": false,
          "cacheAs": "none"
        }
      ]
    },
    {
      "_$id": "o0sovm7k",
      "_$type": "Sprite",
      "name": "Enemy",
      "x": 500,
      "y": 106,
      "width": 78,
      "height": 83,
      "_gcmds": [
        {
          "_$type": "DrawRectCmd",
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "percent": true,
          "lineWidth": 1,
          "lineColor": "#000000",
          "fillColor": "rgba(220, 29, 29, 1)"
        }
      ],
      "_$comp": [
        {
          "_$type": "12843c7a-55a3-4124-bf12-0e47353d5c5a",
          "scriptPath": "../src/Enemy.ts",
          "player": {
            "_$ref": "qolspto8"
          }
        }
      ]
    }
  ]
}