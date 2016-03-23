Session.setDefault('graphData', {});

Graphs = {
  clear: function() {
    $('#forceDirectGraph').html('');
    $('#sunburstChart').html('');
    $('#collapsibleTreeChart').html('');
  },
  renderCollapsibleTreeChart: function(){
      var m = [60, 120, 60, 120],
          w = window.innerWidth - m[1] - m[3],
          h = window.innerHeight - 240,
          i = 0,
          root;
      var color = d3.scale.category20b();

      var tree = d3.layout.tree()
          .size([h, w]);

      var diagonal = d3.svg.diagonal()
          //.projection(function(d) { return [d.y, (d.x * 1.2)]; });
          .projection(function(d) { return [d.y, d.x]; });

      var vis = d3.select("#collapsibleTreeChart").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");



        Tracker.autorun(function(){

          var json = Session.get('graphData');
          console.log('graphData', json);
          root = json;
          if (json) {
            json.x0 = h / 4;
            json.y0 = 0;

            function toggleAll(d) {
              if (d.children) {
                d.children.forEach(toggleAll);
                toggle(d);
              }
            }

            update(json);
          }
        });


        function update(source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            // these will be collapsed
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("mouseover", function(d) {
                    Session.set('data_inspection_title', d.name);
                    Session.set('data_inspection_size', d.size);
                    Session.set('data_inspection_color', color(d.size));
                })
                .on("click", function(d) { toggle(d); update(d); });

            // collapsed node color
            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return color(d.size); });
                //.style("fill", function(d) { return d._children ? "orange" : "lightsteelblue"; });

            //        nodeEnter.append("svg:image")
            //            //.attr("class", "fizzle")
            //            .attr("height", "32px")
            //            .attr("width", "32px")
            //            .attr("xlink:href", function(d){ return d.image; })
            //            .style("fill", "lightsteelblue");

            nodeEnter.append("svg:text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", "1.5em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            // expanded node
            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return color(d.size); });
                //.style("fill", function(d) { return d._children ? "orange" : "lightsteelblue"; });
                //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

              //        nodeUpdate.select("image")
              //            //.style("fill-opacity", 1);
              //            .attr("y", -16)
              //            .attr("x", -16)
              //            .attr("height", "32px")
              //            .attr("width", "32px")
              //            .attr("xlink:href", function(d){ return d.image; })
              //            //.attr("xlink:href", "/images/grays.anatomy.thumbnails/abdominalArteries.png")
              //            .style("stroke", function(d) { return d._children ? "orange" : "lightsteelblue"; });

            nodeUpdate.select("text")
                .attr("x", 16)
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("image")
                .style("fill-opacity", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children.
        function toggle(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
      //});
  },
  renderForceDirectCollapsible: function(){

      var w = window.innerWidth,
          h = window.innerHeight - 80,
          node,
          link,
          root;
      var color = d3.scale.category20b();

      var force = d3.layout.force()
          .on("tick", tick)
          .gravity(0.005)
          //.distance(100)
          //.charge(-100)
          .charge(function(d) { return d._children ? 20 : -200; })
          .linkDistance(function(d) { return d.target.children ? 100 : 20; })
          .size([w, h]);

      var vis = d3.select("#forceDirectGraph").append("svg:svg")
          .attr("width", w)
          .attr("height", h);

      d3.json("data/flare.json", function(json) {
          root = json;
          root.fixed = true;
          root.x = w / 2;
          root.y = h / 2;
          update();
      });

      function update() {
          var nodes = flatten(root),
              links = d3.layout.tree().links(nodes);

          // Restart the force layout.
          force
              .nodes(nodes)
              .links(links)
              .start();

          // Update the links…
          link = vis.selectAll("line.link")
              .data(links, function(d) { return d.target.id; });

          // Enter any new links.
          link.enter().insert("svg:line", ".node")
              .attr("class", "link")
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          // Exit any old links.
          link.exit().remove();

          // Update the nodes…
          node = vis.selectAll("circle.node")
              .data(nodes, function(d) { return d.id; })
              .style("fill", function(d) { return color(d.size); });
              //.style("fill", color);

          node.transition()
              .attr("r", function(d) { return d.children ? 4.5 : 10; });

          // Enter any new nodes.
          node.enter().append("svg:circle")
              .attr("class", "node")
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; })
              .attr("r", function(d) { return d.children ? 4.5 : 10; })
              //.style("fill", color)
              .style("fill", function(d) { return color(d.size); })
              .on("mouseover", function(d) {
                  Session.set('data_inspection_title', d.name);
                  Session.set('data_inspection_size', d.size);
                  Session.set('data_inspection_color', color(d.size));
              })
              .on("click", click)
              .call(force.drag);

          // Exit any old nodes.
          node.exit().remove();
      }

      function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
      }

  // Color leaf nodes orange, and packages white or blue.
      function color(d) {
          return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
      }

  // Toggle children on click.
      function click(d) {
          if (d.children) {
              d._children = d.children;
              d.children = null;
          } else {
              d.children = d._children;
              d._children = null;
          }
          update();
      }

  // Returns a list of all nodes under the root.
      function flatten(root) {
          var nodes = [], i = 0;

          function recurse(node) {
              if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
              if (!node.id) node.id = ++i;
              nodes.push(node);
              return node.size;
          }

          root.size = recurse(root);
          return nodes;
      }
  },
  renderSunburst: function(){
    // Dimensions of sunburst.
      var width = window.innerWidth - 540,
          height = window.innerHeight - 50,
          radius = Math.min(width, height) / 2.5,
          color = d3.scale.category20b();

      // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
      var b = {
        w: 75, h: 30, s: 3, t: 10
      };

      // Mapping of step names to colors.
      var colors = {
        "phylum": "#5687d1",
        "class": "#7b615c",
        "search": "#de783b",
        "order": "#6ab975",
        "family": "#a173d1",
        "genus": "#bbbbbb"
      };

      // Total size of all segments; we set this later, after loading the data.
      var totalSize = 0;

      var svg = d3.select("#sunburstChart").append("svg")
          .attr("id", "svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
      console.log('d3 added SVG area to chart element.');

      var partition = d3.layout.partition()
          .sort(null)
          .size([2 * Math.PI, radius * radius])
          .value(function(d) { return 1; });
      console.log('d3 added created partition(s).');

      var arc = d3.svg.arc()
          .startAngle(function(d) { return d.x; })
          .endAngle(function(d) { return d.x + d.dx; })
          .innerRadius(function(d) { return Math.sqrt(d.y); })
          .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
      console.log('d3 created arc(s).');

      console.log('d3 loading input files');

      // Meteor.call("testFlare", function (error, json){
      //   if (error){
      //     console.log("error", error);
      //   }
      //   if (json) {
      //     Session.set('graphData', json)
      //   }
      // });

      Tracker.autorun(function (){
        var json = Session.get('graphData');
        console.log('testFlare', json);
        if (json){
          var root = json;
          console.log('d3 loaded flare.json: ' + root);

          var path = svg.datum(root).selectAll("path")
              .data(partition.nodes)
              .enter().append("path")
              .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
              .attr("d", arc)
              .style("stroke", "#fff")
              //.style("fill", function(d) { return color(d.size); })
              .style("fill-rule", "evenodd")
              .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
              .on("click", click)
              .on("mouseover", function(d) {
                  Session.set('data_inspection_title', d.name);
                  Session.set('data_inspection_size', d.size);
                  Session.set('data_inspection_color', color(d.size));
              })
              .each(stash);
          console.log('d3 created paths from datum.');


          function click(d) {
            // fade out all text elements
            text.transition().attr("opacity", 0);

            path.transition()
              .duration(750)
              .attrTween("d", arcTween(d))
              .each("end", function(e, i) {
                  // check if the animated element's data e lies within the visible angle span given in d
                  if (e.x >= d.x && e.x < (d.x + d.dx)) {
                    // get a selection of the associated text element
                    var arcText = d3.select(this.parentNode).select("text");
                    // fade in the text element and recalculate positions
                    arcText.transition().duration(750)
                      .attr("opacity", 1)
                      .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                      .attr("x", function(d) { return y(d.y); });
                  }
              });
          }


          d3.selectAll("input").on("change", function change() {
              var value = this.value === "count"
                  ? function() { return 1; }
                  : function(d) { return d.size; };

              path
                .data(partition.value(value).nodes)
                .transition()
                .duration(1500)
                .attrTween("d", arcTween);
          });
        }
      });


      // Stash the old values for transition.
      function stash(d) {
          d.x0 = d.x;
          d.dx0 = d.dx;
      }

      // Interpolate the arcs in data space.
      function arcTween(a) {
          var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
          return function(t) {
              var b = i(t);
              a.x0 = b.x;
              a.dx0 = b.dx;
              return arc(b);
          };
      }

      d3.select(self.frameElement).style("height", height + "px");
  }
}
