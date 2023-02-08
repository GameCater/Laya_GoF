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
      "scriptPath": "../src/Main.ts"
    }
  ],
  "_$child": [
    {
      "_$id": "s1eoohuz",
      "_$type": "Scene3D",
      "name": "Scene3D",
      "skyRenderer": {
        "meshType": "dome"
      },
      "ambientMode": 0,
      "ambientColor": {
        "_$type": "Color",
        "r": 0.212,
        "g": 0.227,
        "b": 0.259
      },
      "_reflectionsIblSamples": 128,
      "fogStart": 300,
      "fogRange": 1000,
      "fogColor": {
        "_$type": "Color",
        "r": 0.7,
        "g": 0.7,
        "b": 0.7
      },
      "lightmaps": [],
      "_$child": [
        {
          "_$id": "zg8fjzry",
          "_$type": "Sprite3D",
          "name": "Cube",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5.5,
              "y": 2.9882955199296095,
              "z": 4.716821864847293
            },
            "localRotation": {
              "_$type": "Quaternion"
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "f1e48cc9-d67d-4196-92dd-77d9ee2f076c",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "receiveShadow": true,
              "castShadow": true,
              "sharedMaterials": [
                {
                  "_$uuid": "6f90bbb0-bcb2-4311-8a9d-3d8277522098",
                  "_$type": "Material"
                }
              ]
            }
          ],
          "_$child": [
            {
              "_$id": "buc0no4k",
              "_$type": "Sprite3D",
              "name": "Sphere",
              "transform": {
                "localPosition": {
                  "_$type": "Vector3",
                  "x": -4.365010965838481,
                  "y": 2.827620340875272,
                  "z": 3.717481121848205
                },
                "localRotation": {
                  "_$type": "Quaternion"
                },
                "localScale": {
                  "_$type": "Vector3",
                  "x": 0.2,
                  "y": 0.2,
                  "z": 0.2
                }
              },
              "_$comp": [
                {
                  "_$type": "MeshFilter",
                  "sharedMesh": {
                    "_$uuid": "f1e48cc9-d67d-4196-92dd-77d9ee2f076c",
                    "_$type": "Mesh"
                  }
                },
                {
                  "_$type": "MeshRenderer",
                  "sharedMaterials": [
                    {
                      "_$uuid": "6f90bbb0-bcb2-4311-8a9d-3d8277522098",
                      "_$type": "Material"
                    }
                  ]
                },
                {
                  "_$type": "Animator",
                  "controller": {
                    "_$uuid": "d39ec7fb-0409-4a0b-9cb9-34224189550a",
                    "_$type": "AnimationController"
                  },
                  "controllerLayers": [
                    {
                      "_$type": "AnimatorControllerLayer",
                      "name": "Base Layer",
                      "states": [
                        {
                          "_$type": "AnimatorState",
                          "name": "3dAni",
                          "clipStart": 0,
                          "clip": {
                            "_$uuid": "1c58a1c0-d88d-48b8-bcd0-962b423c41e7",
                            "_$type": "AnimationClip"
                          },
                          "soloTransitions": []
                        }
                      ],
                      "defaultStateName": "3dAni"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "_$id": "exsi65am",
          "_$type": "Camera",
          "name": "Camera",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5.237556167774821,
              "y": 3.8822516332038233,
              "z": 8.427051925175032
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": -0.13260279078803094,
              "y": 0.04134318481185708,
              "z": 0.0055359699974358665,
              "w": 0.990291166264259
            }
          },
          "orthographic": true,
          "orthographicVerticalSize": 1.8505735461247341,
          "fieldOfView": 20,
          "nearPlane": 2,
          "farPlane": 20,
          "clearFlag": 0,
          "clearColor": {
            "_$type": "Color",
            "r": 0,
            "g": 0,
            "b": 0
          },
          "cullingMask": 2147483647,
          "normalizedViewport": {
            "_$type": "Viewport",
            "width": 1,
            "height": 1
          },
          "depthTextureFormat": 35,
          "renderTarget": {
            "_$uuid": "2d1967ad-481e-48ed-bee1-b7d76aae89d1",
            "_$type": "RenderTexture"
          }
        },
        {
          "_$id": "a7m0qgbg",
          "_$type": "Sprite3D",
          "name": "PointLight",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5.737421035766602,
              "y": 4.550157688496595,
              "z": 6.348471164703369
            },
            "localRotation": {
              "_$type": "Quaternion"
            }
          },
          "_$comp": [
            {
              "_$type": "PointLightCom",
              "intensity": 1.58,
              "lightmapBakedType": 1,
              "shadowMode": 0,
              "shadowStrength": 1,
              "shadowDistance": 50,
              "shadowDepthBias": 1,
              "shadowNormalBias": 1,
              "shadowNearPlane": 0.1,
              "range": 6,
              "power": 10,
              "radius": 0.25,
              "maxBounces": 1024
            }
          ]
        }
      ]
    },
    {
      "_$id": "qolspto8",
      "_$var": true,
      "_$type": "Sprite",
      "name": "Player",
      "x": 518,
      "y": 524,
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
    },
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
    }
  ]
}