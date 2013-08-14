        var w = 800;
        var h = 800;
        var r = 7.5;
        var HUMAN = 85000000000;
        var ELEPHANT = 12240000000;
        var MACAQUE_MONKEY = 6376000000;
        var CAT = 1000000000;
        var CAPYBARA = 1600000000;
        var RAT = 21000000;
        var MOUSE = 71000000;
        var connections = [];
        var neurons_scale = d3.scale.linear()
                                    .domain([71000000, 85000000000])
                                    .range([50,1000]);
        var connection_scale = d3.scale.linear()
                                       .domain([71000000, 85000000000])
                                       .range([2,10]);
        var stroke_scale = d3.scale.log()
                                    .domain([71000000, 85000000000])
                                    .range([2.5, 0.25]);

        var svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

        var force = d3.layout.force()
                        .size([w, h])
                        .linkDistance(function() { return Math.random() * 10; })
                        .charge([-1000])
                        .friction(0.5)
                        .gravity(0.5)
                        .theta(0.5);

        var setup = function(species) {
            var neuron_num = neurons_scale(species);
            var connections_num = connection_scale(species);
            var neurons = []
            var connections = []

            for (var i=0; i<neuron_num; i++) {
                neurons[i] = {};
            }

            for (var i=0; i<connections_num; i++) {
                d3.range(neuron_num)
                .map(function(x) { 
                    connections.push({"source":x , "target":Math.floor(Math.random() * neuron_num)});
                });
            };

            return { "neurons" : neurons, "connections" : connections };
        };

        var reset = function(species) {
            var data = setup(species);
            var neurons = data["neurons"];
            var connections = data["connections"];

            force.nodes(neurons)
                 .links(connections)
                 .start();

            svg.selectAll(".link").remove();
            svg.selectAll(".node").remove();

            var link = svg.selectAll(".link")
                      .data(connections)
                      .enter().append("line")
                      .attr("class", "link")
                      .attr("stroke-width", function() { return stroke_scale(species); });

            var node = svg.selectAll(".node")
                      .data(neurons)
                      .enter().append("ellipse")
                      .attr("class", "node")
                      .attr("rx", function() { return (Math.random() * r)/2; })
                      .attr("ry", function() { return Math.random() * r; })
                      .call(force.drag);

             force.on("tick", function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("cx", function(d) { return Math.max(r, Math.min(d.x, w - r)); })
                    .attr("cy", function(d) { return Math.max(r, Math.min(d.y, h - r)); });
          });
         };
        
        
