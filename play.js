var firstCutscene = document.getElementById("wakeUp");
var cutscene1 = document.getElementById("openEyes");
var firstPOV = document.getElementById("openEye");
var wakeupDBox = document.getElementById("WakeupDialog");
var wakeLines = [
    document.getElementById("wakeupD1"),
    document.getElementById("wakeupD2"),
    document.getElementById("wakeupD3")
];

var end1 = document.getElementById("endVid1");
var end2 = document.getElementById("endVid2");
var end3 = document.getElementById("endVid3");
end1.style.display = "none";
end2.style.display = "none";
end3.style.display = "none";

wakeupDBox.style.display = "none";
wakeupDBox.style.opacity = "0";

wakeLines.forEach(line => {
  line.style.display = "none";
  line.style.opacity = "0";
});
var cNcPopUp = document.getElementById("cPop");
var clockPopUp = document.getElementById("clockPopUp");
var calendarPopUp = document.getElementById("calendarPopUp");
var notePopUp = document.getElementById("notePopUp");
var pupDialogue = document.getElementById("PopUpDialog");
var phonePopUp = document.getElementById("phonePopUp");

var buttons = document.querySelector(".buttonContainer");

wakeLines.forEach(line => line.style.display = "none");

buttons.style.display = "none";
cNcPopUp.style.display = "none";
clockPopUp.style.display = "none";
calendarPopUp.style.display = "none";
notePopUp.style.display = "none";
pupDialogue.style.display = "none";
phonePopUp.style.display = "none";

function playWakeFirstD() {
    let i = 0;
  
    wakeupDBox.style.display = "block";
    wakeupDBox.style.transition = "opacity 0.6s ease";
    wakeupDBox.style.opacity = "1";
  
    function nextLine() {
      if (i >= wakeLines.length) {
        wakeupDBox.style.opacity = "0";
        setTimeout(() => {
            wakeupDBox.style.display = "none";
        }, 600);
        return;
      }
  
      wakeLines.forEach(line => {
        line.style.display = "none";
        line.style.opacity = "0";
      });
  
      let line = wakeLines[i];
      line.style.display = "block";
      line.style.transition = "opacity 0.6s ease";
      line.style.opacity = "1";
  
      setTimeout(() => {
        line.style.opacity = "0";
  
        setTimeout(() => {
          i++;
          nextLine();
        }, 600);
      }, 3000);
    }
  
    nextLine();
  }

firstPOV.pause();
firstPOV.style.display = "none";

firstCutscene.onended = function() {
    cutscene1.style.transition = "opacity 1.5s ease";
    cutscene1.style.opacity = 0;

    setTimeout(function() {
        firstCutscene.style.display = "none";
        firstPOV.style.display = "block";
        firstPOV.play();
        cutscene1.style.opacity = 1;
    }, 1500);
};

firstPOV.onended = function() {
    firstPOV.classList.add("fade-out");

    firstPOV.addEventListener("animationend", function () {
        cutscene1.remove(); 
        document.body.style.overflow = "auto";
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/ryce-bot/SAQ3.github.io/refs/heads/files/addons/Bg.png')";
        buttons.style.display = "flex";
        playWakeFirstD();
    }, { once: true });
};
const clockBtn = document.getElementById("clock-button");
const calendarBtn = document.getElementById("calendar-button");
const backBtn = document.getElementById("back-button");
const phoneBtn = document.getElementById("telephone-button");
const DBox = document.getElementById("PopUpDialog");
const AllD = DBox.querySelectorAll('h3');

DBox.style.display = "none";
AllD.forEach(line => {
    line.style.display = "none";
    line.style.opacity = "0";
});
function showDialogueById(dialogueId) {
    DBox.style.display = "block";
    DBox.style.transition = "opacity 0.4s ease";
    DBox.style.opacity = "1";
  
    AllD.forEach(line => line.style.display = "none");
  
    const chosen = document.getElementById(dialogueId);
    chosen.style.display = "block";
    chosen.style.opacity = "1";

    setTimeout(() => {
        DBox.style.opacity = "0";

    setTimeout(() => {
        DBox.style.display = "none";
     }, 400);
}, 3000);
}

$(function(){

	var comboArray = [0, 0, 0, 0];
	var combination = {
        "3615":"+32 95630",
        "8675":"+32 89700",
        "5523":"+32 47512"
    };
	
	var gridIncrement = $( ".lock-dial ul" ).css('line-height').replace('px', '')/2;
	var numNums = $( ".lock-dial:eq(0) ul li" ).length;
	var halfHeight = gridIncrement*numNums;
	var initTop = -(halfHeight-gridIncrement);
	
	$( ".lock-dial ul" ).css('top', initTop);
	
	$( ".lock-dial ul" ).draggable({
		grid: [ 0, gridIncrement ],
		axis: 'y',
		drag: function(){
			var dragDir = $(this).css('top').replace('px', '') < initTop ? "up" : "down";
			
			if(dragDir == "up"){
				var curNum = parseInt($(this).find('li:last-child').text()) + 1;
				if(curNum < 10){
					$(this).append('<li>'+curNum+'</li>');
				}else{
					$(this).append('<li>0</li>');
				};
			}else{
				var curNum = parseInt($(this).find('li:first-child').text()) - 1;
				var thisTop = parseInt($(this).css('margin-top').replace('px', ''));
				
				$(this).css({
					marginTop: thisTop-(gridIncrement*2)
				});
				
				if(curNum > -1){
					$(this).prepend('<li>'+curNum+'</li>');
				}else{
					$(this).prepend('<li>9</li>');
				};
			};
		},
		stop: function(){
		
			//MATHS		
			var negOrPos = $(this).css('margin-top').replace('px', '') > 0 ? 1 : -1;
			var thisTopTotal = parseInt($(this).css('top').replace('px', '')) + Math.abs(initTop);
			var marginMinified = parseInt(Math.abs($(this).css('margin-top').replace('px', ''))) - thisTopTotal;
			var numIncs = Math.floor(marginMinified/(halfHeight*2));
			var totalDif = numIncs*(halfHeight*2);
			var topTen = (marginMinified - totalDif)*negOrPos;
			var activeIndex = Math.abs(topTen/(gridIncrement*2)) + (halfHeight/(gridIncrement*2));
			
			$(this).attr("data-combo-num", $(this).find('li').eq(activeIndex).text()).css({
				top: -315,
				marginTop: topTen
			}).find('li').slice(20).remove();
			
            for(var i=0; i<$(".lock-dial ul").length; i++){
                comboArray[i] = $(".lock-dial ul:eq("+i+")").attr("data-combo-num");
            }            
			
			var enteredCode = comboArray.join("");

			if(combination[enteredCode]){
				$('.lock-dial ul').draggable('disable');
				$('#lock-wrapper').addClass("unlocked");

				$('.lock-dial').each(function(){
					var $this = $(this);
					$this.find('ul').delay(400).css('color', '#0f0').fadeOut(function(){
						$this.animate({
							marginTop: 150
						}, function(){
							$this.fadeOut(function(){
								$('.welcome-message').fadeIn();
			

								$('.welcome-message')
                                .text(combination[enteredCode])
                                .fadeIn();
			
							});
						});
					});
				});
			}
			
		}
	});

});

//BUTTONS
    backBtn.onclick = function() {
        backBtn.style.display = "none";
        cNcPopUp.style.display = "none";
        clockPopUp.style.display = "none";
        calendarPopUp.style.display = "none";
        clockBtn.style.display = "block";
        calendarBtn.style.display = "block";
        lockBoxPopup.style.display = "none";
        notePopUp.style.display = "none";
        phonePopUp.style.display = "none";
    };
    clockBtn.onclick = function() {
        backBtn.style.display = "block";
        cNcPopUp.style.display = "block";
        clockPopUp.style.display = "block";
        calendarBtn.style.display = "none";
        notePopUp.style.display = "none";
        lockBoxPopup.style.display = "none";
    };
    clockPopUp.onclick = function() {
    showDialogueById("clckD");
    }
    calendarBtn.onclick = function() {
        backBtn.style.display = "block";
        cNcPopUp.style.display = "block";
        calendarPopUp.style.display = "block";
        clockBtn.style.display = "none";
        notePopUp.style.display = "none";
        lockBoxPopup.style.display = "none";
    };
    calendarPopUp.onclick = function() {
        calendarPopUp.style.display = "none";
        notePopUp.style.display = "block";
        backBtn.style.display = "none";
        lockBoxPopup.style.display = "none";
    }
    notePopUp.onclick = function() {
        notePopUp.style.display = "none";
        calendarPopUp.style.display = "block";
        backBtn.style.display = "block";
        lockBoxPopup.style.display = "none";
    }

    var lockBoxPopup = document.getElementById("lockBoxPopUp");
    lockBoxPopup.style.display = "none";

    const lockBtn = document.getElementById("lockbox-button");
    lockBtn.onclick = function() {
        backBtn.style.display = "block";
        cNcPopUp.style.display = "block";
        clockPopUp.style.display = "none";
        calendarPopUp.style.display = "none";
        notePopUp.style.display = "none";
        lockBoxPopup.style.display = "block";
        showDialogueById("lbD");
    }

    phoneBtn.onclick = function() {
        backBtn.style.display = "block";
        cNcPopUp.style.display = "block";
        phonePopUp.style.display = "block";
        clockPopUp.style.display = "none";
        calendarPopUp.style.display = "none";
        notePopUp.style.display = "none";
        lockBoxPopup.style.display = "none";
    }

    //PHONE NUMBER GUESSING
    var PhoneNumGuess = "";
    function press1(){
        PhoneNumGuess = PhoneNumGuess + '1';
        displayPhoneNum();
    }
    function press2(){
        PhoneNumGuess = PhoneNumGuess + '2';
        displayPhoneNum();
    }
    function press3(){
        PhoneNumGuess = PhoneNumGuess + '3';
        displayPhoneNum();
    }
    function press4(){
        PhoneNumGuess = PhoneNumGuess + '4';
        displayPhoneNum();
    }
    function press5(){
        PhoneNumGuess = PhoneNumGuess + '5';
        displayPhoneNum();
    }
    function press6(){
        PhoneNumGuess = PhoneNumGuess + '6';
        displayPhoneNum();
    }
    function press7(){
        PhoneNumGuess = PhoneNumGuess + '7';
        displayPhoneNum();
    }
    function press8(){
        PhoneNumGuess = PhoneNumGuess + '8';
        displayPhoneNum();
    }
    function press9(){
        PhoneNumGuess = PhoneNumGuess + '9';
        displayPhoneNum();
    }
    function press0(){
        PhoneNumGuess = PhoneNumGuess + '0';
        displayPhoneNum();
    }
    function pressClear(){
        PhoneNumGuess = "";
        displayPhoneNum();
    }

    function displayPhoneNum(){
        document.getElementById("numOutputText").innerHTML = PhoneNumGuess;
    }

    const phoneNum1 = "3295630";
    const phoneNum2 = "3289700";
    const phoneNum3 = "3247512";

    function checkNum(){
        if(PhoneNumGuess === phoneNum1){
            end1.style.display = "block";
            end1.play();
            end1.onended = function() {
                window.location.href = "index.html";
            }
        }else if (PhoneNumGuess === phoneNum2){
            end2.style.display = "block";
            end2.play();
            end2.onended = function() {
                window.location.href = "index.html";
            }

        }else if (PhoneNumGuess === phoneNum3){
            end3.style.display = "block";
            end3.play();
           end3.onended = function() {
                window.location.href = "index.html";
            }
        }else{
            showDialogueById("phD");
        }
    }
    