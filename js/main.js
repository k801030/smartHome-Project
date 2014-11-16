$(document).ready(function(){
	var pieLoader = new PieChartLoader("#pieChart");
	pieLoader.loadDefaultSet(pieChartDefault);
	pieLoader.loadValue([38,39,23]);
	pieLoader.draw();
	

	var barLoader = new BarChartLoader("#barChart");
	barLoader.loadDefaultSet(barChartDefault);
	barLoader.loadValue(
		["5F-A","5F-B","7F-B","7F-C"],
		[10,16,15,5],
		[12,11,10,5]);
	barLoader.draw();

});


var ChartLoader = function(id){
	this.id = id;
	this.data = null;
	this.options = null;
	this.path = "json/";

	// load the default style of chart
	this.loadDefaultSet = function(pieChartDefault){
		/*
		filename = type+"-DefaultSet.json";
		$.getJSON(this.path+filename,function( data ){
			this.data = data;
		});
		*/
		//this.data = jQuery.parseJSON(json);
		this.data = pieChartDefault.data;
		this.options = pieChartDefault.options;
	};

	
	
}

// extend from ChartLoader
var PieChartLoader = function(id){
	var pieChartLoader = new ChartLoader(id);

	pieChartLoader.draw = function(){
		var ctx = $(this.id).find("canvas").get(0).getContext("2d");
		var chart = new Chart(ctx).Pie(this.data, this.options);
		var labels = $(this.id).find("label");
		labels.append(this.loadLabel());
	}
	pieChartLoader.loadLabel = function(colors,labels){
		html = "<ul>";
		for(var i=0; i<this.data.length; i++)
			html += "<li><span style=\"background-color:" + this.data[i].color+ "\"></span> " + this.data[i].label + "</li>";
		html += "</ul>";
		return html;
	}

	// load the useful value from sensor for chart
	pieChartLoader.loadValue = function(valueArray){
		for(var i=0; i<valueArray.length; i++){
			this.data[i].value = valueArray[i];
		}
	};

	return pieChartLoader;
}

// extend from ChartLoader
var BarChartLoader = function(id){
	var barChartLoader = new ChartLoader(id);

	barChartLoader.draw = function(){
		var ctx = $(this.id).find("canvas").get(0).getContext("2d");
		var chart = new Chart(ctx).Bar(this.data, this.options);
		var labels = $(this.id).find("label");
		labels.append(this.loadLabel());
	}
	barChartLoader.loadLabel = function(colors,labels){
		html = "<ul>";
		for(var i=0; i<this.data.datasets.length; i++)
			html += "<li><span style=\"background-color:" + this.data.datasets[i].fillColor+ "\"></span> " + this.data.datasets[i].label + "</li>";
		html += "</ul>";
		return html;
	}

	barChartLoader.loadValue = function(labels,values1,values2){
		this.data.labels = labels;
		this.data.datasets[0].data = values1;
		this.data.datasets[1].data = values2;
	};

	return barChartLoader;
}


var pieChartDefault = {
	data:
		[
			{
				value    : 0,
				color    : "#F7464A",
				highlight: "#FF5A5E",
				label    : "溫度過高"
			},
			{
				value    : 0,
				color    : "#46BFBD",
				highlight: "#5AD3D1",
				label    : "溫度過低"
		    },
		    {
				value    : 0,
				color    : "#FDB45C",
				highlight: "#FFC870",
				label    : "無預警停止運轉"
		    }
		],
	options:{
		animation: false
	}
}

var barChartDefault = {
    data:{
	    labels: [],
	    datasets: [
	        {
	            label: "控制設備數量",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: []
	        },
	        {
	            label: "事件數量",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: []
	        }
	    ]},

	options:{

	}

};

