!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);const s=Object({CREATED:0,EXECUTING:1,PAUSED:2,STOPPED:3});class n extends EventTarget{constructor(e){super(),null!=e&&""!=e||(e=Date.now().toString()),this._screen=document.createElement("div"),this._screen.style.position="absolute",this._screen.style.opacity=0,this._state=s.CREATED,this._id=e}stop(){this._screen.style.opacity=0,this.state=s.STOPPED,this.dispatchEvent(new CustomEvent("OnStop"))}start(){this._screen.style.opacity=1,this.state=s.EXECUTING,this.dispatchEvent(new CustomEvent("OnStart"))}pause(){this._screen.style.opacity=0,this.state=s.PAUSED,this.dispatchEvent(new CustomEvent("OnPause"))}reset(){this._screen.style.opacity=0,this.state=s.CREATED,this.dispatchEvent(new CustomEvent("OnReset"))}get state(){return this._state}get id(){return this._id}onKeyboardEvent(e){}set state(e){this.dispatchEvent(new CustomEvent("StateChanging",{detail:{oldState:this._state,newState:e}})),this._state=e}}class r extends EventTarget{constructor(e){super(),this.body=new Array,this.lastPlace={x:0,y:0},this.millisecondsPerStep=200,this.alive=!0,this.gameField=e;let t={x:0,y:0,div:null};for(let i=0;i<3;i++)if(e.isFreeCell(t))e.takeСell(t),this.body.push(t);else if(e.isFreeCell({x:t.x+1,y:t.y}))t={x:t.x+1,y:t.y,div:null},e.takeСell(t),this.body.push(t);else{if(!e.isFreeCell({x:t.x,y:t.y+1})){if(t.x+1<e.maxX)t={x:t.x+1,y:t.y,div:null};else if(t.y+1<e.maxY)t={x:t.x,y:t+y,div:null};else if(0!=this.body.length)break;i-=1;continue}t={x:t.x,y:t.y+1,div:null},e.takeСell(t),this.body.push(t)}this.direction={x:0,y:1},this.gameField.updateSegments({detail:this.body})}get head(){return this.body[0]}kill(){this.alive&&(this.stop(),this.dispatchEvent(new Event("Death")),this.alive=!1)}move(){this.intervalId=setInterval(this.makeStep.bind(this),this.millisecondsPerStep)}stop(){clearInterval(this.intervalId)}addSegment(){this.body.push({x:this.lastPlace.x,y:this.lastPlace.y,div:null}),this.dispatchEvent(new CustomEvent("GrowUp",{detail:this.body}))}makeStep(){this.dispatchEvent(new CustomEvent("PrevStep",{detail:this.body})),this.lastPlace.x=this.body[this.body.length-1].x,this.lastPlace.y=this.body[this.body.length-1].y;for(let e=this.body.length-1;e>0;e--){let t=this.body[e],i=this.body[e-1];t.x=i.x,t.y=i.y}this.body[0].x+=this.direction.x,this.body[0].y+=this.direction.y,this.dispatchEvent(new CustomEvent("Step",{detail:this.body})),this.gameField.updateSegments({detail:this.body}),this.draw()}changeDirection(e){let t=this.body[0],i=this.body[1];if(t.x+e.x==i.x||t.y+e.y==i.y)return;let s={oldDirection:this.direction,newDirection:e};this.direction=e,this.dispatchEvent(new CustomEvent("ChangeDirection",{detail:s}))}draw(){for(let e=this.body.length-1;e>=0;e--){let t=this.body[e].div;0==e?(t.style.backgroundImage="url(images/snakeHead.png)",t.style.zIndex=1):(t.style.backgroundImage="url(images/snakeBody.png)",t.style.zIndex=0),t.style.backgroundPosition="center",t.style.backgroundSize="cover"}}onCollision(e,t){if(t instanceof r&&this===t)for(let e=1;e<this.body.length;e++)this.body[0].x==this.body[e].x&&this.body[0].y==this.body[e].y&&this.kill()}}function o(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}class h extends EventTarget{constructor(e){super(),this.body=[],this.gameField=e;let t={x:o(0,e.columnsCount-1),y:o(0,e.rowsCount-1)};for(;!e.isFreeCell(t);)t={x:o(0,e.columnsCount-1),y:o(0,e.rowsCount-1)};t.div=null,this.body.push({x:t.x,y:t.y,div:null}),this.gameField.updateSegments({detail:this.body}),this.draw()}onCollision(e,t){if(t instanceof r){e.score=e.score+1,t.addSegment();let i={x:o(0,this.gameField.columnsCount-1),y:o(0,this.gameField.rowsCount-1)};for(;!this.gameField.isFreeCell(i);)i={x:o(0,this.gameField.columnsCount-1),y:o(0,this.gameField.rowsCount-1)};this.body[0].x=i.x,this.body[0].y=i.y}this.gameField.updateSegments({detail:this.body})}draw(){for(let e=0;e<this.body.length;e++){let t=this.body[e].div;t.style.backgroundImage="url(images/apple.png)",t.style.backgroundPosition="center",t.style.backgroundSize="cover"}}}class l extends EventTarget{constructor(e){super(),this.body=new Array,this.gameField=e,this.buffer={},this.resetBody()}resetBody(){for(let e=0;e<2;e++){let e=this.gameField.getFreeCell();this.body.push({x:e.x,y:e.y,div:null})}this.gameField.updateSegments({detail:this.body}),this.draw()}clearBody(){this.gameField.freeSegments({detail:this.body});for(let e=this.body.length-1;e>=0;e--)this.body[e].div.remove(),this.body[e].div=null,this.body.splice(e,1)}onCollision(e,t){if(t instanceof r)for(let e=0;e<this.body.length;e++)if(this.body[e].x==t.body[0].x&&this.body[e].x==t.body[0].x){t.addEventListener("PrevStep",this.goThroughThePortalPrev.bind(this,t,this.body[(e+1)%2].x,this.body[(e+1)%2].y),{once:!0}),this.clearBody();break}}goThroughThePortalPrev(e,t,i){this.buffer.oldDirection=e.direction,e.direction={x:t-e.head.x,y:i-e.head.y},e.addEventListener("Step",this.goThroughThePortal.bind(this,e),{once:!0})}goThroughThePortal(e,t,i){e.direction={x:this.buffer.oldDirection.x,y:this.buffer.oldDirection.y},setTimeout(this.resetBody.bind(this),o(1e3,1e4))}draw(){this.body[0].div.style.borderColor="rgb(64, 64, 192)",this.body[0].div.style.borderStyle="solid",this.body[0].div.style.boxSizing="border-box",this.body[0].div.style.borderWidth="2px",this.body[1].div.style.borderColor="rgb(224, 96, 0)",this.body[1].div.style.borderStyle="solid",this.body[1].div.style.boxSizing="border-box",this.body[1].div.style.borderWidth="2px"}}class a extends EventTarget{constructor(e,t,i,s,n,r){if(super(),null==r||""==r)throw SyntaxError("Parameter 'name' is undefined!");let o=document.body;null!=n&&(o=n),this.segmentWidth=20,this.segmentHeight=20,this.minSegmentCountToEdge=4,this._visibleArea={x:0,y:0,minX:0,maxX:0,minY:0,maxY:0},this._visibleAreaWidth=i,this._visibleAreaHeight=s,this._gamefieldDiv=document.getElementById(r),null==this._gamefieldDiv&&(this._gamefieldDiv=document.createElement("div"),this._gamefieldDiv.id=r,o.appendChild(this._gamefieldDiv));let h=document.createElement("div");h.id="arrow-up",h.classList.add("arrow");let l=document.createElement("div");l.id="arrow-down",l.classList.add("arrow");let a=document.createElement("div");a.id="arrow-left",a.classList.add("arrow");let d=document.createElement("div");d.id="arrow-right",d.classList.add("arrow"),this._gamefieldDiv.appendChild(h),this._gamefieldDiv.appendChild(l),this._gamefieldDiv.appendChild(a),this._gamefieldDiv.appendChild(d),this.viewPortDiv=document.getElementById(r),this.viewPortDiv.style.width=this._visibleAreaWidth,this.viewPortDiv.style.height=this._visibleAreaHeight,this.viewPortDiv.style.overflow="hidden",this.arrows={up:document.getElementById("arrow-up"),down:document.getElementById("arrow-down"),left:document.getElementById("arrow-left"),right:document.getElementById("arrow-right")};let c=document.createElement("div");c.style.position="relative",c.style.border="1px solid rgb(0, 224, 0)",c.style.boxShadow="0 0 10px rgb(0, 224, 0)",c.style.webkitBoxShadow="0 0 10px rgb(0, 224, 0)",c.style["-webkit-transition"]="all 0.2s ease-out",this.viewPortDiv.append(c),this.fieldDiv=c,this.fieldDiv.style.width=e*this.segmentWidth,this.fieldDiv.style.height=t*this.segmentHeight,this.field=new Array(t);for(let i=0;i<t;i++){this.field[i]=new Array(e);for(let t=0;t<e;t++)this.field[i][t]={busy:!1}}this.setupViewPortPosition()}get columnsCount(){return this.field[0].length}get rowsCount(){return this.field.length}isFreeCell(e){return!this.field[e.y][e.x].busy}"takeСell"(e){this.field[e.y][e.x].busy=!0}addSegment(e){let t=e.detail;for(let e=0;e<t.length;e++){let i=t[e];if(null==i.div){let e=document.createElement("div");e.style.position="absolute",e.style.width=this.segmentWidth,e.style.height=this.segmentHeight,e.style.left=i.x*this.segmentWidth,e.style.top=i.y*this.segmentHeight,e.style.transformOrigin="center center",this.fieldDiv.append(e),i.div=e}}}freeSegments(e){let t=e.detail;for(let e=0;e<t.length;e++)this.field[t[e].y][t[e].x].busy=!1}updateSegments(e){let t=e.detail;for(let i=0;i<t.length;i++){let s=t[i];null==s.div&&this.addSegment(e),s.div.style.left=s.x*this.segmentWidth,s.div.style.top=s.y*this.segmentHeight,this.field[s.y][s.x].busy=!0}}showArrows(){this.fieldDiv.clientWidth+Number(this.fieldDiv.style.left.replace("px",""))>this.viewPortDiv.clientWidth?this.arrows.right.style.opacity=.5:this.arrows.right.style.opacity=0,Number(this.fieldDiv.style.left.replace("px",""))<0?this.arrows.left.style.opacity=.5:this.arrows.left.style.opacity=0,this.fieldDiv.clientHeight+Number(this.fieldDiv.style.top.replace("px",""))>this.viewPortDiv.clientHeight?this.arrows.down.style.opacity=.5:this.arrows.down.style.opacity=0,Number(this.fieldDiv.style.top.replace("px",""))<0?this.arrows.up.style.opacity=.5:this.arrows.up.style.opacity=0}setupViewPortPosition(){this.moveViewPort(0,0)}moveViewPort(e,t){this.resetVisibleArea(e,t),this.fieldDiv.style.left=-e*this.segmentWidth,this.fieldDiv.style.top=-t*this.segmentHeight,this.showArrows()}resetVisibleArea(e,t){this._visibleArea.x=e,this._visibleArea.y=t,this._visibleArea.minX=this._visibleArea.x+4,this._visibleArea.maxX=this._visibleArea.x+(this._visibleAreaWidth/this.segmentWidth-1)-4,this._visibleArea.minY=this._visibleArea.y+4,this._visibleArea.maxY=this._visibleArea.y+(this._visibleAreaHeight/this.segmentHeight-1)-4,this.dispatchEvent(new Event("ChangeVisibleArea"))}needViewPortRemoving(e){let t=this._visibleArea.minX,i=this._visibleArea.maxX,s=this._visibleArea.minY,n=this._visibleArea.maxY;return e.x<t||e.x>i||e.y<s||e.y>n}moveViewPortOnStep(e){let t=e.detail[0];if(this.needViewPortRemoving(t)){let e=t.x,i=t.y,s=this._visibleArea.minX,n=this._visibleArea.minY,r=this._visibleArea.maxX,o=this._visibleArea.maxY,h=this.minSegmentCountToEdge,l=this._visibleAreaWidth/this.segmentWidth,a=this._visibleAreaHeight/this.segmentHeight,d=this._visibleArea.x,c=this._visibleArea.y;d=e>r?e+h-(l-1):d,d=e<s?e-h:d,c=i>o?i+h-(a-1):c,c=i<n?i-h:c,this.moveViewPort(d,c)}}getFreeCell(){let e={x:o(0,this.columnsCount-1),y:o(0,this.rowsCount-1)};for(;!this.isFreeCell(e);)e={x:o(0,this.columnsCount-1),y:o(0,this.rowsCount-1)};return e}gitVisibleSegments(){}}class d extends n{constructor(e,t,i){super("single-player"),this._screen.id="game-field",i.appendChild(this._screen),this.gameField=new a(e,t,i.clientWidth,i.clientHeight,i,"game-field"),this.maxY=t-1,this.maxX=e-1,this._score=0,this.actors=new Array,this.actors.push(new r(this.gameField)),this.actors[0].addEventListener("GrowUp",this.gameField.addSegment.bind(this.gameField)),this.actors[0].addEventListener("PrevStep",this.gameField.freeSegments.bind(this.gameField)),this.actors[0].addEventListener("Step",this.goThroughWalls.bind(this)),this.actors[0].addEventListener("Step",this.gameField.moveViewPortOnStep.bind(this.gameField)),this.actors[0].addEventListener("Step",this.collisionControl.bind(this)),this.actors[0].addEventListener("Death",this.stop.bind(this)),this.actors.push(new h(this.gameField)),this.actors.push(new l(this.gameField)),this.actors[0].move()}reset(){super.reset()}onKeyboardEvent(e){switch(super.onKeyboardEvent(e),e.detail.key){case"Left":this.actors[0].changeDirection({x:-1,y:0});break;case"Right":this.actors[0].changeDirection({x:1,y:0});break;case"Up":this.actors[0].changeDirection({x:0,y:-1});break;case"Down":this.actors[0].changeDirection({x:0,y:1});break;case"Num1":this.actors[0].addSegment()}}set score(e){this.dispatchEvent(new CustomEvent({prevValue:this._score,currentValue:e})),this._score=e}get score(){return this._score}goThroughWalls(e){let t=e.detail;for(let e=0;e<t.length;e++){let i=t[e];i.x<0&&(i.x=this.gameField.columnsCount-1),i.x>=this.gameField.columnsCount&&(i.x=0),i.y<0&&(i.y=this.gameField.rowsCount-1),i.y>=this.gameField.rowsCount&&(i.y=0)}}collisionControl(){for(let t=0;t<this.actors.length;t++)for(let i=t;i<this.actors.length;i++){let s=this.actors[t],n=this.actors[i];function e(e,t){for(let i=0;i<e.length;i++)for(let e=0;e<t.length;e++)if(s.body[i].x==n.body[e].x&&s.body[i].y==n.body[e].y)return!0;return!1}e(s.body,n.body)&&(console.log(),s.onCollision(this,n),n.onCollision(this,s))}}stop(){super.stop()}start(){super.start()}}class c extends EventTarget{constructor(){super(),document.onkeydown=this.keyPress.bind(this)}keyPress(e){let t={};switch(e.code){case"ArrowUp":case"KeyW":t.key="Up";break;case"ArrowDown":case"KeyS":t.key="Down";break;case"ArrowLeft":case"KeyA":t.key="Left";break;case"ArrowRight":case"KeyD":t.key="Right";break;case"Digit1":t.key="Num1";break;case"Digit2":t.key="Num2";break;case"Digit3":t.key="Num3";break;case"Digit4":t.key="Num4";break;case"Digit5":t.key="Num5";break;case"Digit6":t.key="Num6";break;case"Digit7":t.key="Num7";break;case"Digit8":t.key="Num8";break;case"Digit9":t.key="Num9";break;case"Digit0":t.key="Num0";break;case"Escape":t.key="Escape";break;case"Enter":t.key="Enter"}null!=t.key&&this.dispatchEvent(new CustomEvent("Keyboard",{detail:t}))}}class g extends n{constructor(e){super("game-over-screen");let t=e.clientWidth,i=e.clientHeight;e.appendChild(this._screen),this._screen.style.position="absolute",this._screen.style.width=t,this._screen.style.height=i,this._screen.innerHTML='<div class="content" style="text-align: center">\n                                    <div class="title" style="margin:20 0 20 0; font-size: 20px">GAME OVER</div>\n                                    <div class="score" style="margin:10 0 10 0; font-size: 17px"></div>\n                                    <div class="retry choice" style="padding: 5 0 5 0; font-size: 14px">Retry</div>\n                                    <div class="quit choice" style="padding: 5 0 5 0; font-size: 14px">Quit</div>\n                                </div>';let s=this._screen.getElementsByClassName("content")[0];s.style.marginTop=(this._screen.clientHeight-s.clientHeight)/2,s.style.width=.5*this._screen.clientWidth,s.style.marginLeft=(this._screen.clientWidth-s.clientWidth)/2,this.choice="retry"}onKeyboardEvent(e){switch(super.onKeyboardEvent(e),e.detail.key){case"Up":case"Down":this.changeChoice();break;case"Enter":this.stop()}}changeChoice(){"retry"==this._selectedChoice?this.choice="quit":this.choice="retry"}set choice(e){Array.from(this._screen.getElementsByClassName("choice")).forEach((function(e){e.style.color="white",e.style.backgroundColor="black"})),this._screen.getElementsByClassName(e)[0].style.color="black",this._screen.getElementsByClassName(e)[0].style.backgroundColor="white",this._selectedChoice=e}get choice(){return this._selectedChoice}set score(e){this._screen.getElementsByClassName("score")[0].innerHTML=`<div>score: ${e}</div>`}start(){super.start()}reset(){super.reset()}}class u extends EventTarget{constructor(e,t){if(super(),null==document.getElementById("game")){let e=document.createElement("div");e.id="game";let t=this.getDisplaySize(480,640);e.style.width=t.width,e.style.height=t.height,e.style.backgroundColor="black",document.body.appendChild(e)}this._div=document.getElementById("game"),this._div.style.marginTop=(document.body.clientHeight-this._div.clientHeight)/2,this._div.style.marginLeft=(document.body.clientWidth-this._div.clientWidth)/2,this._controls=new c,this._controls.addEventListener("Keyboard",this.onKeyboardEvent.bind(this)),this._currentScene=new n,this._scenes={SinglePlayer:new d(e,t,this._div),GameOverScreen:new g(this._div)},this.changeCurrentScene(this._scenes.SinglePlayer)}getDisplaySize(e,t){let i=document.documentElement.clientWidth,s=document.documentElement.clientHeight,n=1;return n=i/s>1?s>t?1:s/t:i>e?1:i/e,{width:e*n,height:t*n}}onKeyboardEvent(e){this._currentScene.onKeyboardEvent(e)}changeCurrentScene(e){this._currentScene.removeEventListener("StateChanging",this.onSceneStateChanging.bind(this)),this._currentScene.removeEventListener("OnStop",this.onSceneStop.bind(this)),this._currentScene.removeEventListener("OnStart",this.onSceneStart.bind(this)),this._currentScene.removeEventListener("OnPause",this.onScenePause.bind(this)),this._currentScene=e,this._currentScene.start(),this._currentScene.addEventListener("StateChanging",this.onSceneStateChanging.bind(this)),this._currentScene.addEventListener("OnStop",this.onSceneStop.bind(this)),this._currentScene.addEventListener("OnStart",this.onSceneStart.bind(this)),this._currentScene.addEventListener("OnPause",this.onScenePause.bind(this))}onSceneStateChanging(e){}onSceneStop(e){let t=e.target,i=t.id;if("single-player"==i){let e=t.score;this._scenes.GameOverScreen.reset(),this._scenes.GameOverScreen.score=e,this.changeCurrentScene(this._scenes.GameOverScreen)}"game-over-screen"==i&&("retry"==t.choice&&(this._scenes.SinglePlayer.reset(),this.changeCurrentScene(this._scenes.SinglePlayer)),t.choice)}onSceneStart(e){}onScenePause(e){}}window.onload=function(e){new u(20,20)}}]);