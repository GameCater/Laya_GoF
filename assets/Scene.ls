{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://f93993db-43e8-4700-a9dc-bcbdf7a23edb",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "7bad1742-6eed-4d8d-81c0-501dc5bf03d6",
      "scriptPath": "../src/Main.ts",
      "sceenCamera": {
        "_$ref": "ymscbqms"
      },
      "player": {
        "_$ref": "qolspto8"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "s2xc5md2",
      "_$type": "VBox",
      "name": "VBox",
      "x": 1720,
      "y": 190,
      "width": 200,
      "height": 700,
      "mouseEnabled": true,
      "bgColor": "rgba(213, 186, 99, 1)",
      "space": 0,
      "align": "center",
      "_$child": [
        {
          "_$id": "jdboga4f",
          "_$type": "Label",
          "name": "Label",
          "width": 200,
          "height": 81,
          "centerX": 0,
          "text": "敌人栏",
          "fontSize": 30,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "overflow": "visible",
          "leading": 0,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "qo1p0769",
          "_$var": true,
          "_$type": "List",
          "name": "list_enemies",
          "y": 81,
          "width": 200,
          "height": 619,
          "mouseEnabled": true,
          "centerX": 0,
          "repeatX": 1,
          "repeatY": 4,
          "spaceY": 20,
          "scrollType": 2,
          "selectEnable": true
        }
      ]
    },
    {
      "_$id": "ymscbqms",
      "_$type": "Panel",
      "name": "Panel",
      "x": 200,
      "width": 1520,
      "height": 1080,
      "_$child": [
        {
          "_$id": "qolspto8",
          "_$var": true,
          "_$type": "Sprite",
          "name": "Player",
          "x": 318.0000000000002,
          "y": 524.0000000000002,
          "width": 54,
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
              "width": 54,
              "height": 54
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
        }
      ]
    }
  ]
}