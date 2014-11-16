$(document).ready(function(){
	var pieLoader = new chartLoader("#pieChart");
	pieLoader.loadDefaultSet(pieChartDefault);
	pieLoader.loadValue([1,2,3]);
	pieLoader.draw();


});

function chartStyle(){

	this.setSize = function(width,height){

	};
}

function chartLoader(id){
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

	// load the chart options
	this.loadOptions = function(){

	}

	// load the useful value from sensor for chart
	this.loadValue = function(valueArray){
		for(var i=0; i<valueArray.length; i++){
			this.data[i].value = valueArray[i];
		}
	};

	this.draw = function(){
		var ctx = $(id).find("canvas").get(0).getContext("2d");
		var pieChart = new Chart(ctx).Pie(this.data, this.options);
		var labels = $(id).find("label");
		labels.append(this.loadLabel());
	}

	this.loadLabel = function(){
		html = "";
		for(var i=0; i<this.data.length; i++)
			html += "<li><span style=\"background-color:" + this.data[i].color+ "\"></span> " + this.data[i].label + "</li>";
		return html;
	}
}


var pieChartDefault = {
	data:
		[
			{
				value    : 10,
				color    : "#F7464A",
				highlight: "#FF5A5E",
				label    : "Red"
			},
			{
				value    : 0,
				color    : "#46BFBD",
				highlight: "#5AD3D1",
				label    : "Green"
		    },
		    {
				value    : 0,
				color    : "#FDB45C",
				highlight: "#FFC870",
				label    : "Yellow"
		    }
		],
	options:{
		animation: false
	}
}


