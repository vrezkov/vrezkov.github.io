const SM = (function () {
	
	// ===== View =====
	
	class View {
	
		constructor(container) {
			this.container = container;
			this.reelsArr = [];
		}

		// ----- Render header ------
	
		renderHeader(player) {
		
			let headerWrapper = document.createElement("div");
			headerWrapper.id = "header__wrapper";
			
			let about = document.createElement("span");
			about.id = "about";
			about.innerHTML = "About";
			
			let bestResults = document.createElement("span");
			bestResults.id = "best-results";
			bestResults.innerHTML = "Best results";
			
			let hiScore = document.createElement("div");
			hiScore.id = "hi-score";
			hiScore.innerHTML = "High Score: " + player.hiScore;
			
			let welcome = document.createElement("div");
			welcome.id = "welcome";
			welcome.innerHTML = "Hello, Anon";		

			let logInOutLinksWrapper = document.createElement("div");
			logInOutLinksWrapper.id = "log-in-out-links__wrapper";

			let logInLink = document.createElement("span");
			logInLink.id = "log-in-link";
			logInLink.innerHTML = "Log in / Register";

			let logOutLink = document.createElement("span");
			logOutLink.id = "log-out-link";
			logOutLink.innerHTML = "Log out";

			logInOutLinksWrapper.append(logInLink, logOutLink);
			headerWrapper.append(welcome, hiScore, logInOutLinksWrapper, bestResults, about);
			
			this.container.append(headerWrapper);
			this.renderLogInLinkShowLogOutLinkHide();

		}
	
		// ----- Render slot machine ------
	
		renderSM(machine, reelImgs) {

			// ----- Slot machine inner ------
		
			const slotMachine = this.container;
			let slotMachineInner = document.createElement("div");
			slotMachineInner.id = "slot-machine-inner";
			
			// ----- Terminal ------
		
			let terminal = document.createElement("div");
			terminal.id = "terminal";

			let terminalText = document.createElement("div");
			terminalText.id = "terminal-text";
			terminalText.innerHTML = "Stop-N-Win";
			terminal.append(terminalText);
	
			// ----- Game info ------

			let gameInfoWrapper = document.createElement("div");
			gameInfoWrapper.id = "game-info__wrapper";
			
			let creditsInfoWrapper = document.createElement("div");
			creditsInfoWrapper.id = "credits-info__wrapper";
				let creditsInfoText = document.createElement("div");
				creditsInfoText.classList.add("game-info__text");
				creditsInfoText.innerHTML = "Credits";
				let creditsInfoContent = document.createElement("div");
				creditsInfoContent.id = "credits-info__content";
				creditsInfoContent.innerHTML = machine.credits;
			
			let scoreInfoWrapper = document.createElement("div");
			scoreInfoWrapper.id = "score-info__wrapper";
				let scoreInfoText = document.createElement("div");
				scoreInfoText.classList.add("game-info__text");
				scoreInfoText.innerHTML = "Score";
				let scoreInfoContent = document.createElement("div");
				scoreInfoContent.id = "score-info__content";
				scoreInfoContent.innerHTML = machine.score;
			
			let spinsInfoWrapper = document.createElement("div");
			spinsInfoWrapper.id = "spins-info__wrapper";
				let spinsInfoText = document.createElement("div");
				spinsInfoText.classList.add("game-info__text");
				spinsInfoText.innerHTML = "Spins";
				let spinsInfoContent = document.createElement("div");
				spinsInfoContent.id = "spins-info__content";
				spinsInfoContent.innerHTML = machine.spins;

			let spinTimeCountDownInfoWrapper = document.createElement("div");
			spinTimeCountDownInfoWrapper.id = "spin-time-count-down-info__wrapper";
				let spinTimeCountDownInfoText = document.createElement("div");
				spinTimeCountDownInfoText.classList.add("game-info__text");
				spinTimeCountDownInfoText.innerHTML = "C/D";
				let spinTimeCountDownInfoContent = document.createElement("div");
				spinTimeCountDownInfoContent.id = "spin-time-count-down-info__content";
				spinTimeCountDownInfoContent.innerHTML = machine.countDown;

			// ----- Reels ------
		
			let reelsWrapper = document.createElement("div");
			reelsWrapper.id = "reels__wrapper";
			
			let reelsInner = document.createElement("div");
			reelsInner.id = "reels__inner";

			// ----- Buttons ------

			let btnsWrapper = document.createElement("div");
			btnsWrapper.id = "buttons__wrapper";

			let btnStart = document.createElement("button");
			btnStart.id = "btn-start";
			btnStart.innerHTML = "START";
			
			let btnStop = document.createElement("button");
			btnStop.id = "btn-stop";
			btnStop.innerHTML = "STOP";
			
			// ----- Sound ------

			let btnsSoundWrapper = document.createElement("div");
			btnsSoundWrapper.id = "btns-sound__wrapper";
			
			let btnSoundOn = document.createElement("div");
			btnSoundOn.id = "btn-sound-on";
			btnSoundOn.classList.add("btn-sound");
			
			let btnSoundOff = document.createElement("div");
			btnSoundOff.id = "btn-sound-off";
			btnSoundOff.classList.add("btn-sound");

			// ----- Append elements ------
			
			creditsInfoWrapper.append(creditsInfoText, creditsInfoContent);
			scoreInfoWrapper.append(scoreInfoText, scoreInfoContent);
			spinsInfoWrapper.append(spinsInfoText, spinsInfoContent);
			spinTimeCountDownInfoWrapper.append(spinTimeCountDownInfoText, spinTimeCountDownInfoContent);
			gameInfoWrapper.append(creditsInfoWrapper, scoreInfoWrapper, spinsInfoWrapper, spinTimeCountDownInfoWrapper);
			reelsWrapper.append(reelsInner);
			btnsWrapper.append(btnStart, btnStop);
			btnsSoundWrapper.append(btnSoundOn, btnSoundOff);
			slotMachineInner.append(terminal, gameInfoWrapper, reelsWrapper, btnsWrapper);
			slotMachine.append(slotMachineInner, btnsSoundWrapper);
			
			this.renderRandImgs(machine, reelImgs);
			
			this.renderWinResize();
			
		}
	
		// ----- Generate random images ------
	
		renderRandImgs(machine, reelImgs) {
						
			this.container.querySelector("#reels__inner").innerHTML = "";
			
			for (let i = 0; i < machine.reelsNum; i++) {
			
				let reel = document.createElement("div");
				reel.classList.add("reel");
				reel.style.height = `${machine.reelImgHeight * (machine.reelImgsNum - 1)}px`;
				
				let reelContent = document.createElement("div");
				reelContent.classList.add("reel__content");
				reelContent.style.cssText = `overflow: hidden; margin-top: -${machine.reelImgHeight / 2}px; width: ${machine.reelImgWidth + 20}px;`;
				reel.append(reelContent);
				
				for (let j = 0; j < machine.reelImgsNum; j++) {
					let reelImg = document.createElement("img");
					
					let randomReelImg = Object.keys(reelImgs)[Math.floor(Math.random() * Object.keys(reelImgs).length)];
					let randomReelImgSrc = reelImgs[randomReelImg];
					reelImg.src = randomReelImgSrc;
					reelImg.classList.add(randomReelImg);
					
					reelContent.append(reelImg);
				}
				
				let reelShadow = document.createElement("div");
				reelShadow.classList.add("reel__shadow");
				
				reel.append(reelShadow);
				this.container.querySelector("#reels__inner").append(reel);
				
				this.reelsArr.push(reel);

			}
		}
	
		// ----- About ------
	
		renderAboutContent(aboutContent) {
			let aboutContentWrapper = document.createElement("div");
			aboutContentWrapper.innerHTML = "<p>" + aboutContent.join("</p><p>") + "</p>";		
			this.renderModalWin(aboutContentWrapper);
		}
		
		// ----- Best results ------
	
		renderBestResultsContent(bestResultsHeader) {
			
			const bestResultsContentWrapper = document.createElement("div");
			bestResultsContentWrapper.id = "best-results__wrapper";
			
			const bestResultsContentHeader = document.createElement("div");
			bestResultsContentHeader.innerHTML = "<p><strong>" + bestResultsHeader + "<strong></p>";
			
			const bestResultsLoader = document.createElement("div");
			bestResultsLoader.id = "best-results__loader";
			
			bestResultsContentWrapper.append(bestResultsContentHeader, bestResultsLoader);

			this.renderModalWin(bestResultsContentWrapper);

		}
		
		renderBestResultsList(winners) {

			const bestPlayersList = document.createElement("div");
			bestPlayersList.id = "best-results__list";
			bestPlayersList.innerHTML = "";
			
			for (let i = 0; i < winners.length; i++) {
				
				const bestPlayersListRow = document.createElement("div");
				bestPlayersListRow.classList.add("best-players-list__row");
				
				const bestPlayersListCol1 = document.createElement("div");
				bestPlayersListCol1.classList.add("best-players-list__col1");
				bestPlayersListCol1.innerHTML += i + 1;
				
				const bestPlayersListCol2 = document.createElement("div");
				bestPlayersListCol2.classList.add("best-players-list__col2");
				bestPlayersListCol2.innerHTML += winners[i].player;
				
				const bestPlayersListCol3 = document.createElement("div");
				bestPlayersListCol3.classList.add("best-players-list__col3");
				bestPlayersListCol3.innerHTML += winners[i].hiscore;
				
				bestPlayersListRow.append(bestPlayersListCol1, bestPlayersListCol2, bestPlayersListCol3);
				bestPlayersList.append(bestPlayersListRow);
					
			}
			
			this.container.querySelector("#best-results__loader").remove();
			this.container.querySelector("#best-results__wrapper").append(bestPlayersList);
			this.renderModalWinResize();
			
		}

		// ----- Log in / log out links ------
	
		renderLogInLinkShowLogOutLinkHide() {
			this.container.querySelector("#log-in-link").style.display = "block";
			this.container.querySelector("#log-out-link").style.display = "none";
		}
		
		renderLogOutLinkShowLogInLinkHide() {
			this.container.querySelector("#log-out-link").style.display = "block";
			this.container.querySelector("#log-in-link").style.display = "none";
		}

		// ----- Log in messages ------
	
		renderMsgLogIn(msgNotLoggedIn) {
			
			const logInMsgWrapper = document.createElement("div");
			logInMsgWrapper.id = "log-in-msg-wrapper";
			
			const logInMsgWrapperText = document.createElement("div");
			logInMsgWrapperText.style.cssText = "margin-bottom: 15px;";
			logInMsgWrapperText.innerHTML = msgNotLoggedIn;
			
			const logInMsgConfirmBtn = document.createElement("input");
			logInMsgConfirmBtn.setAttribute("type", "button");
			logInMsgConfirmBtn.id = "btn-log-in-confirm";
			logInMsgConfirmBtn.value = "OK";
		
			logInMsgWrapper.append(logInMsgWrapperText, logInMsgConfirmBtn);
			
			this.renderModalWin(logInMsgWrapper);

		}
		
		renderMsgLogInMistake(msgLogInMistake) {
			const logInMsgMistakeText = document.createElement("div");
			logInMsgMistakeText.innerHTML = msgLogInMistake;

			this.renderModalWin(logInMsgMistakeText);
		}

		// ----- Log in form ------
	
		renderLogInForm(msgRegister) {
			
			const logInForm = document.createElement("form");
			logInForm.id = "log-in-form";
			
			const logInFormName = document.createElement("input");
			logInFormName.id = "log-in-form__name";
			logInFormName.type = "text";
			logInFormName.name = "player-name";
			logInFormName.value = "";
			
			const logInFormNameLabel = document.createElement("label");
			logInFormNameLabel.innerHTML = "Name (5-20 characters)";
			logInFormNameLabel.setAttribute("for", "log-in-form__name");
			logInFormNameLabel.style.cssText = "display: block; font-size: 12px; margin-bottom: 4px;";
			
			const logInFormPassword = document.createElement("input");
			logInFormPassword.id = "log-in-form__password";
			logInFormPassword.type = "password";
			logInFormPassword.name = "player-password";
			logInFormPassword.value = "";
			
			const logInFormPasswordLabel = document.createElement("label");
			logInFormPasswordLabel.innerHTML = "Password (5-20 characters)";
			logInFormPasswordLabel.setAttribute("for", "log-in-form__password");
			logInFormPasswordLabel.style.cssText = "display: block; font-size: 12px; margin-bottom: 4px;";

			const logInFormSubmit = document.createElement("input");
			logInFormSubmit.setAttribute("type", "submit");
			logInFormSubmit.id = "log-in-form__submit";
			logInFormSubmit.value = "Log in";
			
			const logInFormRegWrapper = document.createElement("div");
			logInFormRegWrapper.id = "log-in-form__reg-wrapper";
			
			const logInFormRegWrapperText = document.createElement("div");
			logInFormRegWrapperText.id = "log-in-form__log-in-or-reg-text";
			logInFormRegWrapperText.innerHTML = msgRegister;
			
			const logInFormRegWrapperBtn = document.createElement("input");
			logInFormRegWrapperBtn.setAttribute("type", "button");
			logInFormRegWrapperBtn.id = "log-in-form__btn-reg";
			logInFormRegWrapperBtn.value = "Register";
			
			logInFormRegWrapper.append(logInFormRegWrapperText, logInFormRegWrapperBtn);
			logInForm.append(logInFormNameLabel, logInFormName, logInFormPasswordLabel, logInFormPassword, logInFormSubmit, logInFormRegWrapper);

			this.renderModalWin(logInForm);

		}
		
		// ----- Register form ------
	
		renderRegForm() {
			
			const registerForm = document.createElement("form");
			registerForm.id = "reg-form";
			
			const registerFormName = document.createElement("input");
			registerFormName.id = "reg-form__name";
			registerFormName.type = "text";
			registerFormName.name = "player-name";
			registerFormName.value = "";
			
			const registerFormNameLabel = document.createElement("label");
			registerFormNameLabel.innerHTML = "Name (5-20 characters)";
			registerFormNameLabel.setAttribute("for", "reg-form__name");
			registerFormNameLabel.style.cssText = "display: block; font-size: 12px; margin-bottom: 4px;";
			
			const registerFormPassword = document.createElement("input");
			registerFormPassword.id = "reg-form__password";
			registerFormPassword.type = "password";
			registerFormPassword.name = "player-password";
			registerFormPassword.value = "";
			
			const registerFormPasswordLabel = document.createElement("label");
			registerFormPasswordLabel.innerHTML = "Password (5-20 characters)";
			registerFormPasswordLabel.setAttribute("for", "reg-form__password");
			registerFormPasswordLabel.style.cssText = "display: block; font-size: 12px; margin-bottom: 4px;";

			const registerFormSubmit = document.createElement("input");
			registerFormSubmit.setAttribute("type", "submit");
			registerFormSubmit.id = "reg-form__submit";
			registerFormSubmit.value = "Register";
						
			registerForm.append(registerFormNameLabel, registerFormName, registerFormPasswordLabel, registerFormPassword, registerFormSubmit);

			this.renderModalWin(registerForm);
			
		}
		
		renderMsgRegMistake(msgRegMistake) {
			const regMsgMistakeText = document.createElement("div");
			regMsgMistakeText.innerHTML = msgRegMistake;

			this.renderModalWin(regMsgMistakeText);
		}

		// ----- Log out ------
	
		renderLogOutConfirm(msgLogOutConfirm) {
						
			const logOutWrapper = document.createElement("div");
			logOutWrapper.id = "log-out-wrapper";
			
			const logOutWrapperText = document.createElement("div");
			logOutWrapperText.style.cssText = "margin-bottom: 15px;";
			logOutWrapperText.innerHTML = msgLogOutConfirm;
			
			const logOutBtn = document.createElement("input");
			logOutBtn.setAttribute("type", "button");
			logOutBtn.id = "btn-log-out-confirm";
			logOutBtn.value = "OK";
		
			logOutWrapper.append(logOutWrapperText, logOutBtn);
			
			this.renderModalWin(logOutWrapper);
			
		}

		// ----- Rotate reels ------

		renderReelsRotate(){
			
			this.reelsArr.forEach((el) => {
				el.querySelector(".reel__content").style.filter = "blur(10px)";
				let lastElClone = el.querySelector(".reel__content").querySelectorAll("img")[el.querySelectorAll("img").length - 1].cloneNode();
				el.querySelector(".reel__content").prepend(lastElClone);
				el.querySelector(".reel__content").querySelectorAll("img")[el.querySelectorAll("img").length - 1].remove();
			});

		}
	
		// ----- Stop game ------

		renderStopGame(evtGameStopped) {
				
			this.reelsArr.forEach((el) => {
				el.querySelector(".reel__content").style.filter = "none";
			});
			
			this.container.dispatchEvent(evtGameStopped);
				
		}
	
		// ----- Update game info ------
	
		renderPlayerName(name) {
			if (name) {
				this.container.querySelector("#welcome").innerHTML = "Hello, " + name;
			} else {
				this.container.querySelector("#welcome").innerHTML = "Hello, Anon";
			}
		}

		renderPlayerCredits(credits) {
			this.container.querySelector("#credits-info__content").innerHTML = credits;
		}

		renderPlayerScore(score) {
			this.container.querySelector("#score-info__content").innerHTML = score;
		}

		renderPlayerSpins(spins) {
			this.container.querySelector("#spins-info__content").innerHTML = spins;
		}

		renderSpinTimeCountDown(spinTime) {
			this.container.querySelector("#spin-time-count-down-info__content").innerHTML = `${spinTime / 1000}`;
		}
		
		renderPlayerHiScore(hiScore) {
			this.container.querySelector("#hi-score").innerHTML = "High Score: " + hiScore;
		}
	
		// ----- Blinking and flashing ------
	
		renderTerminalRes(creditsDelta, scoreDelta) {
			this.container.querySelector("#terminal-text").innerHTML = "";
			if (scoreDelta && !creditsDelta) {
				this.container.querySelector("#terminal-text").innerHTML = "+" + scoreDelta + " score!";
			}
			if (!scoreDelta) {
				this.container.querySelector("#terminal-text").innerHTML = "Good luck!";
			}
			if (creditsDelta && scoreDelta) {
				this.container.querySelector("#terminal-text").innerHTML = "+" + scoreDelta + " score!  +" + creditsDelta + " credits!";
			}
		}
		
		renderTerminalBlink() {
			this.container.querySelector("#terminal-text").style.display = this.container.querySelector("#terminal-text").style.display === "none" ? "table-cell" : "none";
		}		

		renderTerminalGoodLuck() {
			this.container.querySelector("#terminal-text").style.display = "table-cell";
			this.container.querySelector("#terminal-text").innerHTML = "Good luck!";
		}
		
		renderDulicatesBlink(duplicates) {
			if (duplicates) {
				duplicates.forEach((el) => {
					el.style.opacity = el.style.opacity  === "1" ? "0" : "1";
				})
			}
		}
		
		renderDulicatesBlinkStop(duplicates) {
			if (duplicates) {
				duplicates.forEach((el) => {
					el.style.opacity = "1";
				})
			}
		}
		
		renderOpacityReset() {
			for (let i = 0; i < this.container.querySelectorAll(".reel").length; i++) {
				let midImg = Math.floor(this.container.querySelectorAll(".reel")[i].querySelectorAll("img").length / 2);
				if (this.container.querySelectorAll(".reel")[i].querySelectorAll("img")[midImg].style.opacity === "0") {
					this.container.querySelectorAll(".reel")[i].querySelectorAll("img")[midImg].style.opacity = "1";
				}
			}
		}
		
		renderFlashing() {
			this.container.querySelector("#terminal-text").innerHTML = "Stop-N-Win";
			this.renderTerminalBlink();
			let borderColorsArr = ["#0066cc", "#ffd700", "#ff0000", "#008000", "#00ffff", "#00ff00", "#fa8072", "#d2691e"];
			this.container.querySelector("#slot-machine-inner").style.borderColor = borderColorsArr[[Math.floor(Math.random() * borderColorsArr.length)]];
		}
		
		renderFlashingStop() {
			this.renderTerminalGoodLuck();
			this.container.querySelector("#terminal-text").style.display = "table-cell";
			this.container.querySelector("#slot-machine-inner").style.borderColor = "#ffd700";
		}
		
		// ----- Game over confirm ------
	
		renderGameOverConfirm(msgOutOfCredits) {
			
			const gameOverConfirmWrapper = document.createElement("div");
			gameOverConfirmWrapper.id = "game-over-confirm-wrapper";
						
			const gameOverConfirmText = document.createElement("div");
			gameOverConfirmText.style.cssText = "margin-bottom: 15px;";
			gameOverConfirmText.innerHTML = msgOutOfCredits;
			
			const gameOverConfirmBtn = document.createElement("input");
			gameOverConfirmBtn.setAttribute("type", "button");
			gameOverConfirmBtn.id = "btn-game-over-confirm";
			gameOverConfirmBtn.value = "OK";
		
			gameOverConfirmWrapper.append(gameOverConfirmText, gameOverConfirmBtn);

			this.renderModalWin(gameOverConfirmWrapper);

		}
		
		// ----- Audio ------
	
		renderAudioBg(audioBgFile) {
			const audioBg = document.createElement("audio");
			audioBg.id = "audio-bg";
			audioBg.src = audioBgFile;
			audioBg.setAttribute("preload", "auto");
			audioBg.setAttribute("controls", "none");
			audioBg.volume = 0.05;
			audioBg.loop = true;
			audioBg.muted = true;
			audioBg.style.display = "none";
			this.container.append(audioBg);
		}
		
		renderAudioBgPlay() {
			this.container.querySelector("#audio-bg").play();
		}
	
		renderAudioBgStop() {
			this.container.querySelector("#audio-bg").pause();
			this.container.querySelector("#audio-bg").currentTime = 0;
		}
		
		renderAudioRotate(audioRotateFile) {
			const audioRotate = document.createElement("audio");
			audioRotate.id = "audio-rotate";
			audioRotate.src = audioRotateFile;
			audioRotate.setAttribute("preload", "auto");
			audioRotate.setAttribute("controls", "none");
			audioRotate.volume = 0.05;
			audioRotate.loop = true;
			audioRotate.muted = true;
			audioRotate.style.display = "none";
			this.container.append(audioRotate);
		}
		
		renderAudioRotatePlay() {
			this.container.querySelector("#audio-rotate").play();
		}
		
		renderAudioRotateStop() {
			this.container.querySelector("#audio-rotate").pause();
			this.container.querySelector("#audio-rotate").currentTime = 0;
		}

		renderAudioWin(audioWinFile) {
			const audioWin = document.createElement("audio");
			audioWin.id = "audio-win";
			audioWin.src = audioWinFile;
			audioWin.setAttribute("preload", "auto");
			audioWin.setAttribute("controls", "none");
			audioWin.volume = 0.05;
			audioWin.loop = true;
			audioWin.muted = true;
			audioWin.style.display = "none";
			this.container.append(audioWin);
		}

		renderAudioWinPlay() {
			this.container.querySelector("#audio-win").play();
		}

		renderAudioWinStop() {
			this.container.querySelector("#audio-win").pause();
			this.container.querySelector("#audio-win").currentTime = 0;
		}
		
		renderSoundsEnable(sounds) {
			sounds.forEach((el) => {
				el.muted = false;
			});
		}
			
		renderSoundsDisable(sounds) {
			sounds.forEach((el) => {
				el.muted = true;
			});
		}	
		
		renderBtnSoundOnShowbtnSoundOffHide() {
			this.container.querySelector("#btn-sound-off").style.display = "none";
			this.container.querySelector("#btn-sound-on").style.display = "block";
		}
		
		renderBtnSoundOffShowbtnSoundOnHide() {
			this.container.querySelector("#btn-sound-on").style.display = "none";
			this.container.querySelector("#btn-sound-off").style.display = "block";
		}

		// ----- Modal window ------
	
		renderModalWin(content) {
			
			const modalWinOverlay = document.createElement("div");
			modalWinOverlay.classList.add("modal-win");

			const modalWinWrapper = document.createElement("div");
			modalWinWrapper.classList.add("modal-win__wrapper");	
			
			const modalWinInner = document.createElement("div");
			modalWinInner.classList.add("modal-win__inner");	
		
			const modalWinBtnClose = document.createElement("div");
			modalWinBtnClose.classList.add("modal-win__btn-close");

			modalWinInner.append(content);
			
			modalWinWrapper.append(modalWinInner, modalWinBtnClose);
			modalWinOverlay.append(modalWinWrapper);
			this.container.append(modalWinOverlay);
			
			modalWinWrapper.style.height = modalWinInner.offsetHeight + "px";
			modalWinWrapper.style.opacity = "1";
			//modalWinWrapper.style.top = "0px";
			
		}
		
		renderModalWinRemove() {
			this.container.querySelector(".modal-win").remove();
		}
		
		renderModalWinResize() {
			this.container.querySelector(".modal-win__wrapper").style.height = this.container.querySelector(".modal-win__inner").offsetHeight + "px";
		}
		
		// ----- Window resize ------
		
		renderWinResize() {
			this.container.querySelector("#slot-machine-inner").style.marginLeft = (window.innerWidth - this.container.querySelector("#slot-machine-inner").offsetWidth) / 2 + "px";
		}
	
	}
	
	// ===== Model =====
	
	class Model {
	
		constructor(view) {
		
			this.view = view;
					
			this.machine = {
				"reelsNum": 5,
				"reelImgsNum": 5,
				"reelImgHeight": 80,
				"reelImgWidth": 80,
				"credits": 500,
				"score": 0,
				"hiScore": 0,
				"spins": 0,
				"spinTime": 10000, // ms
				"countDown": 10
			};
			
			this.reelImgs = {
				"apple": "./img/apple.png",
				"bar": "./img/bar.png",
				"bell": "./img/bell.png",
				"cherry": "./img/cherry.png",
				"diamond": "./img/diamond.png",
				"lemon": "./img/lemon.png",
				"orange": "./img/orange.png",
				"plum": "./img/plum.png",
				"seven": "./img/seven.png",
				"watermelon": "./img/watermelon.png"
			};
		
			this.audios = {
				"bg": "./mp3/bg.mp3",
				"win": "./mp3/win.mp3",
				"rotate": "./mp3/rotate.mp3"
			};
		
			this.player = {
				"loggedIn": false,
				"name": null,
				"name_low": null,
				"pass": null,
				"credits": this.machine.credits,
				"score": 0,
				"hiScore": 0,
				"spins": 0,
				"countdown": 10
			};
						
			this.game = {
				"flashingIntervalId": null,
				"spinTimeCur": 0,
				"startTimeOutId": null,
				"startIntervalId": null,
				"btnStartClicked": 0,
				"btnStopClicked": 1,
				"gameStopTimeoutId": null,
				"spinTimeCountDownId": null,
				"resultsBlinkIntervalId": null,
				"resultsBlinkTimeOutId": null,
				"bestResultsTimeoutId": null,
				"audioWinTimeOutId": null
			};
		
			this.content = {
				"about": ["Stop-N-Win is a simple virtual slot machine. Spin the reels to win score and new credits.",
						"Winning combinations start from two matching elements in the middle row.",
						"For every <strong>two</strong> matching items you get <strong>+25</strong> credits and <strong>+300</strong> score.",
						"If there are <strong>three</strong> matching elements, you get <strong>+100</strong> credits and <strong>+1500</strong> score.",
						"<strong>Four</strong> matching items will bring you <strong>+500</strong> credits and <strong>+3000</strong> score.",
						"If all <strong>five</strong> elements match, you get <strong>+1000</strong> credits and <strong>+10000</strong> score.",
						"One spin costs <strong>100</strong> credits. You have <strong>500</strong> credits to start with.",
						"If you have less than 100 credits, the game is over. You can start a new game.",
						"Log in or register to start playing.",
						"Good luck!"],
				"bestResults": "Top 10 players"
			}
		
			this.messages = {
				"notLoggedIn": "Please, log in or register to start playing.",
				"msgRegister": "If you have no account, please register.",
				"msgLogInMistake": "Login or password are not correct.",
				"msgRegMistake": "Login is occupied. Please, choose another one.",
				"logOutConfirm": "You are going to logout. Please confirm.",
				"outOfCredits": "Not enough credits to continue. You can start a new game."
			}
			
			this.DB = null;

		}
	
		initDB() {
			const DBconfig = {
				apiKey: "AIzaSyCqNTdvuCmVlsB6JDnJXtxkjWEAAWAmhks",
				authDomain: "slot-machine-c3fdb.firebaseapp.com",
				databaseURL: "https://slot-machine-c3fdb-default-rtdb.firebaseio.com",
				projectId: "slot-machine-c3fdb",
				storageBucket: "slot-machine-c3fdb.appspot.com",
				messagingSenderId: "479096106205",
				appId: "1:479096106205:web:e70aa7d59d755d489cff34"
			};
			firebase.initializeApp(DBconfig);
			this.DB = firebase.database();
			this.getDBvals();
		}
		
		getDBvals() {
			let that = this;
			this.DB.ref("players/").once("value")
			.then(function(snapshot) {
				that.DBObj = {};
				that.DBObj = snapshot.val();
			}).catch(function (error) {
				console.log("Ошибка Firebase: " + error.code);
			});
		}
	
		createHeader() {
			this.view.renderHeader(this.player);
		}
	
		createSM() {
			this.view.renderSM(this.machine, this.reelImgs);
			this.createFlashing();
		}
		
		createSounds() {
			this.createAudioBg();
			this.createAudioRotate();
			this.createAudioWin();
		}
	
		createFlashing() {
			let that = this;
			if (this.game.flashingIntervalId) {
				clearInterval(this.game.flashingIntervalId);
				this.game.flashingIntervalId = null;
			}
			this.game.flashingIntervalId = setInterval(function() {
				that.view.renderFlashing();
			}, 500);
		}
	
		// ----- About ------
		
		createAboutContent() {
			this.view.renderAboutContent(this.content.about);
		}

		// ----- Best results ------
		
		createBestResultsContent() {
			
			this.view.renderBestResultsContent(this.content.bestResults);
			
			let that = this;
			
			this.game.bestResultsTimeoutId = setTimeout(function(){
				
				if (that.DBObj && Object.keys(that.DBObj).length !== 0) {
					let winners = [];
					for (let key in that.DBObj) {
						if (that.DBObj[key].pHiScore > 0) {
							winners.push({
								"player" : that.DBObj[key].pName,
								"hiscore": that.DBObj[key].pHiScore
							});
						}
					}
					winners = winners.sort((a, b) => b.hiscore - a.hiscore).slice(0, 10);
					that.view.renderBestResultsList(winners);
				}
				
				clearTimeout(that.game.bestResultsTimeoutId);
				that.game.bestResultsTimeoutId = null;
				
			}, 1000);	

		}
		
		// ----- Log in ------
	
		createLogInForm() {
			this.view.renderLogInForm(this.messages.msgRegister);
		}

		loginPlayer(playerName, playerPassword) {
			
			this.player.name_low = playerName.toLowerCase();
			this.player.name = playerName;
			this.player.pass = playerPassword;
						
			if (this.DBObj[`player_${this.player.name_low}`]
				&& playerName === this.DBObj[`player_${this.player.name_low}`].pName
				&& this.player.pass === this.DBObj[`player_${this.player.name_low}`].pPassword) {
				
				this.player.loggedIn = true;
				this.view.renderPlayerName(this.DBObj[`player_${this.player.name_low}`].pName);
				this.view.renderModalWinRemove();
				this.logOutLinkShowLogInLinkHide();
				
			} else {
				this.view.renderMsgLogInMistake(this.messages.msgLogInMistake);
				this.player.name_low = null;
				this.player.name = null;
				this.player.pass = null;
			}

		}
	
		// ----- Register ------
		
		createRegForm() {
			this.view.renderRegForm();
		}
			
		regPlayer(playerName, playerPassword) {
			
			this.player.name_low = playerName.toLowerCase();
			
			if (this.DBObj[`player_${this.player.name_low }`] in this.DBObj) {
							
				this.player.name = playerName;			
				this.player.pass = playerPassword;
				this.player.loggedIn = true;
				this.view.renderPlayerName(playerName);
				this.view.renderModalWinRemove();
				this.logOutLinkShowLogInLinkHide();
			
				// ----- Firebase -----
				
				this.DB.ref("players/"+ `player_${this.player.name_low}`).set({
					pName: this.player.name,
					pPassword: this.player.pass,
					pHiScore: this.machine.hiScore
				})
				.then(function (username) {
					console.log("Пользователь зарегистрирвоан в базе Firebase.");
				})
				.catch(function (error) {
					console.error("Ошибка регистрации пользователя: ", error);
				});
				
			} else {
				this.view.renderMsgRegMistake(this.messages.msgRegMistake);
				return;
			}
		}

		logInLinkShowLogOutLinkHide() {
			this.view.renderLogInLinkShowLogOutLinkHide();
		}
	
		logOutLinkShowLogInLinkHide() {
			this.view.renderLogOutLinkShowLogInLinkHide();
		}
	
		// ----- Start slots ------
		
		gameStart(evtGameStopped) {
			
			if (this.player.loggedIn) {
				
				if (this.game.btnStartClicked === 0 && this.game.btnStopClicked !== 0) {
						
					if (this.player.credits >= 100) {
						
						if (this.game.audioWinTimeOutId) {
							this.stopAudioWin();
							clearTimeout(this.game.audioWinTimeOutId);
							this.game.audioWinTimeOutId = null;
						}
						
						this.playAudioRotate();
												
						if (this.game.resultsBlinkIntervalId) {
							clearInterval(this.game.resultsBlinkIntervalId);
							this.game.resultsBlinkIntervalId = null;
						}

						if (this.game.resultsBlinkTimeOutId) {
							clearTimeout(this.game.resultsBlinkTimeOutId);
							this.game.resultsBlinkTimeOutId = null;
						}
						
						if (this.game.flashingIntervalId) {
							clearInterval(this.game.flashingIntervalId);
							this.game.flashingIntervalId = null;
							this.view.renderFlashingStop();
						}
												
						this.view.renderTerminalGoodLuck();
						
						this.player.spins++;
						this.view.renderPlayerSpins(this.player.spins);
						
						if (this.player.spins > 1) {
							this.view.renderRandImgs(this.machine, this.reelImgs);
						}
						
						this.player.credits -= 100;
						this.view.renderPlayerCredits(this.player.credits);
						
						this.game.spinTimeCur = this.machine.spinTime;
						this.view.renderSpinTimeCountDown(this.game.spinTimeCur);
												
						let that = this;
						
						this.game.spinTimeCountDownId = setInterval(function() {						
							that.game.spinTimeCur -= 1000;
							if (that.game.spinTimeCur <= 0) {
								that.game.spinTimeCur = 0;
							}
							that.view.renderSpinTimeCountDown(that.game.spinTimeCur);
						}, 1000);

						this.game.startTimeOutId = setTimeout(function(){
							that.gameStop(evtGameStopped);
							that.game.spinTimeCur = 0;
							that.view.renderSpinTimeCountDown(that.game.spinTimeCur);
						}, that.machine.spinTime);						

						this.game.startIntervalId = setInterval(function() {
							that.view.renderReelsRotate();							
						}, 1000 / 60);
						
						this.game.btnStartClicked++;
						this.game.btnStopClicked = 0;

					} else {
						this.gameOver();
					}

				} else {
					return;
				}

			} else {
				this.view.renderMsgLogIn(this.messages.notLoggedIn);
			}

		}
	
		// ----- Stop slots ------
		
		gameStop(evtGameStopped) {
			
			if (this.player.loggedIn) {
				
				if (this.game.btnStopClicked === 0) {
					
					this.stopAudioRotate();
									
					clearTimeout(this.game.spinTimeCountDownId);
					this.game.spinTimeCountDownId = null;

					clearInterval(this.game.startTimeOutId);
					this.game.startTimeOutId = null;
								
					let that = this;
					this.game.gameStopTimeoutId = setTimeout(function(){	
						
						clearTimeout(that.game.startIntervalId);
						that.game.startIntervalId = null;
						
						that.view.renderStopGame(evtGameStopped);
						
						clearTimeout(that.game.gameStopTimeoutId);
						that.game.gameStopTimeoutId = null;
						
					}, 350);
					
					clearInterval(this.game.resultsBlinkIntervalId);
					this.game.resultsBlinkIntervalId = null;

					clearTimeout(this.game.resultsBlinkTimeOutId);
					this.game.resultsBlinkTimeOutId = null;

					clearInterval(this.game.flashingIntervalId);
					this.game.flashingIntervalId = null;
					this.view.renderFlashingStop();
					
					this.game.btnStartClicked = 0;
					this.game.btnStopClicked++;
					
				} else {
					return;
				}
				
			}

		}
		
		// ----- Calculate game results ------
		
		calcGameResults(resCombinations, duplicates) {
			
			this.game.resCombinations = {};
			this.game.resCombinations = resCombinations;
			
			let creditsDelta = 0;
			let scoreDelta = 0;
			
			if (this.game.resCombinations["apple"] && this.game.resCombinations["apple"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["bar"] && this.game.resCombinations["bar"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["bell"] && this.game.resCombinations["bell"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["cherry"] && this.game.resCombinations["cherry"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["diamond"] && this.game.resCombinations["diamond"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["lemon"] && this.game.resCombinations["lemon"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["orange"] && this.game.resCombinations["orange"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["plum"] && this.game.resCombinations["plum"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["seven"] && this.game.resCombinations["seven"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["watermelon"] && this.game.resCombinations["watermelon"] === 2) {
				creditsDelta += 25;
				scoreDelta += 300;
				this.player.credits += 25;
				this.player.score += 300;
			}
			
			if (this.game.resCombinations["apple"] && this.game.resCombinations["apple"] === 3
				|| this.game.resCombinations["bar"] && this.game.resCombinations["bar"] === 3
				|| this.game.resCombinations["bell"] && this.game.resCombinations["bell"] === 3
				|| this.game.resCombinations["cherry"] && this.game.resCombinations["cherry"] === 3
				|| this.game.resCombinations["diamond"] && this.game.resCombinations["diamond"] === 3
				|| this.game.resCombinations["lemon"] && this.game.resCombinations["lemon"] === 3
				|| this.game.resCombinations["orange"] && this.game.resCombinations["orange"] === 3
				|| this.game.resCombinations["plum"] && this.game.resCombinations["plum"] === 3
				|| this.game.resCombinations["seven"] && this.game.resCombinations["seven"] === 3
				|| this.game.resCombinations["watermelon"] && this.game.resCombinations["watermelon"] === 3) {
				creditsDelta += 100;
				scoreDelta += 1500;
				this.player.credits += 100;
				this.player.score += 1500;
			}
			
			if (this.game.resCombinations["apple"] && this.game.resCombinations["apple"] === 4
				|| this.game.resCombinations["bar"] && this.game.resCombinations["bar"] === 4
				|| this.game.resCombinations["bell"] && this.game.resCombinations["bell"] === 4
				|| this.game.resCombinations["cherry"] && this.game.resCombinations["cherry"] === 4
				|| this.game.resCombinations["diamond"] && this.game.resCombinations["diamond"] === 4
				|| this.game.resCombinations["lemon"] && this.game.resCombinations["lemon"] === 4
				|| this.game.resCombinations["orange"] && this.game.resCombinations["orange"] === 4
				|| this.game.resCombinations["plum"] && this.game.resCombinations["plum"] === 4
				|| this.game.resCombinations["seven"] && this.game.resCombinations["seven"] === 4
				|| this.game.resCombinations["watermelon"] && this.game.resCombinations["watermelon"] === 4) {
				creditsDelta = 500;
				scoreDelta = 3000;
				this.player.credits += 500;
				this.player.score += 3000;
			}
			
			if (this.game.resCombinations["apple"] && this.game.resCombinations["apple"] === 5
				|| this.game.resCombinations["bar"] && this.game.resCombinations["bar"] === 5
				|| this.game.resCombinations["bell"] && this.game.resCombinations["bell"] === 5
				|| this.game.resCombinations["cherry"] && this.game.resCombinations["cherry"] === 5
				|| this.game.resCombinations["diamond"] && this.game.resCombinations["diamond"] === 5
				|| this.game.resCombinations["lemon"] && this.game.resCombinations["lemon"] === 5
				|| this.game.resCombinations["orange"] && this.game.resCombinations["orange"] === 5
				|| this.game.resCombinations["plum"] && this.game.resCombinations["plum"] === 5
				|| this.game.resCombinations["seven"] && this.game.resCombinations["seven"] === 5
				|| this.game.resCombinations["watermelon"] && this.game.resCombinations["watermelon"] === 5) {
				creditsDelta = 1000;
				scoreDelta = 10000;
				this.player.credits += 1000;
				this.player.score += 10000;
			}
						
			this.player.hiScore = this.player.score;
			
			this.view.renderPlayerCredits(this.player.credits);
			this.view.renderPlayerScore(this.player.score);
			this.view.renderPlayerHiScore(this.player.hiScore);
			this.view.renderTerminalRes(creditsDelta, scoreDelta);

			// ----- Firebase -----
			
			this.getDBvals();
			
			if (this.DBObj[`player_${this.player.name_low}`].pHiScore < this.player.hiScore) {
				this.DB.ref("players/"+ `player_${this.player.name_low}`).update({
					pHiScore: this.player.hiScore
				}).then(function () {
					//console.log("Очки пользователя обновлены в базе Firebase.");
				}).catch(function (error) {
					console.error("Ошибка добавления пользователя: ", error);
				});				
			};
			
			let that = this;
			
			this.game.resultsBlinkIntervalId = setInterval(function() {
				that.view.renderTerminalBlink();
				that.view.renderDulicatesBlink(duplicates);
			}, 300);
			
			this.game.resultsBlinkTimeOutId = setTimeout(function() {
				that.view.renderTerminalGoodLuck();
				that.view.renderDulicatesBlinkStop(duplicates);
				clearInterval(that.game.resultsBlinkIntervalId);
				that.game.resultsBlinkIntervalId = null;
			}, 2500);
			
			if (duplicates.length !== 0) {
				this.playAudioWin();
				this.game.audioWinTimeOutId = setTimeout(function() {
					that.stopAudioWin();
					clearTimeout(that.game.audioWinTimeOutId);
					that.game.audioWinTimeOutId = null;
				}, 2500);
			};		
			
		}

		// ----- Game over ------
		
		gameOver() {
			this.view.renderGameOverConfirm(this.messages.outOfCredits);
		}
		
		// ----- Game reset ------
	
		gameReset() {
			
			this.playerReset();
			
			clearInterval(this.game.resultsBlinkIntervalId);			
			this.game.resultsBlinkIntervalId = null;

			clearTimeout(this.game.resultsBlinkTimeOutId);
			this.game.resultsBlinkTimeOutId = null;
			
			clearTimeout(this.game.startIntervalId);
			this.game.startIntervalId = null;

			clearInterval(this.game.startTimeOutId);
			this.game.startTimeOutId = null;

			clearTimeout(this.game.spinTimeCountDownId);
			this.game.spinTimeCountDownId = null;
			this.game.spinTimeCountDownId = null;
						
			this.game.btnStartClicked = 0;
			
			this.createFlashing();
			
			this.view.renderOpacityReset();
		}
		
		// ----- Log out ------
		
		createLogOutConfirm() {
			this.view.renderLogOutConfirm(this.messages.logOutConfirm);
		}
		
		playerLogOut() {
			this.player.name = "";
			this.player.name_low = null;
			this.player.loggedIn = false;
			this.view.renderPlayerName(this.player.name);
			this.playerReset();
			this.gameReset();
		}
		
		// ----- Reset player ------
			
		playerReset() {
				
			this.player.credits = this.machine.credits;
			this.view.renderPlayerCredits(this.player.credits);
			
			this.player.score = this.machine.score;
			this.view.renderPlayerScore(this.player.score);
			
			this.player.hiScore = this.machine.hiScore;
			this.view.renderPlayerHiScore(this.player.hiScore);

			this.view.renderSpinTimeCountDown(this.machine.spinTime);
			
			this.player.spins = this.machine.spins;
			this.view.renderPlayerSpins(this.player.spins);
			
		}

		// ----- Audio ------

		createAudioBg() {
			this.view.renderAudioBg(this.audios.bg);
		}

		playAudioBg() {
			this.view.renderAudioBgPlay();
		}

		stopAudioBg() {
			this.view.renderAudioBgStop();
		}

		createAudioRotate() {
			this.view.renderAudioRotate(this.audios.rotate);
		}

		playAudioRotate() {
			this.view.renderAudioRotatePlay();
		}
		
		stopAudioRotate() {
			this.view.renderAudioRotateStop();
		}
		
		createAudioWin() {
			this.view.renderAudioWin(this.audios.win);
		}
		
		playAudioWin() {
			this.view.renderAudioWinPlay();
		}		

		stopAudioWin() {
			this.view.renderAudioWinStop();
		}		

		soundsEnable(sounds) {
			this.view.renderSoundsEnable(sounds);
			this.playAudioBg();
			this.view.renderBtnSoundOnShowbtnSoundOffHide();
		}

		soundsDisable(sounds) {
			this.view.renderSoundsDisable(sounds);
			this.view.renderBtnSoundOffShowbtnSoundOnHide();
		}

		// ----- Remove modal window ------
			
		modalWinRemove() {
			this.view.renderModalWinRemove();
		}

		// ----- Window resize ------

		createWinResize() {
			this.view.renderWinResize();
		}

	}

	// ===== Controller =====
	
	class Controller {

		constructor(container, model) {
			this.container = container;
			this.model = model;
			this.init();
		}

		init() {
			this.model.createHeader();
			this.model.createSM();
			this.model.initDB();
			this.model.createSounds();
			this.addEventListeners();
		}
		
		addEventListeners() {
			this.container.addEventListener("click", this.clicksHandler.bind(this));
			this.container.addEventListener("submit", this.submitsHandler.bind(this));
			this.container.addEventListener("input", this.inputsHandler.bind(this));
			
			this.evtGameStopped = new Event("eGameStop");
			this.container.addEventListener("eGameStop", this.gameResultImgsHandler.bind(this));
			
			window.addEventListener("resize", this.winResizeHandler.bind(this));
		}
		
		clicksHandler(e) {
			
			if (e.target.id === "about") {
				this.aboutLinkClick();
			}
			
			if (e.target.id === "best-results") {
				this.bestResultsLinkClick();
			}
			
			if (e.target.id === "log-in-link") {
				this.logInLinkClick();
			}
			
			if (e.target.id === "log-in-form__btn-reg") {
				e.preventDefault();
				this.logInFormBtnRegClick();
			}
			
			if (e.target.id === "log-out-link") {
				this.logOutLinkClick();
			}
			
			if (e.target.id === "btn-start") {
				e.preventDefault();
				this.gameStart();
			}
			
			if (e.target.id === "btn-stop") {
				e.preventDefault();
				this.gameStop();
			}

			if (e.target.id === "btn-log-in-confirm") {
				e.preventDefault();
				this.logInLinkClick();
				this.modalWinRemoveHandler();
			}

			if (e.target.id === "btn-game-over-confirm") {
				e.preventDefault();
				this.gameOverConfirm();
			}

			if (e.target.id === "btn-log-out-confirm") {
				e.preventDefault();
				this.logOutConfirm();
			}

			if (e.target.classList.contains("modal-win__btn-close")) {
				this.modalWinClose(e.target);		
			}
			
			if (e.target.classList.contains("btn-sound")) {
				this.audioHandler(e.target);		
			}
			
		}
		
		inputsHandler(e) {
			if (e.target === this.formName) {
				this.validateFormName.call(this.formName);
			}
			if (e.target === this.formPassword) {
				this.validateFormPassword.call(this.formPassword);
			}
		}
		
		submitsHandler(e) {
			if (e.target === this.logInForm) {
				e.preventDefault();
				this.submitLogInForm();
			}
			if (e.target === this.regForm) {
				e.preventDefault();
				this.submitRegForm();
			}
		}
		
		aboutLinkClick() {
			this.model.createAboutContent();
		}
		
		bestResultsLinkClick() {
			this.model.createBestResultsContent();
		}
		
		logInLinkClick() {
			this.model.createLogInForm();
			this.logInForm = this.container.querySelector("#log-in-form");
			this.formName = this.container.querySelector("#log-in-form__name");
			this.formPassword = this.container.querySelector("#log-in-form__password");
		}

		gameOverConfirm() {
			this.model.gameReset();
			this.model.modalWinRemove();
		}

		validateFormName() {
			if (this.value && this.value.trim() != "" && this.value.length > 4 && this.value.length < 21) {
				if (this.classList.contains("invalid")) {this.classList.remove("invalid")};
				this.classList.add("valid");
				this.value = this.value.trim();
				return this.value;
			} else {
				if (this.classList.contains("valid")) {this.classList.remove("valid")};
				this.classList.add("invalid");
			}
		}
		
		validateFormPassword() {
			if (this.value && this.value.length > 4 && this.value.length < 21) {
				if (this.classList.contains("invalid")) {this.classList.remove("invalid")};
				this.classList.add("valid");
				return this.value;
			} else {
				if (this.classList.contains("valid")) {this.classList.remove("valid")};
				this.classList.add("invalid");
			}	
		}
		
		submitLogInForm() {
			if (this.formName.classList.contains("valid") && this.formPassword.classList.contains("valid")) {
				this.model.loginPlayer(this.formName.value, this.formPassword.value);
				this.logInForm.reset();
				this.formName.classList.remove("valid");
				this.formPassword.classList.remove("valid");
			} else {
				if (!this.formName.classList.contains("valid")) {this.formName.classList.add("invalid")};
				if (!this.formPassword.classList.contains("valid")) {this.formPassword.classList.add("invalid")};
				return;
			}
		}
		
		logInFormBtnRegClick() {
			
			this.model.modalWinRemove();
			this.model.createRegForm();
			
			this.regForm = this.container.querySelector("#reg-form");
			this.formName = this.container.querySelector("#reg-form__name");
			this.formPassword = this.container.querySelector("#reg-form__password");

		}
		
		submitRegForm() {		
			if (this.formName.classList.contains("valid") && this.formPassword.classList.contains("valid")) {
				this.model.regPlayer(this.formName.value, this.formPassword.value);
				this.regForm.reset();
				this.formName.classList.remove("valid");
				this.formPassword.classList.remove("valid");
			} else {
				this.formName.classList.add("invalid");
				this.formPassword.classList.add("invalid");
				return;
			}
		}
		
		logOutLinkClick() {
			this.model.createLogOutConfirm();
		}
		
		logOutConfirm() {
			this.model.logInLinkShowLogOutLinkHide();
			this.model.playerLogOut();
			this.model.modalWinRemove();
		}
			
		gameStart() {
			this.model.gameStart(this.evtGameStopped, this.evtOutOfCredits);
		}
		
		gameResultImgsHandler() {

			this.reelsArrRes = [];
			for (let i = 0; i < this.container.querySelectorAll(".reel").length; i++) {
				this.reelsArrRes.push(this.container.querySelectorAll(".reel")[i]);
			}
			
			let midImg = Math.floor(this.container.querySelectorAll(".reel")[0].querySelectorAll("img").length / 2);
		
			this.reelsMidImgsClassesArr = [];
			this.reelsArrRes.forEach((el) => {
				this.reelsMidImgsClassesArr.push(el.querySelectorAll("img")[midImg].getAttribute("class"));
			});
			
			this.resCombinations = {};			
			this.resCombinations = this.reelsMidImgsClassesArr.reduce((prev, cur) => (prev[cur] = ++prev[cur] || 1, prev), {});
			
			this.reelsMidImgsArr = [];
			this.reelsArrRes.forEach((el) => {
				this.reelsMidImgsArr.push(el.querySelectorAll("img")[midImg]);
			});

			let duplicatesClasses = [];
			duplicatesClasses = this.reelsMidImgsClassesArr.filter((el, i, arr) => arr.indexOf(el) === i && arr.lastIndexOf(el) !== i);
			
			let duplicates = [];
			if (duplicatesClasses.length > 0) {
				for (let i = 0; i < duplicatesClasses.length; i++) {
					this.reelsMidImgsArr.forEach((el) => {
						if (el.getAttribute("class") === duplicatesClasses[i]) {
							duplicates.push(el);
						}
					})
				}
			}			
			
			this.model.calcGameResults(this.resCombinations, duplicates);

		}
		
		gameStop() {
			this.model.gameStop(this.evtGameStopped);
		}
		

		modalWinClose(targetBtn) {
			targetBtn.closest(".modal-win").remove();
		}
		
		modalWinRemoveHandler() {
			this.model.modalWinRemove();
		}
		
		audioHandler(btnSound) {
			
			this.sounds = [];
			
			for (let i = 0; i < this.container.querySelectorAll("audio").length; i++) {
				this.sounds.push(this.container.querySelectorAll("audio")[i]);
			}
				
			if (btnSound === this.container.querySelector("#btn-sound-off")) {
				this.model.soundsEnable(this.sounds);
			}
			if (btnSound === this.container.querySelector("#btn-sound-on")) {
				this.model.soundsDisable(this.sounds);
			}

		}
			
		winResizeHandler() {
			this.model.createWinResize();
		}

	}
		
	return {
        init() {
			const containerSM = document.querySelector("#slot-machine");
			const viewSM = new View(containerSM);
			const modelSM = new Model(viewSM);
			const controllerSM = new Controller(containerSM, modelSM);
        }
    }

})();

SM.init();