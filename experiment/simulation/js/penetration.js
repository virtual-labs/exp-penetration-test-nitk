var p=Math.floor(Math.random()*(2));
var j=Math.floor(Math.random()*(4));
var screensVal = 0;
var tries = 0;
var repeat = 0;
var sum = 0;
var sliderFlag = 0;
var k1 = new Array();
var found = false;
var qCount =0;
var penetrationValue = 0;

var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}
function navNext()
{
	for(temp=0;temp<=3;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(300,420,180);
		document.getElementById("can1-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-1").onclick="";
			document.getElementById("can1-1").src = "images/bunsenon.png";
			// document.getElementById("bitSample").style.visibility = "visible";
			// document.getElementById("bitSample").style.animation = "blink_effect 1s 1 ease"
			document.getElementById("can1-2").style.visibility = "visible";
			setTimeout(function()
			{
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(175,315,180);
				document.getElementById("can1-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-2").onclick="";
					document.getElementById("can1-2").style.visibility = "hidden";
					document.getElementById("can1-3").style.visibility = "visible";
					document.getElementById("can1-3").style.animation = "bitMove 1s forwards";
					setTimeout(function()
					{
						// document.getElementById("bitSample").style.visibility = "hidden";
						document.getElementById("can1-4").style.visibility = "visible";
						document.getElementById("can1-4").style.animation = "thermoMove 0.5s forwards";
						setTimeout(function()
						{
							document.getElementById("can1-4").src = "images/thermocut.png";
							document.getElementById("can1-5").style.visibility = "visible";
							document.getElementById("can1-6").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can1-6").style.animation = "thermoZoomMove 1s forwards";
								var q2 = Object.create(questions);
								generateQuestion(q2,"Pouring temperature of bitumen material is: ","","50&deg;C","27&deg;C","90&deg;C","95&deg;C",3,pourBitumenIntoMould,450,300,250,150);
								
								
								// setTimeout(function(){
									// setDialog("Pouring temperature of bituminous material is 90<sup>0</sup>C",480,300,100,220);
								// },1100);
							},800);
						},500);
					},1200);
				}
			},500);
		}	
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("can1-12").style.visibility = "hidden";
		document.getElementById("nextButton").style.visibility = "hidden";
		setDialog("Take out the sample from waterbath.",480,300,100,220);
	}
	
	else if(simsubscreennum==3)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can2-1").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden";
		document.getElementById("can2-3").style.visibility = "hidden";
		document.getElementById("can2-4").style.visibility = "hidden";
		document.getElementById("can2-5").style.visibility = "hidden";
		document.getElementById("can2-6a").style.visibility = "hidden";
		document.getElementById("can2-8a").style.visibility = "hidden";
		document.getElementById("can2-8b").style.visibility = "hidden";
		document.getElementById("can2-8c").style.visibility = "hidden";
		document.getElementById("v2-1").style.visibility = "hidden";
		document.getElementById('trial').style="visibility:visible ;left: 650px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " + (repeat+1);
		var q3 = Object.create(questions);
		generateQuestion(q3,"How to calculate penetration value: ","","Initial Reading - Final Reading","Final Reading - Initial Reading","Final Reading + Initial Reading","Final Reading * Initial Reading",2,step31,450,300,250,150);		
	}
	else if(simsubscreennum==4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can3-1").style.visibility = "hidden";
		document.getElementById("can3-2").style.visibility = "hidden";
		document.getElementById("can3-3").style.visibility = "hidden";
		document.getElementById("can3-4").style.visibility = "hidden";
		document.getElementById("can3-5").style.visibility = "hidden";
		document.getElementById("can3-8").style.visibility = "hidden";
		document.getElementById("result").style.visibility = "hidden";
		document.getElementById("trial").style.visibility = "hidden";
		var tb2 = document.getElementById("finalResult");
		var row1 = tb2.insertRow();
		var cell = row1.insertCell();
		cell.colSpan = 4;
		cell.style = "text-align:right";
		var inputVal = document.createElement("input");
		var checkVal = document.createElement("input");
		var rightVal = document.createElement("span");
		var alertVal = document.createElement("span");
		// var rightVal = document.createElement("span");
		inputVal.setAttribute("type","text");
		inputVal.setAttribute("id","res");
		inputVal.setAttribute("oninput","checkInputValid(this)");
		rightVal.setAttribute("id","rightAns");
		inputVal.classList.add("inputStyle");
		checkVal.setAttribute("type","button");
		checkVal.setAttribute("id","chk");
		checkVal.setAttribute("cursor","pointer");
		checkVal.setAttribute("onclick","checkResult();");
		checkVal.setAttribute("value","CHECK");
		alertVal.setAttribute("id","alertId");
		cell.innerHTML ="Average Penetration Value = ";
		cell.appendChild(inputVal);
		cell.appendChild(rightVal);
		cell.appendChild(checkVal);
		tb2.appendChild(alertVal);
		// cell.innerHTML ="Average Penetration Value = "+ (sum/3).toFixed(2);		
		// cell.innerHTML ="Average Penetration Value = "+ (sum/3).toFixed(2);		
	}
}
function step31()
{
	setTimeout(function(){
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(275,98,-90);
		document.getElementById("can3-1").onclick = function(event)
		{
			if(event.pageX>=280 && event.pageX<= 298 && event.pageY>=132 && event.pageY<= 145)
			{
				myStopFunction();
				document.getElementById("can3-5").style.transformOrigin = "40% 30%";
				document.getElementById("can3-5").style.animation = "needleReset forwards";
				document.getElementById("can3-8").style.visibility = "visible";
				setTimeout(function(){
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(238,313,180);
					document.getElementById("can3-3").onclick = function(event)
					{
						if(event.pageX>=273 && event.pageX<= 282 && event.pageY>=320 && event.pageY<= 330)
						{
							myStopFunction();
							document.getElementById("can3-3").onclick ="";
							document.getElementById("can3-2").style.top = "200px";
							document.getElementById("can3-8").src = "images/dot1.png";
							// document.getElementById("can3-5").style.transformOrigin = "40% 30%";
								// p=Math.floor(Math.random()*(6));
								p=Math.floor(Math.random()*(2));
								console.log(p)
								if(p == 1 || p == 2)
									document.getElementById("can3-5").style.animation = "n1rotate1 1s forwards";	
								else 
									document.getElementById("can3-5").style.animation = "n1rotate 1s forwards";	
							setTimeout(function(){
								// console.log(1);
								document.getElementById("result").style.visibility = "visible";
								fillTable();
							},1200);
						}
					}
				},200);
			}
		}
	},500);
}
function pourBitumenIntoMould()
{
	for(var k = 4; k<=6; k++){
		document.getElementById("can1-"+k).style.visibility = "hidden";
	}
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(300,420,180);
	document.getElementById("can1-1").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-1").onclick="";
		setTimeout(function()
		{
			document.getElementById("can1-1").style.visibility = "hidden";
			document.getElementById("can1-2").style.visibility = "hidden";
			setTimeout(function()
			{
				document.getElementById("can1-3").style.visibility = "hidden";
				document.getElementById("can1-7").style.visibility = "visible";
				document.getElementById("can1-9").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(380,180,-90);
				document.getElementById("can1-7").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-7").onclick="";
					document.getElementById("can1-7").style.animation = "pourBitMove 1.2s forwards";
					setTimeout(function()
					{
						document.getElementById("can1-7").style.visibility = "hidden";
						document.getElementById("can1-8").style.visibility = "visible";
						document.getElementById("can1-10").style.visibility = "visible";
						document.getElementById("can1-10").style.animation = "bitUpMove 1.5s forwards";
						setTimeout(function()
						{
							document.getElementById("can1-10").style.visibility = "hidden";
							document.getElementById("can1-8").style.visibility = "hidden";
							document.getElementById("can1-9").style.visibility = "hidden";
							document.getElementById("can1-7").style.visibility = "hidden";
							document.getElementById("can1-8a").style.visibility = "visible";
							screensVal = 1;
							setDialog("Protect the sample from dust and allow it to cool in an atmosphere at a temperature between 15<sup>o</sup>C to 30<sup>o</sup>C  for one hour. ",420,300,120,340);
						},1600);
					},1300);
				}
			},800);
		},500);
	}
}
function mouldIntoDishAndWaterbath()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(330,340,360);
	document.getElementById("can1-8a").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-8a").onclick="";
		document.getElementById("can1-8a").style.animation = "mouldMove 1.2s forwards";
		setTimeout(function()
		{
			document.getElementById("can1-8a").style.visibility = "hidden";
			document.getElementById("can1-11").style.visibility = "hidden";
			document.getElementById("can1-11a").style.visibility = "visible";
			setTimeout(function()
			{
				document.getElementById("can1-12").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(150,300,-90);
				document.getElementById("can1-11a").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-11a").onclick="";
					document.getElementById("can1-11a").style.animation = "mouldMoveToWaterBath 1.2s forwards";
					setTimeout(function()
					{
						document.getElementById("can1-11a").style.visibility = "hidden";
						document.getElementById("nextButton").style.visibility = "visible";
					},1500);
				}
			},500);
		},1500)
	}
}
function mouldOnStand()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(100,450,-90);
		document.getElementById("can2-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can2-4").onclick="";
			document.getElementById("can2-4").style.animation = "sampleMove 1s forwards";
			setTimeout(function(){
				document.getElementById("can2-6").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(410,340,360);
				document.getElementById("can2-6").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-6").onclick="";
					document.getElementById("can2-6").style.visibility = "hidden";
					document.getElementById("can2-6a").style.visibility = "visible";
					document.getElementById("can2-6a").style.animation = "apparatusNeedleMove 0.8s forwards";
					setTimeout(function(){
						document.getElementById("can2-6a").style.visibility = "hidden";
						document.getElementById("can2-2").src = "images/movePart2.png";
						myInt = setInterval(function(){ animatearrow(); }, 500);
						animateArrowATPosition(330,285,360);
						document.getElementById("can2-3").onclick = function(event){
							if(event.pageX>=300 && event.pageX<= 318 && event.pageY>=288 && event.pageY<= 321)
							{
								myStopFunction();
								screensVal = 8;
								setDialog("Move the slider to adjust the needle to touch bitumen sample.",420,200,120,250);
							}
						}
					},950);
				}
			},1200);
		}
}
function fillTable()
{
	// do{
		// var l=Math.floor(Math.random()*(6));
		// k1.push(l);
		
		// for(var i =0;i<k1.length;i++)
		// {
			// if(l == k1[i])
				// found = true;
			// else
			// {
				// found = false;
				// p = k1[i];
			// }
		// }
	// }while(found == false);
	console.log(1);
	var tb1 = document.getElementById("result");
	var row = tb1.insertRow();
	for (i = 0; i <= 3; i++)
	{
		if(i == 0)
		{
			var cell = row.insertCell();
			cell.innerHTML = repeat+1;
		}
		else if(i == 1)
		{
			var cell = row.insertCell();
			cell.innerHTML = 0;
		}
		else
		{
			var cell = row.insertCell();
 			cell.innerHTML = data[p][j];
		}
	}
	fillFinalTable();
	setTimeout(function()
	{
		if(repeat < 2 )
			setDialog("Make at least 3 readings at points on the surface of the sample not less than 10 mm apart and not less than l0mm from the side of the dish.",420,250,120,340);
		else
			document.getElementById("nextButton").style.visibility = "visible";
	},800);

}
function fillFinalTable()
{
	var tb2 = document.getElementById("finalResult");
	var row1 = tb2.insertRow();
	for (i = 0; i <= 3; i++)
	{
		if(i == 0)
		{
			var cell = row1.insertCell();
			cell.innerHTML = repeat+1;
		}
		else if(i == 1)
		{
			var cell = row1.insertCell();
			cell.innerHTML = 0;
		}
		else
		{
			var cell = row1.insertCell();
			cell.innerHTML = data[p][j];
			if(i == 3)
			{
					sum = sum + data[p][j];
			}
		}
	}
}
function resetSetup()
{
	repeat++;
	document.getElementById('trial').style="visibility:visible ;left: 650px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
	document.getElementById('trial').innerHTML="Trial : " + (repeat+1);	
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(330,285,360);
	document.getElementById("can3-3").onclick = function(event){
		if(event.pageX>=300 && event.pageX<= 318 && event.pageY>=288 && event.pageY<= 321)
		{
			myStopFunction();
			document.getElementById("can3-3").onclick ="";
			makeSliderVisible();
		}
	}
}
function resetMould()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(200,420,180);
	document.getElementById("can3-4").onclick=function()
	{
		myStopFunction();
		document.getElementById("can3-4").onclick="";
		if(repeat == 1)
			document.getElementById("can3-4").style.animation = "sample1Move 1s forwards";
		else if(repeat == 2)
			document.getElementById("can3-4").style.animation = "sample2Move 1s forwards";
		setTimeout(function(){
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(330,285,360);
			document.getElementById("can3-3").onclick = function(event){
				if(event.pageX>=300 && event.pageX<= 318 && event.pageY>=288 && event.pageY<= 321)
				{
					myStopFunction();
					document.getElementById("can3-3").onclick = "";
					makeSliderVisible();
				}
			}
		},1200);
	}
}

function rotateNeedle()
{
	document.getElementById("can3-7b").style.transformOrigin = "";
	document.getElementById("can3-7b").style.animation = "";
	document.getElementById("can3-7a").style.visibility = "hidden";
	document.getElementById("can3-7b").style.visibility = "hidden";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(275,98,-90);
	document.getElementById("can3-1").onclick = function(event)
	{
		if(event.pageX>=280 && event.pageX<= 298 && event.pageY>=132 && event.pageY<= 145)
		{
			myStopFunction();
			document.getElementById("can3-1").onclick = "";
			document.getElementById("can3-5").style.transformOrigin = "40% 30%";
			document.getElementById("can3-5").style.animation = "needleReset forwards";
			document.getElementById("can3-8").style.visibility = "visible";
			setTimeout(function(){
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(238,313,180);
				document.getElementById("can3-3").onclick = function(event)
				{
					if(event.pageX>=273 && event.pageX<= 282 && event.pageY>=320 && event.pageY<= 330)
					{
						myStopFunction();
						document.getElementById("can3-3").onclick ="";
						document.getElementById("can3-2").style.transformOrigin = "";
						document.getElementById("can3-2").style.animation = "";
						document.getElementById("can3-2").style.top = "200px";
						if(repeat == 1)
							document.getElementById("can3-8").src = "images/dot2.png";
						else if(repeat == 2)
							document.getElementById("can3-8").src = "images/dot3.png";
						// document.getElementById("can3-5").style.transformOrigin = "40% 30%";
														// p=Math.floor(Math.random()*(6));
														j=Math.floor(Math.random()*(4));

						if(p == 1 || p == 3)
							document.getElementById("can3-5").style.animation = "n1rotate1 1s forwards";	
						else 
							// document.getElementById("can3-5").style.animation = "n1rotate 1s forwards";	
						document.getElementById("can3-5").style.animation = "n1rotate 1s forwards";	
						setTimeout(function(){
							fillTable();
						},1200);
					}
				}
			},200);
		}
	}
}
function setReadingPart(ele)
{
	document.getElementById("can2-8c").style.top = ele.value+'px';
	document.getElementById("can2-2").style.top = (ele.value-80)+'px';
	if(ele.value  == 275)
	{
		document.getElementById("v2-1").style.visibility = "visible";
		document.getElementById("nextButton").style.visibility = "visible";
		document.getElementById("r").style.visibility = "hidden";
		document.getElementById("r").disabled = true;
	}
}

function setReadingPart2(ele)
{
	document.getElementById("can3-9c").style.top = ele.value+'px';
	document.getElementById("can3-2").style.top = (ele.value-80)+'px';
	if(ele.value  == 260 && sliderFlag == 0)
	{
		sliderFlag = 1;		
		document.getElementById("can3-9a").style.visibility = "hidden";
		document.getElementById("can3-9b").style.visibility = "hidden";
		document.getElementById("can3-9c").style.visibility = "hidden";
		document.getElementById("v3-1").style.visibility = "hidden";	
		document.getElementById("s").style.visibility = "hidden";	
		setDialog("After each test return the sample and transfer dish to the water bath and wash the needle with benzene and dry it. Make the pointer of the dial to read zero.",420,250,120,340);
	}
	if(ele.value  == 275 && sliderFlag == 1)
	{
		sliderFlag = 0;		
		document.getElementById("can3-9a").style.visibility = "hidden";
		document.getElementById("can3-9b").style.visibility = "hidden";
		document.getElementById("can3-9c").style.visibility = "hidden";
		document.getElementById("v3-1").style.visibility = "hidden";	
		document.getElementById("s").style.visibility = "hidden";	
		rotateNeedle();
	}
}

function makeSliderVisible()
{
	document.getElementById("can3-9a").style.visibility = "visible";
	document.getElementById("can3-9b").style.visibility = "visible";
	document.getElementById("can3-9c").style.visibility = "visible";
	document.getElementById("v3-1").style.visibility = "visible";
	if(sliderFlag == 1)
		document.getElementById("v3-1").innerHTML = "Move needle to touch sample surface";
	else if(sliderFlag == 0)
		document.getElementById("v3-1").innerHTML = "Move needle to initial position";
	document.getElementById("s").style.visibility = "visible";
}
function checkResult()
{
	var idd = document.getElementById("res");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
	penetrationValue = (sum/3).toFixed(2);
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		document.getElementById("alertId").style.visibility = "visible";
		document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}
	else if(Math.round(idd.value) != Math.round(penetrationValue))
	{
		qCount++;
		blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= penetrationValue+"mm";
			var q2 = Object.create(questions);																								
			generateQuestion(q2,"Obtained penetration value is suitable for road construction or not?: ","","Yes,It is suitable","No, It is not suitable",0,0,1,finalStatement,250,300,250,150);
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= penetrationValue+"mm<span style='color:green'>&#10004;</span>";
		var q2 = Object.create(questions);																								
		generateQuestion(q2,"Obtained penetration value is suitable for road construction or not?: ","","Yes,It is suitable","No, It is not suitable",0,0,1,finalStatement,250,300,250,150);
	}
}
function finalStatement()
{
	document.getElementById("p8-1").style.visibility = "visible";
	document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
}

function blinkStop()
{
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";												
	// document.getElementById('dialog-div').style.height=heightVal+"px";
	// document.getElementById('dialog-div').style.width=widthVal+"px";
	document.getElementById('dialog-div').style.visibility="visible";											
}
function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 1 && screensVal == 0)
	{
		pourBitumenIntoMould();
	}
	else if(simsubscreennum == 1 && screensVal == 1)
	{
		screensVal = 2;
		setDialog("Then place it along with the transfer dish in the water bath at 25° ± 0.1 °C, unless otherwise stated.",420,300,120,340);
	}
	else if(simsubscreennum == 1 && screensVal == 2)
	{
		screensVal = 3;
		document.getElementById('can1-11').style.visibility="visible";
		mouldIntoDishAndWaterbath();	
	}
	else if(simsubscreennum == 2 && screensVal == 3)
	{
		screensVal = 8;
		mouldOnStand();	
	}
	else if(simsubscreennum == 3 && screensVal == 4)
	{
		screensVal =5;
		resetSetup();	
	}
	else if(simsubscreennum == 3 && screensVal == 5)
	{
		screensVal = 6;
		resetMould();	
	}
	else if(simsubscreennum == 3 && screensVal == 6)
	{
		screensVal =7;
		resetSetup();	
	}
	else if(simsubscreennum == 3 && screensVal == 7)
	{
		screensVal = 8;
		resetMould();	
	}
	else if(simsubscreennum == 2 && screensVal == 8)
	{
		screensVal = 4; 
		document.getElementById("can2-6a").style.visibility = "hidden";
		document.getElementById("can2-8a").style.visibility = "visible";
		document.getElementById("can2-8b").style.visibility = "visible";
		document.getElementById("can2-8c").style.visibility = "visible";
		document.getElementById("r").style.visibility = "visible";
	}
	
}	
function setTopLeft(divid,leftPos,topPos,imgsrc)
{
	document.getElementById(divid).src = imgsrc;
	document.getElementById(divid).style.top = topPos+"px";
	document.getElementById(divid).style.left = leftPos+"px";
}

//code to get  pixel point in a page
// function getpx(event,elem)
// {
	// document.getElementById("1").innerHTML = event.pageX + " "+event.pageY;
// }