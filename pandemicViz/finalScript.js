var dataTotalCases;
var totalCasesTreeMap=[];
var totalDeathTreeMap=[];
var scaledCasesTreeMap=[];
var scaledDeathTreeMap=[];
var iteration=0;
var treeMapCounter=0;
var mode=1;
var barTitle="Total Covid Cases";
var maxCases;
var maxDeaths;
var maxCasePercentage;
var maxDeathPercentage;
var treeMapWidth=675*0.85;
var treeMapHeight=675*0.85;
var treelabelSize="15px";
var treelabelColor="#808080";
var widthBar=450;
var heightBar=450;
var barScaleXCoord=150;
var barScaleYCoord=40;
var barXCoordInitial=160;
var barYCoord=492;
var barTitleXCoord=300;
var barTitleYCoord=50;
var barLabelXCoord;
var barLabelYCoord=505;
var mapHeight=700;
var mapWidth=720;
var usMapXTrans=350;
var usMapYTrans=300;
var usMapScale=900;
var timeWidth=700;
var timeHeight=700;
var xLineScale;
var yLineScale;
var xLineScale2;
var yLineScale2;
var xtrendShift=50+20;
var ytrendShift=100;
var xCoordXLineScale=50+20;
var yCoordXLineScale=451;
var xCoordYLineScale=50+20;
var yCoordYLineScale=100;
var xtrendShift2=350+20;
var ytrendShift2=ytrendShift;
var xCoordXLineScale2=350+20;
var yCoordXLineScale2=yCoordXLineScale;
var xCoordYLineScale2=350+20;
var yCoordYLineScale2=yCoordYLineScale;
var AK=[];
var AL=[];
var AR=[];
var AS=[];
var AZ=[];
var CA=[];
var CO=[];
var CT=[];
var DC=[];
var DE=[];
var FL=[];
var GA=[];
var GU=[];
var HI=[];
var IA=[];
var ID=[];
var IL=[];
var IN=[];
var KS=[];
var KY=[];
var LA=[];
var MA=[];
var MD=[];
var ME=[];
var MI=[];
var MN=[];
var MO=[];
var MP=[];
var MS=[];
var MT=[];
var NC=[];
var ND=[];
var NE=[];
var NH=[];
var NJ=[];
var NM=[];
var NV=[];
var NY=[];
var OH=[];
var OK=[];
var OR=[];
var PA=[];
var PR=[];
var RI=[];
var SC=[];
var SD=[];
var TN=[];
var TX=[];
var UT=[];
var VA=[];
var VI=[];
var VT=[];
var WA=[];
var WI=[];
var WV=[];
var WY=[];
var timeHeading="Florida";
var ytimeHeading=50;
var xtimeHeading=0;
var timePositive="Postive Cases";
var xtimePositive=150;
var ytimePositive=ytimeHeading+50;
var timeDeath="Death";
var xtimeDeath=450;
var ytimeDeath=ytimePositive;
var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
var colorHighlight=	'#000080';
var colorHighlight2="#800000";
var colorHighlight3="#006400";
var colorHighlight4="#8b4513";
var bars;
////var dummy={name:"alaska"};

//dummy['newfeature']="cool";

//console.log(dummy);

//var gLabel=d3.select("svg").append("g").attr("style","transform:rotate(-90deg)");

function converNum(x){
    if(x==="No data"){
        console.log("No data found");
        return 0;
    }
    return x;
}

function tileSelect(d){
    if(d==="U.S Virgin Islands"){ return "#UVirginSilands"}
    else{
        //console.log("invoked")
        return "#"+d.split(" ").join("");
    }
}

function matchingTile(tileName){
    let i=1;
    let svg1=d3.select("#barChartCanvas");
    svg2=d3.select("#treeMap");
    let barChart=d3.select("#barChart");
//console.log("next after mode is 1");
//console.log("iteration is",iteration);
if(iteration<dataTotalCases.length){

    d3.selectAll(".tiles")
    .style("stroke", "black")
    .style("fill", "#69b3a2");

//console.log("check",tileName)

if(mode==1){

//console.log("mode 1 loop");
barChart.selectAll("rect").remove();
barChart.selectAll("text").remove();
svg1.selectAll(".baryAxis").remove();

let magnitude=[];
flagFound=false;

let temp=iteration=1;
while(i<=20 && i<dataTotalCases.length){
    console.log("loop enter")
    if(dataTotalCases[iteration].totalCases!=="No data"){
        
        //console.log(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        magnitude.push(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        i++;
    }
    if(tileName==dataTotalCases[iteration].Location.split(" ").join("")){
        console.log("found");
        flagFound=true};
    if(i==20 && flagFound==false){
        i=1
        magnitude=[];
    }
    iteration++;
}
console.log("loop out")
i=1;
console.log(magnitude);
maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
console.log(maxCases)
yScale=d3.scaleLinear()//scale for the first bar chart
.domain([0,maxCases])
.range([0,heightBar]);

yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
.domain([maxCases,0])
.range([0,heightBar])

yAxis=d3.axisLeft().scale(yScale_Oriented);
svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

iteration=iteration-20;

while(i<=20 && iteration<dataTotalCases.length){
    if (dataTotalCases[iteration].totalCases!=="No data"){
    let xCord=barXCoordInitial+(i-1)*25
    barChart.append("rect")
    .attr("x",xCord)
    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
    .attr("width", 20)
    .attr("height",  yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
    .attr("class","totalBars")
    .attr("id",function(){
        
        if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
        return 'UVirginislands_';
    })

    barChart.append("text")
            .attr("style","text-anchor:end")
            .attr("class","barLabel")
            .attr("x",xCord)
            .attr("y", barLabelYCoord)
            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
            .text(dataTotalCases[iteration].Location);

    d3.select(tileSelect(dataTotalCases[iteration].Location))
        .style("fill",colorHighlight);
    i++; 
                    }
    iteration++;
    //console.log(iteration);
            }
        }
    }

    
}

class Node{
    constructor(name,parent,value){
        this.name=name;
        this.parent=parent;
        this.value=value;
    }
}

class stateSummary{
    constructor(state,date,positive,death){
        this.state=state;
        this.date=date;
        this.positive=positive;
        this.death=death;
    }
}
Promise.all([
    d3.json("us-states.json"),
    d3.csv("us_states_covid19_daily.csv"),
    d3.csv("totalCovidCases2.csv"),
]).then(function(files) {
    // files[0] will contain file1.csv
    // files[1] will contain file2.csv
    //console.log(files[0]);
    //console.log(files[0]);
    //console.log(files[2]);
    //console.log(data);
    //dataTotalCases.push(data);

    dataTotalCases=files[2];

    maxCases=d3.max(dataTotalCases,function(d){ if(d.Location!=="World") return parseFloat(d.totalCases.split(",").join("")*1.2)})

for(i=0;i<files[2].length;i++){
totalCasesTreeMap.push(new Node(files[2][i].Location,files[2][i].Parent,files[2][i].Location=="World"?"":files[2][i].totalCases));
totalDeathTreeMap.push(new Node(files[2][i].Location,files[2][i].Parent,files[2][i].Location=="World"?"":files[2][i].Deaths));
scaledCasesTreeMap.push(new Node(files[2][i].Location,files[2][i].Parent,files[2][i].Location=="World"?"":files[2][i].CaseScaled));
scaledDeathTreeMap.push(new Node(files[2][i].Location,files[2][i].Parent,files[2][i].Location=="World"?"":files[2][i].DeathScaled));
}



//console.log("This is total treemap data:");
//console.log(totalCasesTreeMap);
/*
console.log("This is death treemap data:");
console.log(totalDeathTreeMap);
console.log("This is scaled total treemap data:");
console.log(scaledCasesTreeMap);
console.log("This is scaled death treemap data:");
console.log(scaledDeathTreeMap);
*/





//console.log("after loading data iteration is: ",iteration);

//************************** Treemap goes here****************************************

    let svg2=d3.select("#treeMap");
    var root=d3.stratify()
                .id(function(d){return d.name;})
                .parentId(function(d){return d.parent;})
                (totalCasesTreeMap);
    
    
    //console.log(root);

    //let dummy=root.leaves()
    //console.log(dummy[0]['id']);

   
    
    root.sum(function(d){
        //console.log(d.name);
        //console.log(d.value);
        return parseFloat(d.value.split(",").join(""))});
    ;

    //console.log("This is the root:");
    //console.log(root);

    let treemap=d3.treemap()
       .size([treeMapWidth,treeMapHeight])
       .padding(4)
       (root);

    //console.log(treemap);

    //treemap(root);
    //console.log(treemap);
    //console.log(root.leaves());

       svg2
       .selectAll("rect")
       .data(root.leaves())
       .enter()
       .append("rect")
         .attr('x', function (d) {
             //console.log("this is what you are looking for: ",d['id']);
              return d.x0; })
         .attr('y', function (d) { return d.y0; })
         .attr('width', function (d) { return d.x1 - d.x0; })
         .attr('height', function (d) { return d.y1 - d.y0; })
         .attr('class','tiles')
         .attr('id' , function(d){
            if (d['id']=="U.S. Virgin Islands"){return "UVirginislands"};
            return d['id'].split(" ").join("");
         })
         .style("stroke", "black")
         .style("fill", "#69b3a2");
         



     // and to add the text labels
     /*
     svg2
       .selectAll("text")
       .data(root.leaves())
       .enter()
       .append("text")
         .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
         .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
         .text(function(d){ if(d.x1-d.x0>50) {
             console.log(d.x1-d.x0);
             return d.data['name'];}
        })
         .attr("font-size", "60%")
         .attr("fill", "white")
         .attr("class","treeNames");
         */



//********************BarChart is rendered here ******************************************/

let svg1=d3.select("#barChartCanvas");

let barChart=d3.select("#barChart");
let yScale=d3.scaleLinear()//scale for the first bar chart
             .domain([0,maxCases])
             .range([0,heightBar]);

let yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
                .domain([maxCases,0])
                .range([0,heightBar]);

let yAxis=d3.axisLeft().scale(yScale_Oriented);

svg1.append("g").append("text")
                .attr("class","barTitle")
                .attr("transform","translate("+barTitleXCoord+","+barTitleYCoord+")")
                .text(""+barTitle+"");

svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);
//.attr("transform","translate(0,445)")




//no issue for the first 20 as ther is data


while(iteration<20){
    let xCord=barXCoordInitial+(iteration+1-1)*25
    barChart.append("rect")
    .attr("x",xCord)
    .attr("y", barYCoord-yScale(parseFloat(files[2][iteration+1].totalCases.split(",").join(""))))
    .attr("width", 20)
    .attr("height",  yScale(parseFloat(files[2][iteration+1].totalCases.split(",").join(""))))
    .attr("class","totalBars")
    .attr("id",function(){
        
        if(files[2][iteration+1].Location!=="U.S. Virgin Islands"){return files[2][iteration+1].Location.split(" ").join("")+"_";}
        return 'UVirginislands_';
    });


    barChart.append("text")
            .attr("style","text-anchor:end")
            .attr("class","barLabel")
            .attr("x",xCord)
            .attr("y", barLabelYCoord)
            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
            .text(files[2][iteration+1].Location);
    
    svg2.select(tileSelect(files[2][iteration+1].Location))
            .style("fill",colorHighlight);
    iteration++;
    //console.log("#"+files[2][iteration+1].Location.split(" ").join(""));

}

iteration++;





let fileLength=files[1].length;

    for(index=0;index<fileLength;index++){//updating the date field with data object

            //console.log("the date is",files[1][index].date);

            let dateObject=new Date(+files[1][fileLength-index-1].date.slice(0,4),+files[1][fileLength-index-1].date.slice(4,6)-1,+files[1][fileLength-index-1].date.slice(6,8));
            //console.log("the date object created is as follows");
            //console.log(dateObject);
            files[1][fileLength-index-1].date=dateObject;
            if(files[1][fileLength-index-1].state==="AK"){//Alaska
                AK.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="AL"){//Alabama
                AL.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="AR"){//Arkansas
                AR.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="AS"){//American Samoa (not in map)
                AS.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="AZ"){//Arizona
                AZ.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="CA"){//California
                CA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="CO"){//Colorado
                CO.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="CT"){//Connecticut
                CT.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="DC"){//District of Columbia
                DC.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="DE"){//Delaware
                DE.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="FL"){//Florida
                FL.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="GA"){//Georgia
                GA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="GU"){//Guam (Not in map)
                GU.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="HI"){//Hawaii
                HI.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="IA"){//Iowa
                IA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="ID"){//Idaho
                ID.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="IL"){//Illinois
                IL.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="IN"){//Indiana
                IN.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="KS"){//Kansas
                KS.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="KY"){//Kentucky
                KY.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="LA"){//Louisiana
                LA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MA"){//Massachusetts
                MA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MD"){//Maryland
                MD.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="ME"){//Maine
                ME.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MI"){//Michigan
                MI.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MN"){//Minnesota
                MN.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MO"){//Missouri
                MO.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MP"){//Northern Mariana Islands (not in map)
                MP.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MS"){//Mississippi
                MS.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="MT"){//Montana
                MT.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NC"){//North Carolina
                NC.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="ND"){//North Dakota
                ND.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NE"){//Nebraska
                NE.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NH"){//New Hampshire
                NH.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NJ"){//New Jersey
                NJ.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NM"){//New Mexico
                NM.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NV"){//Nevada
                NV.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="NY"){//New York
                NY.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="OH"){//Ohio
                OH.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="OK"){//Oklahoma
                OK.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="OR"){//Oregon
                OR.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="PA"){//Pennsylvania
                PA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="PR"){//Peurto Rico (Not in map)
                PR.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="RI"){//Rhode Island
                RI.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="SC"){//South Carolina
                SC.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="SD"){//South Dakota
                SD.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="TN"){//Tennessee
                TN.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="TX"){//Texas
                TX.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="UT"){//Utah
                UT.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="VA"){//Virginia
                VA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="VI"){//US Virgin Islands (Not in map)
                VI.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="VT"){//Vermont
                VT.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="WA"){//Washington
                WA.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="WI"){//Wisconsin
                WI.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="WV"){//West Virginia
                WV.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            else if(files[1][fileLength-index-1].state==="WY"){//Wyoming
                WY.push(new stateSummary(files[1][fileLength-index-1].state,files[1][fileLength-index-1].date,files[1][fileLength-index-1].positive,files[1][fileLength-index-1].death));
            }
            


    }

/*
    console.log("this is AK:",AK);
    console.log("this is AL",AL);
    console.log("this is AR",AR);
    console.log("this is AS",AS);
    console.log("this is AZ",AZ);
    console.log("this is CA",CA);
    console.log("this is CO",CO);
    console.log("this is CT",CT);
    console.log("this is DC",DC);
    console.log("this is DE",DE);
    console.log("this is FL",FL);
    console.log("this is GA",GA);
    console.log("this is GU",GU);
    console.log("this is HI",HI);
    console.log("this is IA",IA);
    console.log("this is ID",ID);
    console.log("this is IL",IL);
    console.log("this is IN",IN);
    console.log("this is KS",KS);
    console.log("this is KY",KY);
    console.log("this is LA",LA);
    console.log("this is MA",MA);
    console.log("this is MD",MD);
    console.log("this is ME",ME);
    console.log("this is MI",MI);
    console.log("this is MN",MN);
    console.log("this is MO",MO);
    console.log("this is MP",MP);
    console.log("this is MS",MS);
    console.log("this is MT",MT);
    console.log("this is NC",NC);
    console.log("this is ND",ND);
    console.log("this is NE",NE);
    console.log("this is NH",NH);
    console.log("this is NJ",NJ);
    console.log("this is NM",NM);
    console.log("this is NV",NV);
    console.log("this is NY",NY);
    console.log("this is OH",OH);
    console.log("this is OK",OK);
    console.log("this is OR",OR);
    console.log("this is PA",PA);
    console.log("this is PR",PR);
    console.log("this is RI",RI);
    console.log("this is SC",SC);
    console.log("this is SD",SD);
    console.log("this is TN",TN);
    console.log("this is TX",TX);
    console.log("this is UT",UT);
    console.log("this is VA",VA);
    console.log("this is VI",VI);
    console.log("this is VT",VT);
    console.log("this is WA",WA);
    console.log("this is WI",WI);
    console.log("this is WV",WV);
    console.log("this is WV",WY);
    */

    /*
    console.log(d3.min(files[1],function(d){
       return d.date;
    }));
    */
//console.log(files[1]);





    

//*********************US Map Goes Here**************************************************************

var monthState={};
var slider=d3.select("#slider");
var slidertext=d3.select("#slidertext");

var color=d3.scaleLinear()
             .range([0,1]);

color.domain([
    d3.min(files[1],function(d){
        if (d.date.getDate()==06 && d.date.getMonth()==11){
            //console.log("this is what you are thinking",d.date);
            return +d.positive;
        }
    }),
    d3.max(files[1],function(d){
        if (d.date.getDate()==6 && d.date.getMonth()==11){
            //console.log("this is what you are thinking",d.date);
            return +d.positive;
        }
    })

])



files[1].forEach(function(d){

    if (d.date.getDate()==06 && d.date.getMonth()==11){
        //console.log("this is what you are thinking",d.date);
        monthState[d.state]=+d.positive;
    }

})

//console.log("in dec we have",monthState);



var projection=d3.geoAlbersUsa().translate([usMapXTrans,usMapYTrans]).scale([usMapScale])
var mpath=d3.geoPath().projection(projection);
var svg3=d3.select("#usMapCanvas")
            .attr("height",mapHeight)
            .attr("width",mapWidth);

var mg=svg3.select("g");



    mg.selectAll("path")
    .data(files[0].features)
    .enter()
    .append("path")
    .attr("id",function(d){
        //console.log(d);
        if(d.properties['name']==="District of Columbia"){return "DC"};
        if(d.properties['name']==="North Carolina"){return "NC"};
        if(d.properties['name']==="North Dakota"){return "ND"};
        if(d.properties['name']==="New Hampshire"){return "NH"};
        if(d.properties['name']==="New Jersey"){return "NJ"};
        if(d.properties['name']==="New Mexico"){return "NM"};
        if(d.properties['name']==="New York"){return "NY"};
        if(d.properties['name']==="Rhode Island"){return "RI"};
        if(d.properties['name']==="South Carolina"){return "SC"};
        if(d.properties['name']==="South Dakota"){return "SD"};
        if(d.properties['name']==="West Virginia"){return "WV"};
        return d.properties['name']})
    .attr("style","stroke:black")
    .attr("d", mpath);


    //console.log(files[0]);

mg.selectAll("text")
   .data(files[0].features)
   .enter()
   .append("text")
   .attr("class","stateLabel")
   .attr("id",function(d){
    if(d.properties['name']==="District of Columbia"){return"id"+ "DC"};
    if(d.properties['name']==="North Carolina"){return "id"+"NC"};
    if(d.properties['name']==="North Dakota"){return "id"+"ND"};
    if(d.properties['name']==="New Hampshire"){return "id"+"NH"};
    if(d.properties['name']==="New Jersey"){return "id"+"NJ"};
    if(d.properties['name']==="New Mexico"){return "id"+"NM"};
    if(d.properties['name']==="New York"){return "id"+"NY"};
    if(d.properties['name']==="Rhode Island"){return "id"+"RI"};
    if(d.properties['name']==="South Carolina"){return "id"+"SC"};
    if(d.properties['name']==="South Dakota"){return "id"+"SD"};
    if(d.properties['name']==="West Virginia"){return "id"+"WV"};
    if(d.properties['name']==="District of Columbia"){return "idDC"}
    return "id"+d.properties['name'];
})
   .attr("x",function(d){
    if(d.properties['name']==="New York"){return mpath.centroid(d)[0]};
    if(d.properties['name']==="New Jersey"){return mpath.centroid(d)[0]+27};
    if(d.properties['name']==="Massachusetts"){return mpath.centroid(d)[0]+35};
    if(d.properties['name']==="Connecticut"){return mpath.centroid(d)[0]+26}
    if(d.properties['name']==="Rhode Island"){return mpath.centroid(d)[0]+25}
    if(d.properties['name']==="New Hampshire"){return mpath.centroid(d)[0]+40}
    if(d.properties['name']==="Vermont"){return mpath.centroid(d)[0]-8}
    if(d.properties['name']==="Delaware"){return mpath.centroid(d)[0]+20}
    if(d.properties['name']==="Maryland"){return mpath.centroid(d)[0]+38}
    if(d.properties['name']==="District of Columbia"){return mpath.centroid(d)[0]-10}
    return mpath.centroid(d)[0];
   })
   .attr("y",function(d){
    if(d.properties['name']==="New York"){return mpath.centroid(d)[1]+5};
    if(d.properties['name']==="Vermont"){return mpath.centroid(d)[1]-15}
    if(d.properties['name']==="New Hampshire"){return mpath.centroid(d)[1]+7}
    if(d.properties['name']==="Connecticut"){return mpath.centroid(d)[1]+8}
    if(d.properties['name']==="Rhode Island"){return mpath.centroid(d)[1]+6}
    if(d.properties['name']==="Delaware"){return mpath.centroid(d)[1]+5}
    if(d.properties['name']==="Maryland"){return mpath.centroid(d)[1]+10}
    if(d.properties['name']==="District of Columbia"){return mpath.centroid(d)[1]}
    return mpath.centroid(d)[1];
   })
   .text(function(d){
       if(d.properties["name"]==="District of Columbia"){ return "D.C"};
       return d.properties['name'];
   })

   //mg.select("#Alaska").style("fill","blue");

mg.selectAll("path")
   .style("fill","#ccc")

for(let property in monthState){
    if (property==="AK"){
        mg.select("#Alaska")
           .style("fill",function(){

            if(monthState[property]==0){
                return "#ccc"
            }
            else{
                return d3.interpolateBlues(color(monthState[property]));
            }

           })

    }
    else if(property==="AL"){
        mg.select("#Alabama")
        .style("fill",function(){

         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="AR"){
        mg.select("#Arkansas")
        .style("fill",function(){

         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="AZ"){
        mg.select("#Arizona")
        .style("fill",function(){

         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="CA"){
        mg.select("#California")
        .style("fill",function(){

         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="CO"){
        mg.select("#Colorado")
        .style("fill",function(){

         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="CT"){
        mg.select("#Connecticut")
        .style("fill",function(){
         ////console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="DC"){
        mg.select("#DC")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="DE"){
        mg.select("#Delaware")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="FL"){
        mg.select("#Florida")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="GA"){
        mg.select("#Georgia")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="HI"){
        mg.select("#Hawaii")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="IA"){
        mg.select("#Iowa")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="ID"){
        mg.select("#Idaho")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="IL"){
        mg.select("#Illinois")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="IN"){
        mg.select("#Indiana")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="KS"){
        mg.select("#Kansas")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="KY"){
        mg.select("#Kentucky")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="HI"){
        mg.select("#Hawaii")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="LA"){
        mg.select("#Louisiana")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="MA"){
        mg.select("#Massachusetts")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
    }
    else if(property==="MD"){
        mg.select("#Maryland")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
    }
    else if(property==="ME"){
        mg.select("#Maine")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="MI"){
        mg.select("#Michigan")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="MN"){
        mg.select("#Minnesota")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="MO"){
        mg.select("#Missouri")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="MS"){
        mg.select("#Mississippi")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="MT"){
        mg.select("#Montana")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="NC"){
        mg.select("#NC")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="ND"){
        mg.select("#ND")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="NE"){
        mg.select("#Nebraska")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="NH"){
        mg.select("#NH")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="NJ"){
        mg.select("#NJ")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })   
    }
    else if(property==="NM"){
        mg.select("#NM")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="NV"){
        mg.select("#Nevada")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="NY"){
        mg.select("#NY")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="OH"){
        mg.select("#Ohio")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
        
        
    }
    else if(property==="OK"){
        mg.select("#Oklahoma")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="OR"){
        mg.select("#Oregon")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="PA"){
        mg.select("#Pennsylvania")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="RI"){
        mg.select("#RI")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="SC"){
        mg.select("#SC")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="SD"){
        mg.select("#SD")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="TN"){
        mg.select("#Tennessee")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="TX"){
        mg.select("#Texas")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="UT"){
        mg.select("#Utah")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="VA"){
        mg.select("#Virginia")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="VT"){
        mg.select("#Vermont")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="WA"){
        mg.select("#Washington")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="WI"){
        mg.select("#Wisconsin")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="WV"){
        mg.select("#WV")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }
    else if(property==="WY"){
        mg.select("#Wyoming")
        .style("fill",function(){
         //console.log(property,monthState[property]);
         if(monthState[property]==0){
             return "#ccc"
         }
         else{
             return d3.interpolateBlues(color(monthState[property]));
         }

        })
    }

}
    
slider.on("input",function(){
    //console.log(this.value);
    slidertext.attr('value', months[this.value]+" 2020");
    monthState={};
    let month=this.value;
    let days=[31,29,31,30,31,30,31,31,30,31,30,6];
    let day=days[this.value];
    mg.selectAll("path")
   .style("fill","#ccc");

    files[1].forEach(function(d){
        //console.log(days[this.value]);
        if (d.date.getDate()==day && d.date.getMonth()==month){
            console.log("this is what you are thinking",d.date);
            monthState[d.state]=+d.positive;
        }
    
    })
    //console.log(monthState);
    for(let property in monthState){
        if (property==="AK"){
            mg.select("#Alaska")
               .style("fill",function(){
    
                if(monthState[property]==0){
                    return "#ccc"
                }
                else{
                    return d3.interpolateBlues(color(monthState[property]));
                }
    
               })
    
        }
        else if(property==="AL"){
            mg.select("#Alabama")
            .style("fill",function(){
    
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="AR"){
            mg.select("#Arkansas")
            .style("fill",function(){
    
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="AZ"){
            mg.select("#Arizona")
            .style("fill",function(){
    
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="CA"){
            mg.select("#California")
            .style("fill",function(){
    
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="CO"){
            mg.select("#Colorado")
            .style("fill",function(){
    
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="CT"){
            mg.select("#Connecticut")
            .style("fill",function(){
             ////console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="DC"){
            mg.select("#DC")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="DE"){
            mg.select("#Delaware")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="FL"){
            mg.select("#Florida")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="GA"){
            mg.select("#Georgia")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="HI"){
            mg.select("#Hawaii")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="IA"){
            mg.select("#Iowa")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="ID"){
            mg.select("#Idaho")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="IL"){
            mg.select("#Illinois")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="IN"){
            mg.select("#Indiana")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="KS"){
            mg.select("#Kansas")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="KY"){
            mg.select("#Kentucky")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="HI"){
            mg.select("#Hawaii")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="LA"){
            mg.select("#Louisiana")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="MA"){
            mg.select("#Massachusetts")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
        }
        else if(property==="MD"){
            mg.select("#Maryland")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
        }
        else if(property==="ME"){
            mg.select("#Maine")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="MI"){
            mg.select("#Michigan")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="MN"){
            mg.select("#Minnesota")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="MO"){
            mg.select("#Missouri")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="MS"){
            mg.select("#Mississippi")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="MT"){
            mg.select("#Montana")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="NC"){
            mg.select("#NC")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="ND"){
            mg.select("#ND")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="NE"){
            mg.select("#Nebraska")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="NH"){
            mg.select("#NH")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="NJ"){
            mg.select("#NJ")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })   
        }
        else if(property==="NM"){
            mg.select("#NM")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="NV"){
            mg.select("#Nevada")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="NY"){
            mg.select("#NY")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="OH"){
            mg.select("#Ohio")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
            
            
        }
        else if(property==="OK"){
            mg.select("#Oklahoma")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="OR"){
            mg.select("#Oregon")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="PA"){
            mg.select("#Pennsylvania")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="RI"){
            mg.select("#RI")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="SC"){
            mg.select("#SC")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="SD"){
            mg.select("#SD")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="TN"){
            mg.select("#Tennessee")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="TX"){
            mg.select("#Texas")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="UT"){
            mg.select("#Utah")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="VA"){
            mg.select("#Virginia")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="VT"){
            mg.select("#Vermont")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="WA"){
            mg.select("#Washington")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="WI"){
            mg.select("#Wisconsin")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="WV"){
            mg.select("#WV")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
        else if(property==="WY"){
            mg.select("#Wyoming")
            .style("fill",function(){
             //console.log(property,monthState[property]);
             if(monthState[property]==0){
                 return "#ccc"
             }
             else{
                 return d3.interpolateBlues(color(monthState[property]));
             }
    
            })
        }
    
    }
})

//***************************** State by State time Chart***********************************************
var svg4=d3.select("#stateInformation").attr("width",timeWidth).attr("height",timeHeight);
    svg4.append("g");

    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(FL,function(d){
                          return d.date;
                      }),
                      d3.max(FL,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(FL,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    var line=d3.line()
                    .x(function(d){return xLineScale(d.date)+xtrendShift;})
                    .y(function(d){
                        return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(FL,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    var line2=d3.line()
               .x(function(d){return xLineScale(d.date)+xtrendShift2;})
               .y(function(d){
                   return yLineScale2(+d.death)+ytrendShift2;})

    
    
    svg4.select("g")
        .attr("id","gline")
        .append("path")
         .datum(FL)
         .attr("class","line")
         .attr("d",line);

    svg4.select("g")
        .append("path")
        .datum(FL)
        .attr("class","line2")
        .attr("d",line2);


  var yLineAxis=d3.axisLeft().scale(yLineScale);
  var xLineAxis=d3.axisBottom().scale(xLineScale);
  var yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);

    svg4.append("g").attr("id","gtimePositive").append("text")
                  .attr("id","postiveCases")
                  .attr("x",xtimePositive)
                  .attr("y",ytimePositive)
                  .text(timePositive);

    svg4.append("g").attr("id","gdeathCases").append("text")
                  .attr("id","deathCases")
                  .attr("x",xtimeDeath)
                  .attr("y",ytimeDeath)
                  .text(timeDeath);
//********All the states including dc********
var Alabama=d3.select("#Alabama");
var Alaska=d3.select("#Alaska");
var Arizona=d3.select("#Arizona");
var Arkansas=d3.select("#Arkansas");
var California=d3.select("#California");
var Colorado=d3.select("#Colorado");
var Connecticut=d3.select("#Connecticut");
var Delaware=d3.select("#Delaware");
var DistrictOfColumbia=d3.select("#DC");
var textDC=d3.select("#idDC");
var Florida=d3.select("#Florida");
var Georgia=d3.select("#Georgia");
var Hawaii=d3.select("#Hawaii");
var Idaho=d3.select("#Idaho");
var Illinois=d3.select("#Illinois");
var Indiana=d3.select("#Indiana");
var Iowa=d3.select("#Iowa");
var Kansas=d3.select("#Kansas");
var Kentucky=d3.select("#Kentucky");
var Louisiana=d3.select("#Louisiana");
var Maine=d3.select("#Maine");
var Maryland=d3.select("#Maryland");
var Massachusetts=d3.select("#Massachusetts");
var Michigan=d3.select("#Michigan");
var Minnesota=d3.select("#Minnesota");
var Mississippi=d3.select("#Mississippi");
var Missouri=d3.select("#Missouri");
var Montana=d3.select("#Montana");
var Nebraska=d3.select("#Nebraska");
var Nevada=d3.select("#Nevada");
var NewHampshire=d3.select("#NH");
var NewJersey=d3.select("#NJ");
var NewMexico=d3.select("#NM");
var NewYork=d3.select("#NY");
var NorthCarolina=d3.select("#NC");
var NorthDakota=d3.select("#ND");
var Ohio=d3.select("#Ohio");
var Oklahoma=d3.select("#Oklahoma");
var Oregon=d3.select("#Oregon");
var Pennsylvania=d3.select("#Pennsylvania");
var RhodeIsland=d3.select("#RI");
var SouthCarolina=d3.select("#SC");
var SouthDakota=d3.select("#SD");
var Tennessee=d3.select("#Tennessee");
var Texas=d3.select("#Texas");
var Utah=d3.select("#Utah");
var Vermont=d3.select("#Vermont");
var Virginia=d3.select("#Virginia");
var Washington=d3.select("#Washington");
var WestVirginia=d3.select("#WV");
var Wisconsin=d3.select("#Wisconsin");
var Wyoming=d3.select("#Wyoming");




Alaska.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(AK,function(d){
                          return d.date;
                      }),
                      d3.max(AK,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(AK,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(AK,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Alaska";

    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(AK)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(AK)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Alabama.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(AL,function(d){
                          return d.date;
                      }),
                      d3.max(AL,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(AL,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(AL,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Alabama";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(AL)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(AL)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Arizona.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(AZ,function(d){
                          return d.date;
                      }),
                      d3.max(AZ,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(AZ,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(AZ,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Arizona";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(AZ)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(AZ)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Arkansas.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(AR,function(d){
                          return d.date;
                      }),
                      d3.max(AR,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(AR,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(AR,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Arkansas";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(AR)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(AR)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})
California.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(CA,function(d){
                          return d.date;
                      }),
                      d3.max(CA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(CA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(CA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="California";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(CA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(CA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Colorado.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(CO,function(d){
                          return d.date;
                      }),
                      d3.max(CO,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(CO,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(CO,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Colorado";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(CO)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(CO)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Connecticut.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(CT,function(d){
                          return d.date;
                      }),
                      d3.max(CT,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(CT,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(CT,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Connecticut";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(CT)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(CT)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Delaware.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(DE,function(d){
                          return d.date;
                      }),
                      d3.max(DE,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(DE,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(DE,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Delaware";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(DE)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(DE)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

DistrictOfColumbia.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(DC,function(d){
                          return d.date;
                      }),
                      d3.max(DC,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(DC,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(DC,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="District of Columbia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(DC)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(DC)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

textDC.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(DC,function(d){
                          return d.date;
                      }),
                      d3.max(DC,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(DC,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(DC,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="District of Columbia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(DC)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(DC)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Florida.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(FL,function(d){
                          return d.date;
                      }),
                      d3.max(FL,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(FL,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(FL,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Florida";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(FL)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(FL)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Georgia.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(GA,function(d){
                          return d.date;
                      }),
                      d3.max(GA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(GA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(GA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Georgia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(GA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(GA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Hawaii.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(HI,function(d){
                          return d.date;
                      }),
                      d3.max(HI,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(HI,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(HI,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Hawaii";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(HI)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(HI)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Idaho.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(ID,function(d){
                          return d.date;
                      }),
                      d3.max(ID,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(ID,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(ID,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Idaho";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(ID)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(ID)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Illinois.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(IL,function(d){
                          return d.date;
                      }),
                      d3.max(IL,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(IL,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(IL,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Illinois";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(IL)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(IL)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Indiana.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(IN,function(d){
                          return d.date;
                      }),
                      d3.max(IN,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(IN,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(IN,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Indiana";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(IN)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(IN)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Iowa.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(IA,function(d){
                          return d.date;
                      }),
                      d3.max(IA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(IA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(IA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Iowa";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(IA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(IA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Kansas.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(KS,function(d){
                          return d.date;
                      }),
                      d3.max(KS,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(KS,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(KS,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Kansas";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(KS)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(KS)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Kentucky.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(KY,function(d){
                          return d.date;
                      }),
                      d3.max(KY,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(KY,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(KY,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Kentucky";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(KY)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(KY)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Louisiana.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(LA,function(d){
                          return d.date;
                      }),
                      d3.max(LA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(LA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(LA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Louisiana";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(LA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(LA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Maine.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(ME,function(d){
                          return d.date;
                      }),
                      d3.max(ME,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(ME,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(ME,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Maine";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(ME)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(ME)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Maryland.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MD,function(d){
                          return d.date;
                      }),
                      d3.max(MD,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MD,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MD,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Maryland";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MD)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MD)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Massachusetts.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MA,function(d){
                          return d.date;
                      }),
                      d3.max(MA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Massachusetts";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Michigan.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MI,function(d){
                          return d.date;
                      }),
                      d3.max(MI,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MI,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MI,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Michigan";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MI)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MI)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Minnesota.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MN,function(d){
                          return d.date;
                      }),
                      d3.max(MN,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MN,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MN,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Minnesota";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MN)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MN)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Mississippi.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MS,function(d){
                          return d.date;
                      }),
                      d3.max(MS,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MS,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MS,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Mississippi";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MS)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MS)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Missouri.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MO,function(d){
                          return d.date;
                      }),
                      d3.max(MO,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MO,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MO,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Missouri";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MO)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MO)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Montana.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(MT,function(d){
                          return d.date;
                      }),
                      d3.max(MT,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(MT,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(MT,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Montana";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(MT)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(MT)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Nebraska.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NE,function(d){
                          return d.date;
                      }),
                      d3.max(NE,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NE,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NE,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Nebraska";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NE)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NE)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

DistrictOfColumbia.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(DC,function(d){
                          return d.date;
                      }),
                      d3.max(DC,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(DC,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(DC,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="District of Columbia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(DC)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(DC)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Nevada.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NV,function(d){
                          return d.date;
                      }),
                      d3.max(NV,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NV,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NV,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Nevada";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NV)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NV)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


NewHampshire.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NH,function(d){
                          return d.date;
                      }),
                      d3.max(NH,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NH,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NH,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="New Hampshire";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NH)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NH)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

NewJersey.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NJ,function(d){
                          return d.date;
                      }),
                      d3.max(NJ,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NJ,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NJ,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="New Jersey";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NJ)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NJ)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

NewMexico.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NM,function(d){
                          return d.date;
                      }),
                      d3.max(NM,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NM,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NM,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="New Mexico";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NM)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NM)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

NewYork.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NY,function(d){
                          return d.date;
                      }),
                      d3.max(NY,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NY,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NY,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="New York";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NY)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NY)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

NorthCarolina.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(NC,function(d){
                          return d.date;
                      }),
                      d3.max(NC,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(NC,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(NC,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="North Carolina";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(NC)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(NC)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

NorthDakota.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(ND,function(d){
                          return d.date;
                      }),
                      d3.max(ND,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(ND,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(ND,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="North Dakota";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(ND)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(ND)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Ohio.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(OH,function(d){
                          return d.date;
                      }),
                      d3.max(OH,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(OH,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(OH,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Ohio";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(OH)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(OH)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Oklahoma.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(OK,function(d){
                          return d.date;
                      }),
                      d3.max(OK,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(OK,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(OK,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Oklahoma";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(OK)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(OK)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Oregon.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(OR,function(d){
                          return d.date;
                      }),
                      d3.max(OR,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(OR,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(OR,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Oregon";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(OR)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(OR)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Pennsylvania.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(PA,function(d){
                          return d.date;
                      }),
                      d3.max(PA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(PA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(PA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Pennsylvania";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(PA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(PA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


RhodeIsland.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(RI,function(d){
                          return d.date;
                      }),
                      d3.max(RI,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(RI,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(RI,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Rhode Island";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(RI)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(RI)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

SouthCarolina.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(SC,function(d){
                          return d.date;
                      }),
                      d3.max(SC,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(SC,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(SC,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="South Carolina";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(SC)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(SC)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

SouthDakota.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(SD,function(d){
                          return d.date;
                      }),
                      d3.max(SD,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(SD,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(SD,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="South Dakota";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(SD)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(SD)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})


Tennessee.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(TN,function(d){
                          return d.date;
                      }),
                      d3.max(TN,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(TN,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(TN,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Tennessee";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(TN)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(TN)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Texas.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(TX,function(d){
                          return d.date;
                      }),
                      d3.max(TX,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(TX,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(TX,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Texas";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(TX)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(TX)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Utah.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(UT,function(d){
                          return d.date;
                      }),
                      d3.max(UT,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(UT,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(UT,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Utah";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(UT)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(UT)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Vermont.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(VT,function(d){
                          return d.date;
                      }),
                      d3.max(VT,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(VT,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(VT,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Vermont";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(VT)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(VT)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Virginia.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(VA,function(d){
                          return d.date;
                      }),
                      d3.max(VA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(VA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(VA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Virginia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(VA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(VA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

WestVirginia.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(WV,function(d){
                          return d.date;
                      }),
                      d3.max(WV,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(WV,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(WV,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="West Virginia";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(WV)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(WV)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Washington.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(WA,function(d){
                          return d.date;
                      }),
                      d3.max(WA,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(WA,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(WA,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Washington";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(WA)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(WA)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Wisconsin.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(WI,function(d){
                          return d.date;
                      }),
                      d3.max(WI,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(WI,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(WI,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Wisconsin";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(WI)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(WI)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})

Wyoming.on("mouseover",function(){
    console.log("success");
    svg4.select("#gline").remove()
    svg4.select("#gtimeHeading").remove();
    svg4.select(".yLineAxis").remove();
    svg4.select(".xLineAxis").remove();
    svg4.select(".yLineAxis2").remove();
    svg4.select(".xLineAxis2").remove();


    xLineScale=d3.scaleTime()
                  .domain([
                      d3.min(WY,function(d){
                          return d.date;
                      }),
                      d3.max(WY,function(d){
                          return d.date;
                      })
                  ])
                  .range([0,timeWidth*0.35]);
    
    yLineScale=d3.scaleLinear()
                  .domain([0,d3.max(WY,function(d){
                    if (d.positive===""){return 0};
                      return +d.positive;
                  }
                    )])
                 .range([timeHeight*0.5,0]);
    

    line=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift;})
            .y(function(d){
                return yLineScale(+d.positive)+ytrendShift;})

    

    yLineScale2=d3.scaleLinear()
                .domain([0,d3.max(WY,function(d){
                  if (d.death===""){return 0};
                    return +d.death;
                }
                  )])
               .range([timeHeight*0.5,0]);

    line2=d3.line()
            .x(function(d){return xLineScale(d.date)+xtrendShift2;})
            .y(function(d){
                return yLineScale2(+d.death)+ytrendShift2;})

    timeHeading="Wyoming";
    
    svg4.append("g")
        .attr("id","gline")
        .append("path")
         .datum(WY)
         .attr("class","line")
         .attr("d",line);

    svg4.select("#gline")
        .append("path")
        .datum(WY)
        .attr("class","line2")
        .attr("d",line2);


  yLineAxis=d3.axisLeft().scale(yLineScale);
  xLineAxis=d3.axisBottom().scale(xLineScale);
  yLineAxis2=d3.axisLeft().scale(yLineScale2);
  

  

  svg4.append("g").attr("class","yLineAxis").attr("transform","translate("+xCoordYLineScale+","+yCoordYLineScale+")").call(yLineAxis);
  svg4.append("g").attr("class","xLineAxis").attr("transform","translate("+xCoordXLineScale+","+yCoordXLineScale+")").call(xLineAxis);
  svg4.append("g").attr("class","yLineAxis2").attr("transform","translate("+xCoordYLineScale2+","+yCoordYLineScale2+")").call(yLineAxis2);
  svg4.append("g").attr("class","xLineAxis2").attr("transform","translate("+xCoordXLineScale2+","+yCoordXLineScale2+")").call(xLineAxis);

  svg4.select(".xLineAxis").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");
  svg4.select(".xLineAxis2").selectAll("text").style("text-anchor", "end").attr("transform","rotate(-45)");

  svg4.append("g").attr("id","gtimeHeading").append("text")
                  .attr("id","timeHeading")
                  .attr("x",xtimeHeading)
                  .attr("y",ytimeHeading)
                  .text(timeHeading);
  
})
//*********************** The Different Interactive Buttons Are Here************************** 

var nextButton1=d3.select("#nextButton1");
var backButton1=d3.select("#backButton1");
var totalcasesButton=d3.selectAll(".TotalCases");
var totaldeathsButton=d3.selectAll(".TotalDeaths");
var scaledcasesButton=d3.selectAll(".scaledTotalCases");
var scaleddeathsButton=d3.selectAll(".scaledDeaths");


console.log(nextButton1);
console.log(totalcasesButton);
//********* The Next Button Is Defined Here******************** *

nextButton1.on("click", function() {
//console.log("next before if/else branch");
//Refreshig the dataset

containerColor=[colorHighlight,colorHighlight2,colorHighlight3,colorHighlight4];
//console.log("next button before for loop");

let i=1;


//console.log("next after mode is 1");
//console.log("iteration is",iteration);
if(iteration<dataTotalCases.length){

    d3.selectAll(".tiles")
    .style("stroke", "black")
    .style("fill", "#69b3a2");



if(mode==1){



//console.log("mode 1 loop");
barChart.selectAll("rect").remove();
barChart.selectAll("text").remove();
svg1.selectAll(".baryAxis").remove();

let magnitude=[];

let temp=iteration;
while(i<=20 && iteration<dataTotalCases.length){
    if(dataTotalCases[iteration].totalCases!=="No data"){
        console.log(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        magnitude.push(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        i++;
    }
    iteration++;
}
i=1;
console.log(magnitude);
maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
console.log(maxCases)
yScale=d3.scaleLinear()//scale for the first bar chart
.domain([0,maxCases])
.range([0,heightBar]);

yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
.domain([maxCases,0])
.range([0,heightBar])

yAxis=d3.axisLeft().scale(yScale_Oriented);
svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

iteration=temp;

while(i<=20 && iteration<dataTotalCases.length){
    if (dataTotalCases[iteration].totalCases!=="No data"){
    let xCord=barXCoordInitial+(i-1)*25
    barChart.append("rect")
    .attr("x",xCord)
    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
    .attr("width", 20)
    .attr("height",  yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
    .attr("class","totalBars")
    .attr("id",function(){
        
        if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
        return 'UVirginislands_';
    });

    barChart.append("text")
            .attr("style","text-anchor:end")
            .attr("class","barLabel")
            .attr("x",xCord)
            .attr("y", barLabelYCoord)
            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
            .text(dataTotalCases[iteration].Location);

    d3.select(tileSelect(dataTotalCases[iteration].Location))
        .style("fill",colorHighlight);
    i++; 
                    }
    iteration++;
    //console.log(iteration);
            }
        }
//insert code here
    }
if (mode==2){

    console.log("mode 2 for loop");
    
if(iteration<dataTotalCases.length){

    barChart.selectAll("rect").remove();
    barChart.selectAll("text").remove();
    svg1.selectAll(".baryAxis").remove();
    let magnitude=[];
    let temp=iteration;
    while(i<=20 && iteration<dataTotalCases.length){
     if(dataTotalCases[iteration].Deaths!=="No data"){
        console.log(parseFloat(dataTotalCases[iteration].Deaths.split(",").join("")));
        magnitude.push(parseFloat(dataTotalCases[iteration].Deaths.split(",").join("")));
        i++;
    }
    iteration++;
    }
    i=1;
    console.log(magnitude);
    maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
    console.log(maxCases)
    yScale=d3.scaleLinear()//scale for the first bar chart
    .domain([0,maxCases])
    .range([0,heightBar]);

    yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
    .domain([maxCases,0])
    .range([0,heightBar])

    yAxis=d3.axisLeft().scale(yScale_Oriented);
    svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

    iteration=temp;

    while(i<=20 && iteration<dataTotalCases.length){
        if (dataTotalCases[iteration].Deaths!=="No data"){
        let xCord=barXCoordInitial+(i-1)*25
        barChart.append("rect")
        .attr("x",xCord)
        .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].Deaths.split(",").join(""))))
        .attr("width", 20)
        .attr("height",  yScale(parseFloat(dataTotalCases[iteration].Deaths.split(",").join(""))))
        .attr("class","deathBars")
        .attr("id",function(){
        
            if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
            return 'UVirginislands_';
        });

        barChart.append("text")
                .attr("style","text-anchor:end")
                .attr("class","barLabel")
                .attr("x",xCord)
                .attr("y", barLabelYCoord)
                .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                .text(dataTotalCases[iteration].Location);

        d3.select(tileSelect(dataTotalCases[iteration].Location))
            .style("fill",colorHighlight2);
        
        i++; 
                        }
        iteration++;
        //console.log(iteration);
                }
            }

    } 
    else if(mode==3){



        console.log("mode 3 loop");
        if(iteration<dataTotalCases.length){

            i=0;
            barChart.selectAll("rect").remove();
            barChart.selectAll("text").remove();
            svg1.selectAll(".baryAxis").remove();
            let magnitude=[];
            let temp=iteration;
            while(i<20 && iteration<dataTotalCases.length){
             if(dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                console.log(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join("")));
                magnitude.push(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join("")));
                i++;
            }
            iteration++;
            }
            i=0;
            console.log(magnitude);
            maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
            console.log(maxCases)
            yScale=d3.scaleLinear()//scale for the first bar chart
            .domain([0,maxCases])
            .range([0,heightBar]);
        
            yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
            .domain([maxCases,0])
            .range([0,heightBar])
        
            yAxis=d3.axisLeft().scale(yScale_Oriented);
            svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);
        
            iteration=temp;
            
        
            while(i<20 && iteration<dataTotalCases.length){
                if (dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                let xCord=barXCoordInitial+(i)*25
                barChart.append("rect")
                .attr("x",xCord)
                .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join(""))))
                .attr("width", 20)
                .attr("height",  yScale(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join(""))))
                .attr("class","scaledCaseBars")
                .attr("id",function(){
        
                    if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                    return 'UVirginislands_';
                });
        
                barChart.append("text")
                        .attr("style","text-anchor:end")
                        .attr("class","barLabel")
                        .attr("x",xCord)
                        .attr("y", barLabelYCoord)
                        .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                        .text(dataTotalCases[iteration].Location);
                
                d3.select(tileSelect(dataTotalCases[iteration].Location))
                .style("fill",colorHighlight3);
                
                i++; 
                                }
                iteration++;
                //console.log(iteration);
                        }
                    }

    }
    else if(mode==4){
        

        console.log("mode 4 loop");
        if(iteration<dataTotalCases.length){
            i=0;
            barChart.selectAll("rect").remove();
            barChart.selectAll("text").remove();
            svg1.selectAll(".baryAxis").remove();
            let magnitude=[];
            let temp=iteration;
            while(i<20 && iteration<dataTotalCases.length){
             if(dataTotalCases[iteration].DeathScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                console.log(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join("")));
                magnitude.push(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join("")));
                i++;
            }
            iteration++;
            }
            i=0;
            console.log(magnitude);
            maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
            console.log(maxCases)
            yScale=d3.scaleLinear()//scale for the first bar chart
            .domain([0,maxCases])
            .range([0,heightBar]);
        
            yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
            .domain([maxCases,0])
            .range([0,heightBar])
        
            yAxis=d3.axisLeft().scale(yScale_Oriented);
            svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);
        
            iteration=temp;
            
        
            while(i<20 && iteration<dataTotalCases.length){
                if (dataTotalCases[iteration].DeathScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                let xCord=barXCoordInitial+(i)*25
                barChart.append("rect")
                .attr("x",xCord)
                .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join(""))))
                .attr("width", 20)
                .attr("height",  yScale(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join(""))))
                .attr("class","scaledDeathBars")
                .attr("id",function(){
        
                    if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                    return 'UVirginislands_';
                });
        
                barChart.append("text")
                        .attr("style","text-anchor:end")
                        .attr("class","barLabel")
                        .attr("x",xCord)
                        .attr("y", barLabelYCoord)
                        .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                        .text(dataTotalCases[iteration].Location);
                
                d3.select(tileSelect(dataTotalCases[iteration].Location))
                .style("fill",colorHighlight4);
                
                i++; 
                    }
                iteration++;
                //console.log(iteration);
                }
            }

    }

bars=svg1.selectAll("rect")
    .on("mouseover",function(){
    
        //console.log(this.id);
        //console.log("mode");
        
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");
    
          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
    
    
             }
    
          }
         // console.log("works");
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");
    
            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",containerColor[mode-1])
            .style("font-weight","bolder")
            .attr("class","treeNames");
        
    })
    .on("mouseout",function(){
    
      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",containerColor[mode-1]);
      
          d3.select("#"+tilesId)
          .style("fill",containerColor[mode-1]);
       svg2.selectAll(".treeNames").remove();
    });
    
});
//*******************************************************


//*******The Back Button Is Defined Here******************************

backButton1.on("click",function(){
    let i=1;
    
    containerColor=[colorHighlight,colorHighlight2,colorHighlight3,colorHighlight4];
    //console.log("back button clicked, before loop");



   //console.log("this is mode",mode);

    //console.log("before button before if/else branch");
    if(mode==1){
        //console.log(" back button when mode is 1")
    d3.selectAll(".tiles")
      .style("stroke", "black")
      .style("fill", "#69b3a2")

    //console.log("iteration on click of back button is: "+iteration);
    while (i<=40){

    
        iteration--;
        if(iteration<0){
            iteration=1;
            break;
            }
        if (dataTotalCases[iteration].totalCases!=="No data"){
            i++;
        }
    }



    //console.log("after backward step is:"+iteration);

    i=1;

    if(iteration<dataTotalCases.length){

        barChart.selectAll("rect").remove();
        barChart.selectAll("text").remove();
        svg1.selectAll(".baryAxis").remove();

    let magnitude=[];

    let temp=iteration;
    while(i<=20 && iteration<dataTotalCases.length){
        if(dataTotalCases[iteration].totalCases!=="No data"){
        console.log(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        magnitude.push(parseFloat(dataTotalCases[iteration].totalCases.split(",").join("")));
        i++;
    }
    iteration++;
    }
    i=1;
    console.log(magnitude);
    maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
    console.log(maxCases)
    yScale=d3.scaleLinear()//scale for the first bar chart
    .domain([0,maxCases])
    .range([0,heightBar]);

    yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
    .domain([maxCases,0])
    .range([0,heightBar])

    yAxis=d3.axisLeft().scale(yScale_Oriented);
    svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

    iteration=temp;
    
        while(i<=20 && iteration<dataTotalCases.length){
            if (dataTotalCases[iteration].totalCases!=="No data"){
            let xCord=barXCoordInitial+(i-1)*25
                barChart.append("rect")
                .attr("x",xCord)
                .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
                .attr("width", 20)
                .attr("height",  yScale(parseFloat(dataTotalCases[iteration].totalCases.split(",").join(""))))
                .attr("class","totalBars")
                .attr("id",function(){
        
                    if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                    return 'UVirginislands_';
                });
        
                barChart.append("text")
                        .attr("style","text-anchor:end")
                        .attr("class","barLabel")
                        .attr("x",xCord)
                        .attr("y", barLabelYCoord)
                        .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                        .text(dataTotalCases[iteration].Location);

                d3.select(tileSelect(dataTotalCases[iteration].Location))
                        .style("fill",colorHighlight);

            i++; 

            }
            iteration++;
            //console.log(iteration);
                }
            }
        } 
        else if(mode==2){

            d3.selectAll(".tiles")
            .style("stroke", "black")
            .style("fill", "#69b3a2")

            //console.log("back button when mode is 2");
            //console.log("success");
            while (i<=40){
                iteration--;
                if(iteration<0){
                    iteration=1;
                    break;
                    }
                if (dataTotalCases[iteration].Deaths!=="No data"){
                    i++;
                }
            }
    
            //console.log("after backward step is:"+iteration);
    
            i=1;
    
            if(iteration<dataTotalCases.length){
    
                barChart.selectAll("rect").remove();
                barChart.selectAll("text").remove();
                svg1.selectAll(".baryAxis").remove();
    let magnitude=[];
    let temp=iteration;
    while(i<=20 && iteration<dataTotalCases.length){
     if(dataTotalCases[iteration].Deaths!=="No data"){
        console.log(parseFloat(dataTotalCases[iteration].Deaths.split(",").join("")));
        magnitude.push(parseFloat(dataTotalCases[iteration].Deaths.split(",").join("")));
        i++;
    }
    iteration++;
    }
    i=1;
    console.log(magnitude);
    maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
    console.log(maxCases)
    yScale=d3.scaleLinear()//scale for the first bar chart
    .domain([0,maxCases])
    .range([0,heightBar]);

    yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
    .domain([maxCases,0])
    .range([0,heightBar])

    yAxis=d3.axisLeft().scale(yScale_Oriented);
    svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

    iteration=temp;
            
                while(i<=20 && iteration<dataTotalCases.length){
                    if (dataTotalCases[iteration].Deaths!=="No data"){
                    let xCord=barXCoordInitial+(i-1)*25
                    barChart.append("rect")
                    .attr("x",xCord)
                    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].Deaths.split(",").join(""))))
                    .attr("width", 20)
                    .attr("height",  yScale(parseFloat(dataTotalCases[iteration].Deaths.split(",").join(""))))
                    .attr("class","deathBars")
                    .attr("id",function(){
        
                        if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                        return 'UVirginislands_';
                    });
            
                    barChart.append("text")
                            .attr("style","text-anchor:end")
                            .attr("class","barLabel")
                            .attr("x",xCord)
                            .attr("y", barLabelYCoord)
                            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                            .text(dataTotalCases[iteration].Location);

                    d3.select(tileSelect(dataTotalCases[iteration].Location))
                    .style("fill",colorHighlight2);
                    
                    i++; 
                    }
                    iteration++;
                    //console.log(iteration);
                        }
                }
        }
        else if(mode==3){

            d3.selectAll(".tiles")
            .style("stroke", "black")
            .style("fill", "#69b3a2")

            while (i<=40){
                iteration--;
                if(iteration<0){
                    iteration=0;
                    break;
                    }
                if (dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                    i++;
                }
            }
    
            //console.log("after backward step is:"+iteration);
    
            i=0;
    
            if(iteration<dataTotalCases.length){
    
                barChart.selectAll("rect").remove();
                barChart.selectAll("text").remove();
                svg1.selectAll(".baryAxis").remove();
            let magnitude=[];
            let temp=iteration;
            while(i<20 && iteration<dataTotalCases.length){
             if(dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                console.log(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join("")));
                magnitude.push(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join("")));
                i++;
            }
            iteration++;
            }
            i=0;
            console.log(magnitude);
            maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
            console.log(maxCases)
            yScale=d3.scaleLinear()//scale for the first bar chart
            .domain([0,maxCases])
            .range([0,heightBar]);
        
            yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
            .domain([maxCases,0])
            .range([0,heightBar])
        
            yAxis=d3.axisLeft().scale(yScale_Oriented);
            svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);
        
            iteration=temp;
            
        
            
                while(i<=19 && iteration<dataTotalCases.length){
                    if (dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                    let xCord=barXCoordInitial+(i)*25
                    barChart.append("rect")
                    .attr("x",xCord)
                    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join(""))))
                    .attr("width", 20)
                    .attr("height",  yScale(parseFloat(dataTotalCases[iteration].CaseScaled.split(",").join(""))))
                    .attr("class","scaledCaseBars")
                    .attr("id",function(){
        
                        if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                        return 'UVirginislands_';
                    });
            
                    barChart.append("text")
                            .attr("style","text-anchor:end")
                            .attr("class","barLabel")
                            .attr("x",xCord)
                            .attr("y", barLabelYCoord)
                            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                            .text(dataTotalCases[iteration].Location);

                    d3.select(tileSelect(dataTotalCases[iteration].Location))
                    .style("fill",colorHighlight3);
                    
                    i++; 
                    }
                    iteration++;
                    //console.log(iteration);
                        }
                }
        }
        else if(mode==4){

            d3.selectAll(".tiles")
            .style("stroke", "black")
            .style("fill", "#69b3a2")

            while (i<=40){
                iteration--;
                if(iteration<0){
                    iteration=0;
                    break;
                    }
                if (dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                    i++;
                }
            }
    
            //console.log("after backward step is:"+iteration);
    
            i=0;
    
            if(iteration<dataTotalCases.length){
    
                barChart.selectAll("rect").remove();
                barChart.selectAll("text").remove();
                svg1.selectAll(".baryAxis").remove();
                let magnitude=[];
                let temp=iteration;
                while(i<20 && iteration<dataTotalCases.length){
                 if(dataTotalCases[iteration].CaseScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                    console.log(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join("")));
                    magnitude.push(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join("")));
                    i++;
                }
                iteration++;
                }
                i=0;
                console.log(magnitude);
                maxCases=magnitude.reduce((a,b)=> Math.max(a,b))*1.2;
                console.log(maxCases)
                yScale=d3.scaleLinear()//scale for the first bar chart
                .domain([0,maxCases])
                .range([0,heightBar]);
            
                yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
                .domain([maxCases,0])
                .range([0,heightBar])
            
                yAxis=d3.axisLeft().scale(yScale_Oriented);
                svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);
            
                iteration=temp;
            
                while(i<=19 && iteration<dataTotalCases.length){
                    if (dataTotalCases[iteration].DeathScaled!=="No data" && dataTotalCases[iteration].Location!=="World"){
                    let xCord=barXCoordInitial+(i)*25
                    barChart.append("rect")
                    .attr("x",xCord)
                    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join(""))))
                    .attr("width", 20)
                    .attr("height",  yScale(parseFloat(dataTotalCases[iteration].DeathScaled.split(",").join(""))))
                    .attr("class","scaledDeathBars")
                    .attr("id",function(){
        
                        if(dataTotalCases[iteration].Location!=="U.S. Virgin Islands"){return dataTotalCases[iteration].Location.split(" ").join("")+"_";}
                        return 'UVirginislands_';
                    });
            
                    barChart.append("text")
                            .attr("style","text-anchor:end")
                            .attr("class","barLabel")
                            .attr("x",xCord)
                            .attr("y", barLabelYCoord)
                            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                            .text(dataTotalCases[iteration].Location);

                    d3.select(tileSelect(dataTotalCases[iteration].Location))
                    .style("fill",colorHighlight4);
                    
                    i++; 
                    }
                    iteration++;
                    //console.log(iteration);
                        }
                }

        }
        bars=svg1.selectAll("rect")
        .on("mouseover",function(){
        
            //console.log(this.id);
            //console.log("mode");
            
            let tilesId=this.id.slice(0,this.id.length-1);
            //console.log(tilesId);
            d3.select(this)
              .style("fill","orange");
            d3.select("#"+tilesId)
              .style("fill","orange");
        
              let arrayNodes=root.leaves();
              let x;
              let y;
              let nation;
              svg2.selectAll(".treeNames")
                  .remove();
              for (let i=0;i<arrayNodes.length;i++){
                 //console.log(arrayNodes[i]);
                 if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                     x=arrayNodes[i].x0;
                     y=arrayNodes[i].y0;
                     nation=arrayNodes[i]['id'];
                     //console.log(this.id);
                 break;
                 }
                 if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                     x=arrayNodes[i].x0;
                     y=arrayNodes[i].y0;
                     nation=arrayNodes[i]['id'];
                     //console.log(this.id);
                 break;
        
        
                 }
        
              }
             // console.log("works");
              svg2.append("text")
                .attr("x", x+10)    // +10 to adjust position (more right)
                .attr("y", y+20)    // +20 to adjust position (lower)
                .text(nation)
                .style("font-size", treelabelSize)
                .style("fill",treelabelColor)
                .style("font-weight","bolder")
                .attr("class","treeNames");
        
                svg2.append("text")
                .attr("x", 210)    // +10 to adjust position (more right)
                .attr("y", 650)    // +20 to adjust position (lower)
                .text(nation)
                .style("font-size","25px")
                .style("fill",containerColor[mode-1])
                .style("font-weight","bolder")
                .attr("class","treeNames");
            
        })
        .on("mouseout",function(){
        
          let tilesId=this.id.slice(0,this.id.length-1);
            d3.select(this)
              .style("fill",containerColor[mode-1]);
          
              d3.select("#"+tilesId)
              .style("fill",containerColor[mode-1]);
           svg2.selectAll(".treeNames").remove();
        });
    

});
//***********************************************************


//*****************The Total Cases Button Mode Is Defined Here*****************************

totalcasesButton.on("click",function(){
    mode=1;
    iteration=21;
    barTitle="Total Covid Cases";
    //console.log("click registered");

    d3.selectAll(".tiles")
    .style("stroke", "black")
    .style("fill", "#69b3a2");


    dataTotalCases=dataTotalCases.sort((a,b)=> -parseFloat(a.totalCases.split(",").join(""))+parseFloat(b.totalCases.split(",").join("")));

    maxCases=parseFloat((dataTotalCases[1].totalCases.split(",").join("")))*1.2;
    //console.log(dataTotalCases);
    //removing the previous information fro the treemap
    svg2.selectAll("rect").remove();
    svg2.selectAll("text").remove();
    //remaking the treemap according to mode
    var root=d3.stratify()
    .id(function(d){return d.name;})
    .parentId(function(d){return d.parent;})
    (totalCasesTreeMap);



    root.sum(function(d){return parseFloat(d.value.split(",").join(""))});


    let treemap=d3.treemap()
                    .size([treeMapWidth,treeMapHeight])
                    .padding(4)
                    (root);


                    svg2
                    .selectAll("rect")
                    .data(root.leaves())
                    .enter()
                    .append("rect")
                      .attr('x', function (d) {
                          //console.log("this is what you are looking for: ",d['id']);
                           return d.x0; })
                      .attr('y', function (d) { return d.y0; })
                      .attr('width', function (d) { return d.x1 - d.x0; })
                      .attr('height', function (d) { return d.y1 - d.y0; })
                      .attr('class','tiles')
                      .attr('id' , function(d){
                         if (d['id']=="U.S. Virgin Islands"){return "UVirginislands"};
                         return d['id'].split(" ").join("");
                      })
                      .style("stroke", "black")
                      .style("fill", "#69b3a2");

    //removing the barchart

    barChart.selectAll("rect").remove();
    barChart.selectAll("text").remove();
    svg1.selectAll(".baryAxis").remove();
    svg1.selectAll(".barTitle").remove();

  

    svg1.append("g").append("text")
    .attr("class","barTitle")
    .attr("transform","translate("+barTitleXCoord+","+barTitleYCoord+")")
    .text(""+barTitle+"");


    //remaking the barchart based on the mode
    yScale=d3.scaleLinear()//scale for the first bar chart
    .domain([0,maxCases])
    .range([0,heightBar]);

    yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
    .domain([maxCases,0])
    .range([0,heightBar])

    yAxis=d3.axisLeft().scale(yScale_Oriented);

    svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis)

    for(i=1;i<=20;i++){

        let xCord=barXCoordInitial+(i-1)*25
        barChart.append("rect")
        .attr("x",xCord)
        .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[i].totalCases.split(",").join(""))))
        .attr("width", 20)
        .attr("height",  yScale(parseFloat(dataTotalCases[i].totalCases.split(",").join(""))))
        .attr("class","totalBars")
        .attr("id",function(){
        
            if(dataTotalCases[i].Location!=="U.S. Virgin Islands"){return dataTotalCases[i].Location.split(" ").join("")+"_";}
            return 'UVirginislands_';
        });

        barChart.append("text")
                .attr("style","text-anchor:end")
                .attr("class","barLabel")
                .attr("x",xCord)
                .attr("y", barLabelYCoord)
                .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                .text(dataTotalCases[i].Location);

        d3.select(tileSelect(dataTotalCases[i].Location))
                .style("fill", colorHighlight);

    }


    bars=svg1.selectAll("rect")
    .on("mouseover",function(){

        //console.log(this.id);
        //console.log("mode");
        
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");

          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;


             }

          }
         // console.log("works");
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");

            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",colorHighlight)
            .style("font-weight","bolder")
            .attr("class","treeNames");
        
    })
    .on("mouseout",function(){

      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",colorHighlight);
      
          d3.select("#"+tilesId)
          .style("fill",colorHighlight);
       svg2.selectAll(".treeNames").remove();
    });


svg2.selectAll("rect").on("mouseover",function(d){
      let arrayNodes=root.leaves();
      let x;
      let y;
      let nation;
      svg2.selectAll(".treeNames")
          .remove();
      for (let i=0;i<arrayNodes.length;i++){
         //console.log(arrayNodes[i]);
         if(arrayNodes[i]['id'].split(" ").join("")==this.id) {
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
         if(this.id=="UVirginislands" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
      }
     // console.log("works");
     
      svg2.append("text")
        .attr("x", x+10)    // +10 to adjust position (more right)
        .attr("y", y+20)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size", treelabelSize)
        .style("fill",treelabelColor)
        .style("font-weight","bolder")
        .attr("class","treeNames");

        svg2.append("text")
        .attr("x", 210)    // +10 to adjust position (more right)
        .attr("y", 650)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size","25px")
        .style("fill",colorHighlight)
        .style("font-weight","bolder")
        .attr("class","treeNames");
      colorOld=this.style.fill;
      d3.select(this)
        .style("fill","orange");

      d3.select("#"+this.id+"_")
          .style("fill","orange")

  })
  .on("mouseout",function(){
     d3.select(this)
        .style("fill",colorOld);
        d3.select("#"+this.id+"_")
        .style("fill",colorOld);
 });


});

 //*****************The Total Deaths Button Mode Is Defined Here*****************************


 totaldeathsButton.on("click",function(){

    mode=2;
    iteration=21;
    barTitle="Total Covid Deaths";

    d3.selectAll(".tiles")
    .style("stroke", "black")
    .style("fill", "#69b3a2");

    dataTotalCases=dataTotalCases.sort((a,b)=> -parseFloat(a.Deaths.split(",").join(""))+parseFloat(b.Deaths.split(",").join("")));

    maxDeaths=parseFloat(dataTotalCases[1].Deaths.split(",").join(""))*1.2;
    

     //removing the previous information fro the treemap
     svg2.selectAll("rect").remove();
     svg2.selectAll("text").remove();
     //remaking the treemap according to mode
     var root=d3.stratify()
     .id(function(d){return d.name;})
     .parentId(function(d){return d.parent;})
     (totalDeathTreeMap);



     root.sum(function(d){return parseFloat(d.value.split(",").join(""))}).sort((a,b)=>{

       return -parseFloat(a.value)+parseFloat(b.value)});


     let treemap=d3.treemap()
                     .size([treeMapWidth,treeMapHeight])
                     .padding(4)
                     (root);


                     svg2
                     .selectAll("rect")
                     .data(root.leaves())
                     .enter()
                     .append("rect")
                       .attr('x', function (d) {
                           //console.log("this is what you are looking for: ",d['id']);
                            return d.x0; })
                       .attr('y', function (d) { return d.y0; })
                       .attr('width', function (d) { return d.x1 - d.x0; })
                       .attr('height', function (d) { return d.y1 - d.y0; })
                       .attr('class','tiles')
                       .attr('id' , function(d){
                          if (d['id']=="U.S. Virgin Islands"){return "UVirginislands"};
                          return d['id'].split(" ").join("");
                       })
                       .style("stroke", "black")
                       .style("fill", "#69b3a2");


    console.log("click registered");
    barChart.selectAll("rect").remove();
    barChart.selectAll("text").remove();
    svg1.selectAll(".baryAxis").remove();
    svg1.selectAll(".barTitle").remove();


    svg1.append("g").append("text")
    .attr("class","barTitle")
    .attr("transform","translate("+barTitleXCoord+","+barTitleYCoord+")")
    .text(""+barTitle+"");


    yScale=d3.scaleLinear()//scale for the first bar chart
    .domain([0,maxDeaths])
    .range([0,heightBar]);


    yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
    .domain([maxDeaths,0])
    .range([0,heightBar])

    yAxis=d3.axisLeft().scale(yScale_Oriented);

    svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis)

    for(i=1;i<=20;i++){

        let xCord=barXCoordInitial+(i-1)*25
        barChart.append("rect")
        .attr("x",xCord)
        .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[i].Deaths.split(",").join(""))))
        .attr("width", 20)
        .attr("height",  yScale(parseFloat(dataTotalCases[i].Deaths.split(",").join(""))))
        .attr("class","deathBars")
        .attr("id",function(){
        
            if(dataTotalCases[i].Location!=="U.S. Virgin Islands"){return dataTotalCases[i].Location.split(" ").join("")+"_";}
            return 'UVirginislands_';
        });


        barChart.append("text")
                .attr("style","text-anchor:end")
                .attr("class","barLabel")
                .attr("x",xCord)
                .attr("y", barLabelYCoord)
                .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
                .text(dataTotalCases[i].Location);

        d3.select(tileSelect(dataTotalCases[i].Location))
            .style("fill",colorHighlight2);

    }

bars=svg1.selectAll("rect")
    .on("mouseover",function(){
        //console.log(this.id);
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");

          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;


             }

          }
         // console.log("works");
         
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");

            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",colorHighlight2)
            .style("font-weight","bolder")
            .attr("class","treeNames");
    })
    .on("mouseout",function(){

      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",colorHighlight2);
      
          d3.select("#"+tilesId)
          .style("fill",colorHighlight2);
       svg2.selectAll(".treeNames").remove();
    });


svg2.selectAll("rect").on("mouseover",function(d){
      let arrayNodes=root.leaves();
      let x;
      let y;
      let nation;
      svg2.selectAll(".treeNames")
          .remove();
      for (let i=0;i<arrayNodes.length;i++){
         //console.log(arrayNodes[i]);
         if(arrayNodes[i]['id'].split(" ").join("")==this.id) {
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
         if(this.id=="UVirginislands" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
      }
     // console.log("works");
     
      svg2.append("text")
        .attr("x", x+10)    // +10 to adjust position (more right)
        .attr("y", y+20)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size", treelabelSize)
        .style("fill",treelabelColor)
        .style("font-weight","bolder")
        .attr("class","treeNames");

        svg2.append("text")
        .attr("x", 210)    // +10 to adjust position (more right)
        .attr("y", 650)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size","25px")
        .style("fill",colorHighlight2)
        .style("font-weight","bolder")
        .attr("class","treeNames");
      colorOld=this.style.fill;
      d3.select(this)
        .style("fill","orange");

      d3.select("#"+this.id+"_")
          .style("fill","orange")

  })
  .on("mouseout",function(){
     d3.select(this)
        .style("fill",colorOld);
        d3.select("#"+this.id+"_")
        .style("fill",colorOld);
 });


 })


 //*****************The Total Scaled Cases Button Mode Is Defined Here*****************************

 scaledcasesButton.on("click",function(){
     mode=3;
     iteration=20;

     barTitle="Covid Cases As Percentage of Population";

     d3.selectAll(".tiles")
     .style("stroke", "black")
     .style("fill", "#69b3a2");


     dataTotalCases=dataTotalCases.sort((a,b)=> -parseFloat(a.CaseScaled.split(",").join(""))+parseFloat(b.CaseScaled.split(",").join("")));

     maxCasePercentage=parseFloat(dataTotalCases[0].CaseScaled.split(",").join(""))*1.2;

     console.log(dataTotalCases)

      //removing the previous information fro the treemap
    svg2.selectAll("rect").remove();
    svg2.selectAll("text").remove();
    //remaking the treemap according to mode
    var root=d3.stratify()
    .id(function(d){return d.name;})
    .parentId(function(d){return d.parent;})
    (scaledCasesTreeMap);


    console.log(root);
    root.sum(function(d){return parseFloat(d.value.split(",").join(""))}).sort((a,b)=>{

       return -parseFloat(a.value)+parseFloat(b.value)});


    let treemap=d3.treemap()
                    .size([treeMapWidth,treeMapHeight])
                    .padding(4)
                    (root);


                    svg2
                    .selectAll("rect")
                    .data(root.leaves())
                    .enter()
                    .append("rect")
                      .attr('x', function (d) {
                          //console.log("this is what you are looking for: ",d['id']);
                           return d.x0; })
                      .attr('y', function (d) { return d.y0; })
                      .attr('width', function (d) { return d.x1 - d.x0; })
                      .attr('height', function (d) { return d.y1 - d.y0; })
                      .attr('class','tiles')
                      .attr('id' , function(d){
                         if (d['id']=="U.S. Virgin Islands"){return "UVirginislands"};
                         return d['id'].split(" ").join("");
                      })
                      .style("stroke", "black")
                      .style("fill", "#69b3a2");


     console.log("click registered");
     barChart.selectAll("rect").remove();
     barChart.selectAll("text").remove();
     svg1.selectAll(".baryAxis").remove();
     svg1.selectAll(".barTitle").remove();


     svg1.append("g").append("text")
     .attr("class","barTitle")
     .attr("transform","translate("+barTitleXCoord+","+barTitleYCoord+")")
     .text(""+barTitle+"");

     yScale=d3.scaleLinear()//scale for the first bar chart
 .domain([0,maxCasePercentage])
 .range([0,heightBar]);


 yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
 .domain([maxCasePercentage,0])
 .range([0,heightBar]);

 yAxis=d3.axisLeft().scale(yScale_Oriented);

 svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis)

 for(i=0;i<20;i++){

     let xCord=barXCoordInitial+(i)*25
     barChart.append("rect")
     .attr("x",xCord)
     .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[i].CaseScaled.split(",").join(""))))
     .attr("width", 20)
     .attr("height",  yScale(parseFloat(dataTotalCases[i].CaseScaled.split(",").join(""))))
     .attr("class","scaledCaseBars")
     .attr("id",function(){
        
        if(dataTotalCases[i].Location!=="U.S. Virgin Islands"){return dataTotalCases[i].Location.split(" ").join("")+"_";}
        return 'UVirginislands_';
    });

     barChart.append("text")
             .attr("style","text-anchor:end")
             .attr("class","barLabel")
             .attr("x",xCord)
             .attr("y", barLabelYCoord)
             .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
             .text(dataTotalCases[i].Location);

    d3.select(tileSelect(dataTotalCases[i].Location))
            .style("fill",colorHighlight3);

    }



bars=svg1.selectAll("rect")
    .on("mouseover",function(){
        console.log(this.id);
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");

          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;


             }

          }
         // console.log("works");
         
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");

            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",colorHighlight3)
            .style("font-weight","bolder")
            .attr("class","treeNames");
    })
    .on("mouseout",function(){

      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",colorHighlight3);
      
          d3.select("#"+tilesId)
          .style("fill",colorHighlight3);
       svg2.selectAll(".treeNames").remove();
    });


svg2.selectAll("rect").on("mouseover",function(d){
      let arrayNodes=root.leaves();
      let x;
      let y;
      let nation;
      svg2.selectAll(".treeNames")
          .remove();
      for (let i=0;i<arrayNodes.length;i++){
         //console.log(arrayNodes[i]);
         if(arrayNodes[i]['id'].split(" ").join("")==this.id) {
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
         if(this.id=="UVirginislands" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
      }
     // console.log("works");
     
      svg2.append("text")
        .attr("x", x+10)    // +10 to adjust position (more right)
        .attr("y", y+20)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size", treelabelSize)
        .style("fill",treelabelColor)
        .style("font-weight","bolder")
        .attr("class","treeNames");

        svg2.append("text")
        .attr("x", 210)    // +10 to adjust position (more right)
        .attr("y", 650)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size","25px")
        .style("fill",colorHighlight3)
        .style("font-weight","bolder")
        .attr("class","treeNames");
      colorOld=this.style.fill;
      d3.select(this)
        .style("fill","orange");

      d3.select("#"+this.id+"_")
          .style("fill","orange")

  })
  .on("mouseout",function(){
     d3.select(this)
        .style("fill",colorOld);
        d3.select("#"+this.id+"_")
        .style("fill",colorOld);
 });


 });

 //*********************Total Scaled Deaths Button Defined here******************************** 

 scaleddeathsButton.on("click",function(){



    mode=4;
    iteration=20;
    barTitle="10,000 Covid Deaths As Percentage of Population";

    d3.selectAll(".tiles")
    .style("stroke", "black")
    .style("fill", "#69b3a2");

    dataTotalCases=dataTotalCases.sort((a,b)=> -parseFloat(a.DeathScaled.split(",").join(""))+parseFloat(b.DeathScaled.split(",").join("")));

    maxDeathPercentage=parseFloat(dataTotalCases[0].DeathScaled.split(",").join(""))*1.2;

     //removing the previous information fro the treemap
     svg2.selectAll("rect").remove();
     svg2.selectAll("text").remove();
     //remaking the treemap according to mode
     var root=d3.stratify()
     .id(function(d){return d.name;})
     .parentId(function(d){return d.parent;})
     (scaledDeathTreeMap);



     root.sum(function(d){return parseFloat(d.value.split(",").join(""))}).sort((a,b)=>{

       return -parseFloat(a.value)+parseFloat(b.value)});


     let treemap=d3.treemap()
                     .size([treeMapWidth,treeMapHeight])
                     .padding(4)
                     (root);


                     svg2
                     .selectAll("rect")
                     .data(root.leaves())
                     .enter()
                     .append("rect")
                       .attr('x', function (d) {
                           //console.log("this is what you are looking for: ",d['id']);
                            return d.x0; })
                       .attr('y', function (d) { return d.y0; })
                       .attr('width', function (d) { return d.x1 - d.x0; })
                       .attr('height', function (d) { return d.y1 - d.y0; })
                       .attr('class','tiles')
                      .attr('id' , function(d){
                         if (d['id']=="U.S. Virgin Islands"){return "UVirginislands"};
                         return d['id'].split(" ").join("");
                      })
                       .style("stroke", "black")
                       .style("fill", "#69b3a2");
                       
    console.log("click registered");
    barChart.selectAll("rect").remove();
    barChart.selectAll("text").remove();
    svg1.selectAll(".baryAxis").remove();
    svg1.selectAll(".barTitle").remove();


    svg1.append("g").append("text")
    .attr("class","barTitle")
    .attr("transform","translate("+barTitleXCoord+","+barTitleYCoord+")")
    .text(""+barTitle+"");

    yScale=d3.scaleLinear()//scale for the first bar chart
.domain([0,maxDeathPercentage])
.range([0,heightBar]);


yScale_Oriented=d3.scaleLinear()//scale for the first bar chart
.domain([maxDeathPercentage,0])
.range([0,heightBar]);

yAxis=d3.axisLeft().scale(yScale_Oriented);

svg1.append("g").attr("class","baryAxis").attr("transform","translate("+barScaleXCoord+","+barScaleYCoord+")").call(yAxis);

for(i=0;i<20;i++){

    let xCord=barXCoordInitial+(i)*25
    barChart.append("rect")
    .attr("x",xCord)
    .attr("y", barYCoord-yScale(parseFloat(dataTotalCases[i].DeathScaled.split(",").join(""))))
    .attr("width", 20)
    .attr("height",  yScale(parseFloat(dataTotalCases[i].DeathScaled.split(",").join(""))))
    .attr("class","scaledDeathBars")
    .attr("id",function(){
        
        if(dataTotalCases[i].Location!=="U.S. Virgin Islands"){return dataTotalCases[i].Location.split(" ").join("")+"_";}
        return 'UVirginislands_';
    });


    barChart.append("text")
            .attr("style","text-anchor:end")
            .attr("class","barLabel")
            .attr("x",xCord)
            .attr("y", barLabelYCoord)
            .attr("transform","rotate(-45,"+xCord+","+barLabelYCoord+")")
            .text(dataTotalCases[i].Location);

     d3.select(tileSelect(dataTotalCases[i].Location))
        .style("fill",colorHighlight4);
    }
 

bars=svg1.selectAll("rect")
    .on("mouseover",function(){
        console.log(this.id);
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");

          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;


             }

          }
         // console.log("works");
         
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");

            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",colorHighlight4)
            .style("font-weight","bolder")
            .attr("class","treeNames");
    })
    .on("mouseout",function(){

      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",colorHighlight4);
      
          d3.select("#"+tilesId)
          .style("fill",colorHighlight4);
       svg2.selectAll(".treeNames").remove();
    });


svg2.selectAll("rect").on("mouseover",function(d){
      let arrayNodes=root.leaves();
      let x;
      let y;
      let nation;
      svg2.selectAll(".treeNames")
          .remove();
      for (let i=0;i<arrayNodes.length;i++){
         //console.log(arrayNodes[i]);
         if(arrayNodes[i]['id'].split(" ").join("")==this.id) {
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
         if(this.id=="UVirginislands" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
      }
     // console.log("works");
     
      svg2.append("text")
        .attr("x", x+10)    // +10 to adjust position (more right)
        .attr("y", y+20)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size", treelabelSize)
        .style("fill",treelabelColor)
        .style("font-weight","bolder")
        .attr("class","treeNames");

        svg2.append("text")
        .attr("x", 210)    // +10 to adjust position (more right)
        .attr("y", 650)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size","25px")
        .style("fill",colorHighlight4)
        .style("font-weight","bolder")
        .attr("class","treeNames");
      colorOld=this.style.fill;
      d3.select(this)
        .style("fill","orange");

      d3.select("#"+this.id+"_")
          .style("fill","orange")

  })
  .on("mouseout",function(){
     d3.select(this)
        .style("fill",colorOld);
        d3.select("#"+this.id+"_")
        .style("fill",colorOld);
 });




 });


 //***************************************************** Highlighting Stuff *********************************************************/
 bars=svg1.selectAll("rect")
    .on("mouseover",function(){

        //console.log(this.id);
        //console.log("mode");
        
        let tilesId=this.id.slice(0,this.id.length-1);
        //console.log(tilesId);
        d3.select(this)
          .style("fill","orange");
        d3.select("#"+tilesId)
          .style("fill","orange");

          let arrayNodes=root.leaves();
          let x;
          let y;
          let nation;
          svg2.selectAll(".treeNames")
              .remove();
          for (let i=0;i<arrayNodes.length;i++){
             //console.log(arrayNodes[i]);
             if(arrayNodes[i]['id'].split(" ").join("")==this.id.slice(0,this.id.length-1)) {
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;
             }
             if(this.id=="UVirginislands_" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
                 x=arrayNodes[i].x0;
                 y=arrayNodes[i].y0;
                 nation=arrayNodes[i]['id'];
                 //console.log(this.id);
             break;


             }

          }
         // console.log("works");
          svg2.append("text")
            .attr("x", x+10)    // +10 to adjust position (more right)
            .attr("y", y+20)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size", treelabelSize)
            .style("fill",treelabelColor)
            .style("font-weight","bolder")
            .attr("class","treeNames");

            svg2.append("text")
            .attr("x", 210)    // +10 to adjust position (more right)
            .attr("y", 650)    // +20 to adjust position (lower)
            .text(nation)
            .style("font-size","25px")
            .style("fill",colorHighlight)
            .style("font-weight","bolder")
            .attr("class","treeNames");
        
    })
    .on("mouseout",function(){

      let tilesId=this.id.slice(0,this.id.length-1);
        d3.select(this)
          .style("fill",colorHighlight);
      
          d3.select("#"+tilesId)
          .style("fill",colorHighlight);
       svg2.selectAll(".treeNames").remove();
    });


svg2.selectAll("rect").on("mouseover",function(d){
      let arrayNodes=root.leaves();
      let x;
      let y;
      let nation;
      svg2.selectAll(".treeNames")
          .remove();
      for (let i=0;i<arrayNodes.length;i++){
         //console.log(arrayNodes[i]);
         if(arrayNodes[i]['id'].split(" ").join("")==this.id) {
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
         if(this.id=="UVirginislands" && arrayNodes[i]['id']=="U.S. Virgin Islands"){
             x=arrayNodes[i].x0;
             y=arrayNodes[i].y0;
             nation=arrayNodes[i]['id'];
             //console.log(this.id);
         break;
         }
      }
     // console.log("works");
     
      svg2.append("text")
        .attr("x", x+10)    // +10 to adjust position (more right)
        .attr("y", y+20)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size", treelabelSize)
        .style("fill",treelabelColor)
        .style("font-weight","bolder")
        .attr("class","treeNames");

        svg2.append("text")
        .attr("x", 210)    // +10 to adjust position (more right)
        .attr("y", 650)    // +20 to adjust position (lower)
        .text(nation)
        .style("font-size","25px")
        .style("fill",colorHighlight)
        .style("font-weight","bolder")
        .attr("class","treeNames");
      colorOld=this.style.fill;
      d3.select(this)
        .style("fill","orange");

      d3.select("#"+this.id+"_")
          .style("fill","orange")

  })
  .on("mouseout",function(){
     d3.select(this)
        .style("fill",colorOld);
        d3.select("#"+this.id+"_")
        .style("fill",colorOld);
 });


    



}).catch(function(err) {
    // handle error here
    console.log(err);
})





    


                  
