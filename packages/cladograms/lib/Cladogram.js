Cladogram = {
  setDefault: function(){

    if (Session.get('graphData') === undefined) {
      Session.set('graphData', {
          "name": "_id",
          "image": "/icons/Image_PNG.png",
          "children": [
              {
                  "name": "emails",
                  "image": "/icons/Image_JPG.png",
                  "children": [
                      {
                          "name": "cluster",
                          "image": "/icons/Image_JPG.png",
                          "children": [
                              {"name": "AgglomerativeCluster", "size": 3938},
                              {"name": "CommunityStructure", "size": 3812}
                          ]
                      },
                      {
                          "name": "graph",
                          "image": "/icons/Image_JPG.png",
                          "children": [
                              {"name": "BetweennessCentrality", "size": 3534},
                              {"name": "LinkDistance", "size": 5731}
                          ]
                      },
                      {
                          "name": "optimization",
                          "image": "/icons/Image_JPG.png",
                          "children": [
                              {"name": "AspectRatioBanker", "size": 7074},
                              {"name": "MaxFlowMinCut", "size": 7840}
                          ]
                      }
                  ]
              },
              {
                  "name": "_id",
                  "image": "/icons/Image_PNG.png"
              },
              {
                  "name": "username",
                  "image": "/icons/Image_PNG.png"
              },
              {
                  "name": "createdAt",
                  "image": "/icons/Image_PNG.png"
              },
              {
                  "name": "profile",
                  "image": "/icons/PNG File.png",
                  "children": [
                      {
                          "name": "avatar",
                          "image": "/icons/PNG File.png"
                      },
                      {
                          "name": "name",
                          "image": "/icons/PNG File.png"
                      },
                      {
                          "name": "ordinal",
                          "image": "/icons/PNG File.png"
                      }
                  ]
              }
          ]
      });
    }
    
  }
}
