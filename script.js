d3.csv('cities.csv', d3.autoType).then(data => {
	let filtered = data.filter(e => e.eu === true);
	console.log('cities', filtered);
	scatterplot(filtered);
})





function scatterplot(data) {
	d3.select('.city-count').text("Number of Cities: 28");
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
	svg
		.selectAll()
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', (data, index) => data.x)
		.attr('cy', (data, index) => data.y)
		.attr('r', function (data, index) {
			if (data.population > 1000000) {
				return 8;
			}
			else {
				return 4;
			}
		})
		.style('fill', 'lightblue');
	svg
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("x", (data, index) => data.x)
		.attr("y", (data, index) => data.y - 20)
		.attr("opacity", function(data) {
			if (data.population > 1000000) {
				return 1;
			}
			else {
				return 0;
			}
		})
		.text(d => d.city)
		.style("font-size", 11)
		.style("text-anchor", "middle");


}